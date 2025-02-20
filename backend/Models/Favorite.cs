namespace backend.Models;

public class Favorite
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int ContentId { get; set; }
    public Content Content { get; set; } = null!;
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
} 