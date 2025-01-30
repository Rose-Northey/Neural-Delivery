using Microsoft.EntityFrameworkCore;

namespace MemoryApi.Models;

public class ModelContext: DbContext
{
    public MemoryContext(DbContextOptions<MemoryContext> options)
    :base(options)
    }
    {
        public DbSet<MemoryItem>MemoryItems{get;set;}=null;
}