using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemoryApi.Models;
using Microsoft.AspNetCore.Cors;

namespace MemoryApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MemoryItemsController : ControllerBase
{
    private readonly MemoryContext _context;

    public MemoryItemsController(MemoryContext context)
    {
        _context = context;
    }

    // GET: api/MemoryItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemoryItemDTO>>> GetMemoryItems()
    {
        return await _context.MemoryItems
            .Select(x => ItemToDTO(x))
            .ToListAsync();
    }

    // GET: api/MemoryItems/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<MemoryItemDTO>> GetMemoryItem(long id)
    {
        var MemoryItem = await _context.MemoryItems.FindAsync(id);

        if (MemoryItem == null)
        {
            return NotFound();
        }

        return ItemToDTO(MemoryItem);
    }
    // </snippet_GetByID>

    // PUT: api/MemoryItems/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMemoryItem(long id, MemoryItemDTO MemoryDTO)
    {
        if (id != MemoryDTO.Id)
        {
            return BadRequest();
        }

        var MemoryItem = await _context.MemoryItems.FindAsync(id);
        if (MemoryItem == null)
        {
            return NotFound();
        }

        MemoryItem.Difficulty = MemoryDTO.Difficulty;
        MemoryItem.UserMoves = MemoryDTO.UserMoves;
        MemoryItem.CardIdLayout = MemoryDTO.CardIdLayout;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!MemoryItemExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }
    // </snippet_Update>

    // POST: api/MemoryItems
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<MemoryItemDTO>> PostMemoryItem(MemoryItemDTO memoryDTO)
    {
        var memoryItem = new MemoryItem
        {
            Difficulty = memoryDTO.Difficulty,
            UserMoves = memoryDTO.UserMoves,
            CardIdLayout = memoryDTO.CardIdLayout,
        };

        _context.MemoryItems.Add(memoryItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetMemoryItem),
            new { id = memoryItem.Id },
            ItemToDTO(memoryItem));
    }
    // </snippet_Create>

    // DELETE: api/MemoryItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMemoryItem(long id)
    {
        var MemoryItem = await _context.MemoryItems.FindAsync(id);
        if (MemoryItem == null)
        {
            return NotFound();
        }

        _context.MemoryItems.Remove(MemoryItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MemoryItemExists(long id)
    {
        return _context.MemoryItems.Any(e => e.Id == id);
    }

    private static MemoryItemDTO ItemToDTO(MemoryItem MemoryItem) =>
       new MemoryItemDTO
       {
           Id = MemoryItem.Id,
           Difficulty = MemoryItem.Difficulty,
           UserMoves = MemoryItem.UserMoves,
           CardIdLayout = MemoryItem.CardIdLayout,
       };
}