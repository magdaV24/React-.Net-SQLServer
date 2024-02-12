using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly QuizAppDbContext _context;
        private readonly IMapper _mapper;
        Cloudinary cloudinary = new Cloudinary("cloudinary://237384797529715:VWbnhNqMeCGKZda6eqJWclzQTBY@ddfyjnala");

        public CardController(QuizAppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        [Authorize]
        [HttpGet("{id}")]
        [EnableCors("WithAuthorization")]
        public async Task<ActionResult> GetCard(int id)
        {
            try
            {
                var card = await _context.Cards.FindAsync(id);
                if (card == null)
                {
                    return NotFound();
                }
                return Ok(card);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while searching for this card: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while searching for this card. Please try again later.");
            }
        }

        [HttpGet]

        public async Task<ActionResult> GetCards()
        {
            var cards = await _context.Cards.ToListAsync();
            return Ok(cards);
        }
        /// <summary>
        /// Adds a new card to the database.
        /// </summary>
        /// <param name="cardDTO">The DTO corresponding to the card submitted.</param>
        /// <returns>A response for the user, to know whether or not their card was added successfully.</returns>
        [Authorize]
        [HttpPost("addCard")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult<Card>> CreateCard(CardDTO cardDTO)
        {
            try
            {
                var card = _mapper.Map<Card>(cardDTO);
                _context.Cards.Add(card);

                if (await _context.SaveChangesAsync() > 0)
                {
                    return Ok("Card added successfully!");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Unable to add card. Please try again later.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while adding a card: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding a card. Please try again later.");
            }
        }


        /// <summary>
        /// Searches the database for all the public cards and selects the categories of those that are 
        /// public
        /// StringComparer.OrdinalIgnoreCase performs a case insensitive comparison of the categories 
        /// selected, so that strings like 'math' and 'Math' will return the same string
        /// </summary>
        /// <returns></returns>
        [HttpGet("fetchCardsPublicCategories")]
        public async Task<ActionResult<IEnumerable<string>>> GetPublicCategories()
        {
            try
            {
                var categories = await _context.Cards
                    .Where(c => c.Public == 1)
                    .Select(c => c.Category)
                    .Distinct()
                    .ToListAsync();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching public card categories: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching public card categories.");
            }
        }


        /// <summary>
        /// Searches for all the public cards and the current user's cards.It creates a list of unique categories by 
        /// combining the categories of  all the selected cards, then iterates over the categories and for each,
        /// searches for how many cards of that category  exist.
        /// </summary>
        /// <param name="id">The current user's id</param>
        /// <returns>A list of the selecetd categories and the corresponding number of cards.</returns>
        [Authorize]
        [HttpGet("fetchGameCategories/{id}")]

        public async Task<ActionResult> GetGameCategories(string id)
        {
            try
            {
                if (!User.HasClaim(c => c.Type == "isLoggedIn" && c.Value == "true"))
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, "User is not authenticated.");
                }

                var cards = await _context.Cards.Where(c => c.Public == 1).ToListAsync();
                var userCards = await _context.Cards.Where(c => c.UserId == id).ToListAsync();

                var categories = cards.Select(c => c.Category)
                                      .Union(userCards.Select(c => c.Category))
                                      .Distinct()
                                      .ToList();

                var result = new List<object>();

                foreach (var category in categories)
                {
                    var count = await _context.Cards.Where(c => c.Category == category).CountAsync();
                    result.Add(new { Category = category, Count = count });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching game categories: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching game categories. Please try again later.");
            }
        }

        /// <summary>
        /// Searches the database for the cards that correspond to the provided category. 
        /// </summary>
        /// <param name="categ">The category selected by the current user.</param>
        /// <param name="limit">The number of cards of that category the user wants to get.</param>
        /// <returns>A list of a certain number of cards, the limit param, that have the desired category, 
        /// ordered randomly, var result representing that list.
        /// </returns>
        [Authorize]
        [HttpGet("{categ}/{limit}")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult> GetCardsWithLimit(string categ, int limit)
        {
            try
            {
                var random = new Random();
                var cards = await _context.Cards.Where(c => c.Category == categ).ToListAsync();

                if (cards == null || !cards.Any())
                {
                    return NotFound("No cards found for the provided category.");
                }

                if (limit <= 0)
                {
                    return BadRequest("Limit must be a number greater than zero.");
                }

                var shuffledCards = cards.OrderBy(c => random.Next()).Take(limit).ToList();

                return Ok(shuffledCards);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching cards: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching cards. Please try again later.");
            }
        }

        /// <summary>
        /// Deletes a card by its ID.
        /// </summary>
        /// <param name="id">The ID of the card to delete.</param>
        /// <returns>
        /// If the deletion was successful, returns a JSON response with status 200 (OK) with an appropriate message..
        /// If the card was not found, returns a JSON response with status 404 (Not Found).
        /// If the deletion was unsuccessful for any other reason, returns a JSON response with status 400 (Bad Request).
        /// </returns>
        [Authorize]
        [HttpDelete("delete/{id}")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult> DeleteCard(int id)
        {
            try
            {
                var card = await _context.Cards.FindAsync(id);

                if (card == null)
                {
                    return NotFound("Card not found.");
                }
                string response = "";

                // Deleteing the photos from Cloudinary
                if (card.HasPhotos == 1)
                {
                    var publicIds = new List<string> { card.AnswerPhoto, card.WrongAnswerOnePhoto, card.WrongAnswerTwoPhoto, card.WrongAnswerThreePhoto };

                    CancellationToken cancellationToken = new CancellationToken();

                    var deleteParams = new DelResParams()
                    {
                        PublicIds = publicIds,
                        ResourceType = ResourceType.Image
                    };
                    var cloudinaryResult = await cloudinary.DeleteResourcesAsync(deleteParams, cancellationToken);

                    if (cloudinaryResult == null)
                    {
                        response = " There was an error while trying to delete the photos!";
                    }
                    else
                    {
                        response = " The photos were successfully deleted!";
                    }
                }
                _context.Cards.Remove(card);
                await _context.SaveChangesAsync();
                return Ok("Card deleted successfully! " + response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the card: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the card. Please try again later.");
            }
        }


        /// <summary>
        /// Edits a field of a card.
        /// </summary>
        /// <param name="editFieldDTO">DTO containing information for editing the card field.</param>
        /// <returns>
        /// If the card is not found, returns a JSON response with status 400 (Bad Request).
        /// If the specified field is not found in the card, returns a JSON response with status 400 (Bad Request).
        /// If the field edit is successful, returns a JSON response with status 200 (OK) containing the edited card.
        /// If the field edit fails for any reason, returns a JSON response with status 400 (Bad Request).
        /// </returns>
        [Authorize]
        [HttpPut("editField")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult<Card>> EditField(EditFieldDTO editFieldDTO)
        {
            var card = await _context.Cards.FindAsync(editFieldDTO.Id);

            if (card == null)
            {
                return BadRequest("Card not found!");
            }

            var field = card.GetType().GetProperty(editFieldDTO.Field);

            if (field == null)
            {
                return BadRequest($"Field '{editFieldDTO.Field}' not found in card.");
            }

            try
            {
                var convertedValue = Convert.ChangeType(editFieldDTO.Value, field.PropertyType);
                field.SetValue(card, convertedValue);
                await _context.SaveChangesAsync();
                return Ok(convertedValue);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while trying to edit the field: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while trying to edit the field. Please try again later.");
            }
        }

        /// <summary>
        /// Adds a photo to a given field;
        /// </summary>
        /// <param name="addPhotoDTO"></param>
        /// <returns></returns>

        [Authorize]
        [HttpPut("addPhoto")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult> AddPhoto(AddPhotoDTO addPhotoDTO)
        {
            try
            {
                var card = await _context.Cards.FindAsync(addPhotoDTO.Id);
                if (card == null)
                {
                    return NotFound();
                }
                var field = card.GetType().GetProperty(addPhotoDTO.Field);
                var hasPhotos = card.HasPhotos;

                if(hasPhotos == 0)
                {
                    var property = card.GetType().GetProperty(card.HasPhotos.ToString());
                    property.SetValue(card, 1);
                }
                if (field == null)
                {
                    return BadRequest($"Field '{addPhotoDTO.Field}' not found in card.");
                }

                field.SetValue(card, addPhotoDTO.PublicId);
                await _context.SaveChangesAsync();  

                return Ok("Photo added successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while trying to add the photo: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while trying to add the photo. Please try again later.");
            }
        }

        /// <summary>
        /// Changes the old value of the public id of the photo with the public id of it's replacement. 
        /// Deletes the old photo from Cloudinary, using the old public id.
        /// </summary>
        /// <param name="changePhotoDTO">The DTO necessary for changing the photo, containing the old public id and the new one, the card's id and the field's name</param>
        /// <returns>A message informing the user whether or not the change was successful.</returns>

        [Authorize]
        [HttpPut("changePhoto")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult> ChangePhoto(ChangePhotoDTO changePhotoDTO)
        {
            try
            {
                //Changing the old public_id of the photo to the new one;
                var card = await _context.Cards.FindAsync(changePhotoDTO.Id);
                if (card == null)
                {
                    return NotFound();
                }
                var field = card.GetType().GetProperty(changePhotoDTO.Field);

                if (field == null)
                {
                    return BadRequest($"Field '{changePhotoDTO.Field}' not found in card.");
                }

                var newPublicId = Convert.ChangeType(changePhotoDTO.NewPublicId, field.PropertyType);
                field.SetValue(card, newPublicId);
                await _context.SaveChangesAsync();

                // Deleting the old photo from Cloudinary;

                string response = "";
                var oldPublicId = changePhotoDTO.OldPublicId;
                if (oldPublicId != " ")
                {
                    var publicId = new List<string> { oldPublicId };
                    CancellationToken cancellationToken = new CancellationToken();

                    var deleteParams = new DelResParams()
                    {
                        PublicIds = publicId,
                        ResourceType = ResourceType.Image
                    };
                    var cloudinaryResult = await cloudinary.DeleteResourcesAsync(deleteParams, cancellationToken);

                    if (cloudinaryResult == null)
                    {
                        response = " There was an error while trying to delete the photo!";
                    }
                    else
                    {
                        response = " The photo was deleted successfully!";
                    }
                }

                return Ok("Photo changed successfully!" + response);
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while trying to change the photo: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while trying to change the photo. Please try again later.");
            }

        }
        /// <summary>
        /// Deletes the photo from the database.
        /// </summary>
        /// <param name="deletePhotoDTO"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("deletePhoto")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult> DeletePhoto(DeletePhotoDTO deletePhotoDTO)
        {
            try
            {
                // Deleting the public id from the database;
                var card = await _context.Cards.FindAsync(deletePhotoDTO.Id);
                if (card == null)
                {
                    return NotFound();
                }
                var field = card.GetType().GetProperty(deletePhotoDTO.Field);

                if (field == null)
                {
                    return BadRequest($"Field '{deletePhotoDTO.Field}' not found in card.");
                }

                field.SetValue(card, "");

                await _context.SaveChangesAsync();
            

                // Deleting the photo from Cloudinary;

                string response = "";
                var oldPublicId = deletePhotoDTO.PublicId;

                var publicId = new List<string> { oldPublicId };
                CancellationToken cancellationToken = new CancellationToken();

                var deleteParams = new DelResParams()
                {
                    PublicIds = publicId,
                    ResourceType = ResourceType.Image
                };
                var cloudinaryResult = await cloudinary.DeleteResourcesAsync(deleteParams, cancellationToken);

                if (cloudinaryResult == null)
                {
                    response = " There was an error while trying to delete the photo!";
                }
                else
                {
                    response = " The photo was deleted successfully!";
                }


                return Ok("Photo changed successfully!" + response);

            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while trying to delete the photo: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while trying to delete the photo. Please try again later.");
            }
        }

        /// <summary>
        /// Edits the public status of a card.
        /// </summary>
        /// <param name="editPublicDTO">The DTO containing information for editing the public status of the card.</param>
        /// <returns>
        /// If the card is not found, returns a JSON response with status 400 (Bad Request) and an approriate message.
        /// If the public status edit is successful, returns a JSON response with status 200 (OK) indicating success along a message.
        /// If the edit fails for any reason, returns a JSON response with status 400 (Bad Request).
        /// </returns>
        [Authorize]
        [HttpPut("editPublic")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult> EditPublic(EditPublicDTO editPublicDTO)
        {
            try
            {
                var card = await _context.Cards.FindAsync(editPublicDTO.Id);

                if (card == null)
                {
                    return BadRequest("Card not found!");
                }

                card.Public = editPublicDTO.Value;
                await _context.SaveChangesAsync();
                return Ok("Card edited successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred trying to change the public status of the card: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while trying to change the public status. Please try again later.");
            }
        }


        /// <summary>
        /// Retrieves cards belonging to the curent user.
        /// </summary>
        /// <param name="id">The ID of the current user.</param>
        /// <returns>
        /// If the user is not found, returns a JSON response with status 404 (Not Found).
        /// If the user has no cards, returns an empty JSON response with status 200 (OK).
        /// Both responses above come with appropriate messages.
        /// Otherwise, returns a JSON response with status 200 (OK) containing the user's cards.
        /// </returns>
        [Authorize]
        [HttpGet("user/{id}")]
        [EnableCors("WithAuthorization")]

        public async Task<ActionResult<IEnumerable<Card>>> FetchUserCards(string id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                var cards = await _context.Cards.Where(c => c.UserId == id).ToListAsync();

                if (cards.Count == 0)
                {
                    return Ok(new List<Card>());
                }

                return Ok(cards);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching the current user's cards: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the current user's crds. Please try again later.");
            }
        }

    }
}
