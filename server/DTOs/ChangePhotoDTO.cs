namespace server.DTOs
{
    public class ChangePhotoDTO
    {
        public int Id { get; set; }
        public string Field { get; set; }
        public string OldPublicId { get; set; }    
        public string NewPublicId { get; set; }
    }
}
