using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Services;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    public UserController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("subscription")]
    public async Task<ActionResult> UpdateSubscription(SubscriptionDto request)
    {

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized("Token inválido");
        }
        var validPlans = new[] { "básico", "premium", "família", "free" };
        if (!validPlans.Contains(request.Plan.ToLower()))
        {
            return BadRequest("Plano inválido");
        }
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return NotFound("Usuário não encontrado");
        }

        user.SubscriptionPlan = request.Plan.ToLower();
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
}

public class SubscriptionDto
{
    public required string Plan { get; set; }
}