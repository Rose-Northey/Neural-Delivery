using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemoryApi.Models;

namespace MemoryApi.Controllers
{
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
        public async Task<ActionResult<IEnumerable<MemoryItem>>> GetMemoryItems()
        {
            return await _context.MemoryItems.ToListAsync();
        }

        // GET: api/MemoryItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemoryItem>> GetMemoryItem(long id)
        {
            var memoryItem = await _context.MemoryItems.FindAsync(id);

            if (memoryItem == null)
            {
                return NotFound();
            }

            return memoryItem;
        }

        // PUT: api/MemoryItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemoryItem(long id, MemoryItem memoryItem)
        {
            if (id != memoryItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(memoryItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemoryItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MemoryItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MemoryItem>> PostMemoryItem(MemoryItem memoryItem)
        {
            _context.MemoryItems.Add(memoryItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMemoryItem), new { id = memoryItem.Id }, memoryItem);
        }

        // DELETE: api/MemoryItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemoryItem(long id)
        {
            var memoryItem = await _context.MemoryItems.FindAsync(id);
            if (memoryItem == null)
            {
                return NotFound();
            }

            _context.MemoryItems.Remove(memoryItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemoryItemExists(long id)
        {
            return _context.MemoryItems.Any(e => e.Id == id);
        }
    }
}
