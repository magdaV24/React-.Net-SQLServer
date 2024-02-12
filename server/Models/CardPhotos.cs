using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class CardPhotos
    {
        [MaxLength(50)]
        public string AnswerPhoto { get; set; }
        [MaxLength(50)]
        public string WrongAnswerOnePhoto { get; set; }
        [MaxLength(50)]
        public string WrongAnswerTwoPhoto { get; set; }
        [MaxLength(50)]
        public string WrongAnswerThreePhoto { get; set; }
        [Required, Range(0, 1)]
        public int HasPhotos { get; set; }
    }
}
