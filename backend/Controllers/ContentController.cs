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
    private readonly ILogger<ContentController> _logger;

    public ContentController(AppDbContext context, ILogger<ContentController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Content>>> GetContents()
    {
        try
        {
            _logger.LogInformation("Buscando todos os conteúdos");
            
            var contents = await _context.Contents
                .OrderByDescending(c => c.AddedAt)
                .ToListAsync();

            _logger.LogInformation($"Encontrados {contents.Count} conteúdos");
            
            return Ok(contents);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar conteúdos");
            return StatusCode(500, "Erro interno ao buscar conteúdos");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Content>> GetContent(int id)
    {
        var content = await _context.Contents.FindAsync(id);

        if (content == null)
        {
            _logger.LogWarning($"Conteúdo com ID {id} não encontrado");
            return NotFound();
        }

        return content;
    }

    [HttpGet("featured")]
    public async Task<ActionResult<IEnumerable<Content>>> GetFeaturedContents()
    {
        try
        {
            var contents = await _context.Contents
                .Where(c => c.IsFeatured)
                .OrderByDescending(c => c.AddedAt)
                .ToListAsync();

            _logger.LogInformation($"Encontrados {contents.Count} conteúdos em destaque");
            return Ok(contents);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar conteúdos em destaque");
            return StatusCode(500, "Erro interno ao buscar conteúdos em destaque");
        }
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Content>>> SearchContents([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest("Parâmetro de busca é obrigatório");
        }

        try
        {
            var contents = await _context.Contents
                .Where(c => c.Title.ToLower().Contains(query.ToLower()) || 
                           c.Description.ToLower().Contains(query.ToLower()))
                .OrderByDescending(c => c.AddedAt)
                .ToListAsync();

            _logger.LogInformation($"Busca por '{query}' retornou {contents.Count} resultados");
            return Ok(contents);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Erro ao buscar conteúdos com query: {query}");
            return StatusCode(500, "Erro interno ao realizar busca");
        }
    }
}