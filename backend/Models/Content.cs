namespace backend.Models;

public class Content
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty; // movie, series, documentary
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string ContentUrl { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public string Director { get; set; } = string.Empty;
    public string Cast { get; set; } = string.Empty;
    public int DurationMinutes { get; set; }
    public string MaturityRating { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    public List<WatchHistory> WatchHistory { get; set; } = new();
    public List<Favorite> Favorites { get; set; } = new();
    public double AverageRating { get; set; }
    public string RequiredPlan { get; set; } = "basic"; // basic, premium, family
} 