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
                 new Content
                {
                    Title = "Nível Secreto",
                    Description = "NÍVEL SECRETO é uma série animada de antologia para adultos, apresentando histórias originais nos mundos de alguns dos videogames mais adorados no mundo todo. Das mentes criativas por trás de LOVE, DEATH + ROBOTS, cada um dos 15 episódios é uma celebração de jogos e jogadores.",
                    Type = "anime",
                    ThumbnailUrl = "/images/nivel-secreto.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=a13Zf0rY5Ng",
                    Genre = "Animação, Antologia, Ficção Científica",
                    ReleaseYear = 2024,
                    Director = "Tim Miller, David Fincher",
                    Cast = "Kevin Hart, Keanu Reeves, Ariana Greenblatt",
                    DurationMinutes = 25,
                    MaturityRating = "16",
                    IsFeatured = true,
                    AverageRating = 4.6
                },
                new Content
                {
                    Title = "Reacher",
                    Description = "Jack Reacher, um investigador veterano da polícia militar, chega a uma pequena cidade e se depara com um homicídio. Logo ele se torna o principal suspeito e precisa provar sua inocência enquanto descobre uma conspiração maior.",
                    Type = "series",
                    ThumbnailUrl = "/images/reacher.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=GSycMV-_Csw",
                    Genre = "Ação, Crime, Drama",
                    ReleaseYear = 2022,
                    Director = "Nick Santora",
                    Cast = "Alan Ritchson, Malcolm Goodwin, Willa Fitzgerald",
                    DurationMinutes = 49,
                    MaturityRating = "16",
                    IsFeatured = true,
                    AverageRating = 4.7
                },
                new Content
                {
                    Title = "The Legend of Vox Machina",
                    Description = "Um grupo de aventureiros desajustados embarca em uma missão para salvar o reino de Exandria de forças mágicas sombrias, enfrentando monstros, magias e seus próprios demônios internos.",
                    Type = "anime",
                    ThumbnailUrl = "/images/vox-machina.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=JvwxQSc-3os",
                    Genre = "Animação, Fantasia, Aventura",
                    ReleaseYear = 2022,
                    Director = "Sam Riegel, Travis Willingham",
                    Cast = "Laura Bailey, Taliesin Jaffe, Ashley Johnson, Matthew Mercer",
                    DurationMinutes = 30,
                    MaturityRating = "18",
                    IsFeatured = false,
                    AverageRating = 4.8
                },
                new Content
                {
                    Title = "Re:Zero",
                    Description = "Subaru Natsuki é um adolescente normal transportado para um mundo de fantasia. Ao morrer, ele descobre que tem o poder de voltar no tempo, revivendo seus momentos finais para tentar mudar seu destino.",
                    Type = "anime",
                    ThumbnailUrl = "/images/re-zero.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=Slz_rahWp6Y",
                    Genre = "Anime, Fantasia, Drama",
                    ReleaseYear = 2016,
                    Director = "Masaharu Watanabe",
                    Cast = "Yûsuke Kobayashi, Rie Takahashi, Inori Minase",
                    DurationMinutes = 25,
                    MaturityRating = "14",
                    IsFeatured = false,
                    AverageRating = 4.7
                },
                new Content
                {
                    Title = "Jujutsu Kaisen",
                    Description = "Yuji Itadori, um estudante comum com habilidades físicas extraordinárias, se vê envolvido no mundo da feitiçaria após engolir um objeto amaldiçoado e receber os poderes de Sukuna, o 'Rei das Maldições'.",
                    Type = "anime",
                    ThumbnailUrl = "/images/jujutsu-kaisen.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=4A_X-Dvl0ws",
                    Genre = "Anime, Ação, Sobrenatural",
                    ReleaseYear = 2020,
                    Director = "Sunghoo Park",
                    Cast = "Junya Enoki, Yūma Uchida, Asami Seto",
                    DurationMinutes = 24,
                    MaturityRating = "16",
                    IsFeatured = true,
                    AverageRating = 4.9
                },
                new Content
                {
                    Title = "Alice in Borderland",
                    Description = "Arisu e seus amigos são transportados para uma Tóquio alternativa e vazia, onde precisam participar de jogos perigosos para sobreviver e descobrir os segredos desse mundo misterioso.",
                    Type = "series",
                    ThumbnailUrl = "/images/alice-in-borderland.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=49_44FFKZ1M",
                    Genre = "Ação, Drama, Ficção Científica",
                    ReleaseYear = 2020,
                    Director = "Shinsuke Sato",
                    Cast = "Kento Yamazaki, Tao Tsuchiya, Nijiro Murakami",
                    DurationMinutes = 50,
                    MaturityRating = "18",
                    IsFeatured = true,
                    AverageRating = 4.7
                },
                new Content
                {
                    Title = "Black Mirror",
                    Description = "Uma antologia de histórias independentes que exploram a paranoia da sociedade contemporânea em relação ao mundo tecnológico, revelando como a tecnologia moderna pode ser usada de maneiras que nunca imaginamos e com consequências assustadoras.",
                    Type = "series",
                    ThumbnailUrl = "/images/black-mirror.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=V0XOApF5nLU",
                    Genre = "Ficção Científica, Drama, Thriller",
                    ReleaseYear = 2011,
                    Director = "Charlie Brooker",
                    Cast = "Bryce Dallas Howard, Jon Hamm, Miley Cyrus, Anthony Mackie, Daniel Kaluuya",
                    DurationMinutes = 60,
                    MaturityRating = "18",
                    IsFeatured = true,
                    AverageRating = 4.8
                },
                new Content
                {
                    Title = "Love, Death & Robots",
                    Description = "Uma coleção de animações que apresenta histórias curtas de ficção científica, fantasia, horror e comédia. Cada episódio é produzido por equipes diferentes de todo o mundo, utilizando estilos de animação únicos e narrativas provocantes.",
                    Type = "anime",
                    ThumbnailUrl = "/images/love-death-robots.webp",
                    ContentUrl = "https://www.youtube.com/watch?v=wUFwunMKa4E",
                    Genre = "Animação, Ficção Científica, Antologia",
                    ReleaseYear = 2019,
                    Director = "Tim Miller, David Fincher",
                    Cast = "Mary Elizabeth Winstead, Topher Grace, Gary Cole, Samira Wiley",
                    DurationMinutes = 15,
                    MaturityRating = "18",
                    IsFeatured = true,
                    AverageRating = 4.7
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