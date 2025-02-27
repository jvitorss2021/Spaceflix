using Microsoft.EntityFrameworkCore;
using backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Services;
using backend.Data.Seed;

var builder = WebApplication.CreateBuilder(args);


if (builder.Environment.IsDevelopment())
{
    //local
    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.ListenAnyIP(5000);
    });
}
else
{
    //prod
    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.ListenAnyIP(8080);
    });
    
    // Carregue as variáveis de ambiente
    Console.WriteLine("Ambiente de produção detectado");
    
    // Carregar DATABASE_URL
    var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
    if (!string.IsNullOrEmpty(connectionString))
    {
        Console.WriteLine("Usando string de conexão da variável DATABASE_URL");
        builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;
    }
    else
    {
        Console.WriteLine("AVISO: Variável DATABASE_URL não encontrada");
    }
    
    // Carregar JWT_SECRET
    var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");
    if (!string.IsNullOrEmpty(jwtSecret))
    {
        Console.WriteLine($"Usando JWT Secret da variável JWT_SECRET (tamanho: {jwtSecret.Length})");
        builder.Configuration["JwtSecret"] = jwtSecret;
    }
    else
    {
        Console.WriteLine("AVISO: JWT_SECRET não encontrado. Usando fallback.");
        builder.Configuration["JwtSecret"] = "chave_secreta_temporaria_para_desenvolvimento_nao_usar_em_producao_real";
    }
}
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.ASCII.GetBytes(builder.Configuration["JwtSecret"] ?? throw new InvalidOperationException("JWT Secret não configurado"))
        ),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddScoped<TokenService>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        
        bool migrationInconsistency = false;
        
        try {
            await context.Contents.FirstOrDefaultAsync();
            
            migrationInconsistency = true;
            Console.WriteLine("Tabela Contents já existe, verificando histórico de migrações...");
        }
        catch {
            Console.WriteLine("Aplicando migrações ao banco de dados...");
            await context.Database.MigrateAsync();
        }
        
        if (migrationInconsistency)
        {
            var appliedMigrations = await context.Database.GetAppliedMigrationsAsync();
            if (!appliedMigrations.Contains("20250227143628_InitialSetup"))
            {
                await context.Database.ExecuteSqlRawAsync(
                    "INSERT INTO \"__EFMigrationsHistory\" (\"MigrationId\", \"ProductVersion\") VALUES ('20250227143628_InitialSetup', '8.0.2')");
                Console.WriteLine("Migração registrada manualmente.");
            }
        }
        await DatabaseSeeder.SeedDatabase(context);
        Console.WriteLine("Banco de dados populado com sucesso!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erro ao popular o banco de dados: {ex.Message}");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers(); 

app.Run(); 