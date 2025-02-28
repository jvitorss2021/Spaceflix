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
                },
                new Content
                {
                    Title = "Breaking Bad",
                    Description = "Um professor de química do ensino médio com câncer terminal se junta ao mundo do crime, produzindo e vendendo metanfetamina para garantir o futuro financeiro de sua família.",
                    Type = "series",
                    ThumbnailUrl = "/images/breaking-bad.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=HhesaQXLuRY",
                    Genre = "Drama, Crime",
                    ReleaseYear = 2008,
                    Director = "Vince Gilligan",
                    Cast = "Bryan Cranston, Aaron Paul, Anna Gunn",
                    DurationMinutes = 45,
                    MaturityRating = "16",
                    IsFeatured = true,
                    AverageRating = 4.9
                },
                new Content
                {
                    Title = "Hunter x Hunter",
                    Description = "Gon Freecss aspira se tornar um Hunter, um aventureiro de elite. Ele parte em uma jornada para encontrar seu pai, fazendo amigos e enfrentando desafios ao longo do caminho.",
                    Type = "anime",
                    ThumbnailUrl = "/images/hunter-x-hunter.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=d6kBeJjTGnY",
                    Genre = "Anime, Ação, Aventura",
                    ReleaseYear = 2011,
                    Director = "Hiroshi Kōjina",
                    Cast = "Megumi Han, Mariya Ise, Keiji Fujiwara",
                    DurationMinutes = 23,
                    MaturityRating = "14",
                    IsFeatured = false,
                    AverageRating = 4.8
                },
                new Content
                {
                    Title = "Demon Slayer",
                    Description = "Tanjiro Kamado se torna um caçador de demônios após sua família ser massacrada e sua irmã transformada em demônio. Ele parte em uma jornada perigosa para curar sua irmã e vingar sua família.",
                    Type = "anime",
                    ThumbnailUrl = "/images/demon-slayer.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=6P79AqWs8V8",
                    Genre = "Anime, Ação, Fantasia",
                    ReleaseYear = 2019,
                    Director = "Haruo Sotozaki",
                    Cast = "Natsuki Hanae, Akari Kitō, Hiro Shimono",
                    DurationMinutes = 23,
                    MaturityRating = "14",
                    IsFeatured = true,
                    AverageRating = 4.9
                },
                new Content
                {
                    Title = "Vikings",
                    Description = "A série acompanha as aventuras do lendário viking Ragnar Lothbrok, que expandiu o domínio nórdico e se tornou o Rei dos Vikings.",
                    Type = "series",
                    ThumbnailUrl = "/images/vikings.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=9GgxinPwAGc",
                    Genre = "Drama, Ação, História",
                    ReleaseYear = 2013,
                    Director = "Michael Hirst",
                    Cast = "Travis Fimmel, Katheryn Winnick, Gustaf Skarsgård",
                    DurationMinutes = 45,
                    MaturityRating = "16",
                    IsFeatured = true,
                    AverageRating = 4.7
                },
                new Content
                {
                    Title = "Invencível",
                    Description = "Mark Grayson é um adolescente normal, exceto pelo fato de seu pai ser o super-herói mais poderoso do planeta. Logo após seu 17º aniversário, Mark começa a desenvolver seus próprios poderes e entra para os cuidados de seu pai.",
                    Type = "anime",
                    ThumbnailUrl = "/images/invincible.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=chcPVeszoUo",
                    Genre = "Animação, Ação, Drama",
                    ReleaseYear = 2021,
                    Director = "Robert Kirkman",
                    Cast = "Steven Yeun, J.K. Simmons, Sandra Oh",
                    DurationMinutes = 45,
                    MaturityRating = "18",
                    IsFeatured = true,
                    AverageRating = 4.8
                },
                new Content
                {
                    Title = "The 100",
                    Description = "Um século após um apocalipse nuclear, 100 jovens são enviados de volta à Terra para descobrir se o planeta está habitável novamente.",
                    Type = "series",
                    ThumbnailUrl = "/images/the-100.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=ia1Fbg96vL0",
                    Genre = "Ficção Científica, Drama",
                    ReleaseYear = 2014,
                    Director = "Jason Rothenberg",
                    Cast = "Eliza Taylor, Bob Morley, Marie Avgeropoulos",
                    DurationMinutes = 43,
                    MaturityRating = "16",
                    IsFeatured = false,
                    AverageRating = 4.5
                },
                new Content
                {
                    Title = "Vis a Vis",
                    Description = "Manipulada pelo homem por quem se apaixonou, Macarena acaba em uma prisão feminina, onde precisa aprender rapidamente as regras de sobrevivência.",
                    Type = "series",
                    ThumbnailUrl = "/images/vis-a-vis.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=N08KRAPzsHU",
                    Genre = "Drama, Crime, Suspense",
                    ReleaseYear = 2015,
                    Director = "Iván Escobar",
                    Cast = "Maggie Civantos, Najwa Nimri, Berta Vázquez",
                    DurationMinutes = 50,
                    MaturityRating = "16",
                    IsFeatured = false,
                    AverageRating = 4.6
                },
                new Content
                {
                    Title = "The Office",
                    Description = "Um documentário sobre o dia a dia dos funcionários de um escritório de uma empresa de papel em Scranton, Pennsylvania, mostrando as peculiaridades e relacionamentos da equipe.",
                    Type = "series",
                    ThumbnailUrl = "/images/the-office.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=LHOtME2DL4g",
                    Genre = "Comédia",
                    ReleaseYear = 2005,
                    Director = "Greg Daniels",
                    Cast = "Steve Carell, Rainn Wilson, John Krasinski",
                    DurationMinutes = 22,
                    MaturityRating = "12",
                    IsFeatured = true,
                    AverageRating = 4.8
                },
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