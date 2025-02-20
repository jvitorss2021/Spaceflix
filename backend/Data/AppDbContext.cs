using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Content> Contents { get; set; } = null!;
    public DbSet<WatchHistory> WatchHistory { get; set; } = null!;
    public DbSet<Favorite> Favorites { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configurações de User
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Configurações de Content
        modelBuilder.Entity<Content>()
            .HasIndex(c => c.Title);

        // Configurações de WatchHistory
        modelBuilder.Entity<WatchHistory>()
            .HasOne(w => w.User)
            .WithMany(u => u.WatchHistory)
            .HasForeignKey(w => w.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<WatchHistory>()
            .HasOne(w => w.Content)
            .WithMany(c => c.WatchHistory)
            .HasForeignKey(w => w.ContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configurações de Favorite
        modelBuilder.Entity<Favorite>()
            .HasOne(f => f.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Favorite>()
            .HasOne(f => f.Content)
            .WithMany(c => c.Favorites)
            .HasForeignKey(f => f.ContentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
} 