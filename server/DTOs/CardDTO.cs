using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class CardDTO: CardPhotosDTO
    {
        public required string Category { get; set; }
        public required string Question { get; set; }
        public string Answer { get; set; }
        public string WrongAnswerOne { get; set; }
        public string WrongAnswerTwo { get; set; }
        public string WrongAnswerThree { get; set; }
        public required string UserId { get; set; }

        [Required, Range(0, 1)]
        public required int Public { get; set; }
    }
}
