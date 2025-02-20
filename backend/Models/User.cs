namespace backend.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? ProfilePicture { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string SubscriptionPlan { get; set; } = "free";
    public bool IsActive { get; set; } = true;
    public List<WatchHistory> WatchHistory { get; set; } = new();
    public List<Favorite> Favorites { get; set; } = new();
} 