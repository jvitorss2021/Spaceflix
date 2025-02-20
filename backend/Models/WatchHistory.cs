namespace backend.Models;

public class WatchHistory
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int ContentId { get; set; }
    public Content Content { get; set; } = null!;
    public DateTime WatchedAt { get; set; } = DateTime.UtcNow;
    public int WatchedSeconds { get; set; }
    public bool Completed { get; set; }
    public DateTime? LastPosition { get; set; }
} 