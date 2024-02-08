using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly QuizAppDbContext _context;
        private readonly IMapper _mapper;

        public CardController(QuizAppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult> GetCards()
        {
            var cards = await _context.Cards.ToListAsync();
            return Ok(cards);
        }
        // Add a new card to the database
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
            if (!User.HasClaim(c => c.Type == "isLoggedIn" && c.Value == "true"))
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "User is not authenticated.");
            }
            try {

                var categories = await _context.Cards
                    .Where(c => c.Public == 1)
                    .Select(c => c.Category)
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
        /// searches for how many cards of that category  exist
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
                                      .Union(userCards.Select(c => c.Category), StringComparer.OrdinalIgnoreCase)
                                      .Distinct()
                                      .ToList();

                var result = new List<object>();

                foreach (var category in categories)
                {
                    var count = await _context.Cards.Where(c => c.Category.Equals(category, StringComparison.OrdinalIgnoreCase)).CountAsync();
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

                _context.Cards.Remove(card);
                await _context.SaveChangesAsync();

                return Ok("Card deleted successfully!");
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

            var property = card.GetType().GetProperty(editFieldDTO.Field);

            if (property == null)
            {
                return BadRequest($"Field '{editFieldDTO.Field}' not found in card.");
            }

            try
            {
                var convertedValue = Convert.ChangeType(editFieldDTO.Value, property.PropertyType);
                property.SetValue(card, convertedValue);
                await _context.SaveChangesAsync();
                return Ok(card);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while trying to edit the field: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while trying to edit the field. Please try again later.");
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
