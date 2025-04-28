using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameApi.Models;
using Microsoft.AspNetCore.Cors;

namespace GameApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GamesController : ControllerBase
{
    private readonly GameContext _context;

    public GamesController(GameContext context)
    {
        _context = context;
    }

    // GET: api/Games
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GameDto>>> GetGames()
    {
        return await _context.Games
            .Select(x => ItemToDto(x))
            .ToListAsync();
    }

    // GET: api/Games/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<GameDto>> GetGame(long id)
    {
        var game = await _context.Games.FindAsync(id);

        if (game == null)
        {
            return NotFound();
        }

        return ItemToDto(game);
    }
    // </snippet_GetByID>

    // PUT: api/Games/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutGame(long id, GameDto gameDto)
    {
        if (id != gameDto.Id)
        {
            return BadRequest();
        }

        var Game = await _context.Games.FindAsync(id);
        if (Game == null)
        {
            return NotFound();
        }

        Game.Difficulty = gameDto.Difficulty;
        Game.UserMoves = gameDto.UserMoves;
        Game.PictureIdLayout = gameDto.PictureIdLayout;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!GameExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }
    // </snippet_Update>

    // POST: api/Games
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<GameDto>> PostGame(GameDto gameDto)
    {
        var game = new Game
        {
            Difficulty = gameDto.Difficulty,
            UserMoves = gameDto.UserMoves,
            PictureIdLayout = gameDto.PictureIdLayout,
        };

        _context.Games.Add(game);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetGame),
            new { id = game.Id },
            ItemToDto(game));
    }
    // </snippet_Create>

    // DELETE: api/Games/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame(long id)
    {
        var game = await _context.Games.FindAsync(id);
        if (game == null)
        {
            return NotFound();
        }

        _context.Games.Remove(game);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool GameExists(long id)
    {
        return _context.Games.Any(e => e.Id == id);
    }

    private static GameDto ItemToDto(Game game) =>
       new GameDto
       {
           Id = game.Id,
           Difficulty = game.Difficulty,
           UserMoves = game.UserMoves,
           PictureIdLayout = game.PictureIdLayout,
       };
}