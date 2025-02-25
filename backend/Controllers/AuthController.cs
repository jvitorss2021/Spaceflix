using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

public AuthController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;

    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(RegisterDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            return BadRequest("Email já está em uso");
        }

        var user = new User
        {
            Email = request.Email,
            Name = request.Name,
            PasswordHash = HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow,
            SubscriptionPlan = "free"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _tokenService.GenerateToken(user);

        return Ok(new
        {
            user.Id,
            user.Email,
            user.Name,
            user.CreatedAt,
            user.SubscriptionPlan,
            Token = token
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<User>> Login(LoginDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
        {
            return BadRequest("Usuário não encontrado");
        }

        if (!VerifyPassword(request.Password, user.PasswordHash))
        {
            return BadRequest("Senha incorreta");
        }

       var token = _tokenService.GenerateToken(user);

        return Ok(new
        {
            user.Id,
            user.Email,
            user.Name,
            user.CreatedAt,
            user.SubscriptionPlan,
            Token = token
        });
    }

private string HashPassword(string password)
{
    return BCrypt.Net.BCrypt.HashPassword(password);
}

private bool VerifyPassword(string password, string hash)
{
    return BCrypt.Net.BCrypt.Verify(password, hash);
}
}

public class RegisterDto
{
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string Password { get; set; }
}

public class LoginDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
} 