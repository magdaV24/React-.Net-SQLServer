using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Card
    {
        public int Id { get; set; }
        public required string Category { get; set; }
        public required string Question { get; set; }    
        public required string Answer { get; set; }
        public required string WrongAnswerOne { get; set; }
        public required string   WrongAnswerTwo { get; set; }
        public required string WrongAnswerThree { get; set; }
        public required string UserId { get; set; }

        [Range(0,1)]
        public required int Public { get; set; }   
    }
}
