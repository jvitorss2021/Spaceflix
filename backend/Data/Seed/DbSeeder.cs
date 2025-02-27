using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedDatabase(AppDbContext context)
    {
        await SeedContents(context);
        await context.SaveChangesAsync();
    }

    private static async Task SeedContents(AppDbContext context)
    {
            var existingTitles = await context.Contents.Select(c => c.Title).ToListAsync();
            var contents = new List<Content>
            {
                new Content
                {
                    Title = "Interestelar",
                    Description = "Em um futuro próximo, a Terra está cada vez mais inabitável. Joseph Cooper, ex-piloto da NASA, é chamado para uma missão crucial: liderar uma equipe através de um buraco de minhoca em busca de um novo lar para a humanidade.",
                    Type = "movie",
                    ThumbnailUrl = "/images/interstellar.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=zSWdZVtXT7E",
                    Genre = "Ficção Científica",
                    ReleaseYear = 2014,
                    Director = "Christopher Nolan",
                    Cast = "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
                    DurationMinutes = 169,
                    MaturityRating = "12",
                    IsFeatured = true,
                    AverageRating = 4.8
                },
                new Content
                {
                    Title = "Exame",
                    Description = "Oito candidatos competem por uma posição em uma misteriosa corporação. Trancados em uma sala, eles enfrentam um teste final peculiar que os leva aos limites de suas mentes e moralidade.",
                    Type = "movie",
                    ThumbnailUrl = "/images/filme-exame.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=91ArLWIVSAs",
                    Genre = "Suspense Psicológico",
                    ReleaseYear = 2009,
                    Director = "Stuart Hazeldine",
                    Cast = "Adar Beck, Gemma Chan, Nathalie Cox",
                    DurationMinutes = 101,
                    MaturityRating = "16",
                    IsFeatured = false,
                    AverageRating = 4.5
                }
            };

        var newContents = contents.Where(c => !existingTitles.Contains(c.Title)).ToList();
    
        if (newContents.Any())
        {
            await context.Contents.AddRangeAsync(newContents);
            await context.SaveChangesAsync();
            Console.WriteLine($"Adicionados {newContents.Count} novos filmes ao catálogo.");
        }
        else
        {
            Console.WriteLine("Nenhum novo conteúdo para adicionar");
        }
    }
}