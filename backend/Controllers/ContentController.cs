using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Content>>> GetContents()
    {
        return await _context.Contents
            .OrderByDescending(c => c.AddedAt)
            .Take(10)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Content>> GetContent(int id)
    {
        var content = await _context.Contents.FindAsync(id);

        if (content == null)
        {
            return NotFound();
        }

        return content;
    }

    [HttpGet("featured")]
    public async Task<ActionResult<IEnumerable<Content>>> GetFeaturedContents()
    {
        return await _context.Contents
            .Where(c => c.IsFeatured)
            .OrderByDescending(c => c.AddedAt)
            .Take(5)
            .ToListAsync();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Content>>> SearchContents([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest("Query parameter is required");
        }

        return await _context.Contents
            .Where(c => c.Title.Contains(query) || c.Description.Contains(query))
            .OrderByDescending(c => c.AddedAt)
            .Take(20)
            .ToListAsync();
    }
} 