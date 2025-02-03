using Microsoft.EntityFrameworkCore;

namespace MemoryApi.Models
{
    public class MemoryContext : DbContext
    {
    public MemoryContext(DbContextOptions<MemoryContext> options)
        :base(options)
    {
    }
        public DbSet<MemoryItem> MemoryItems { get; set; } = null!;
    }
}
// using Microsoft.EntityFrameworkCore;

// namespace MemoryApi.Models
// {
//     public class MemoryContext : DbContext
//     {
//         public MemoryContext(DbContextOptions<MemoryContext> options)
//             : base(options)
//         {
//         }

//         public DbSet<MemoryItem> MemoryItems { get; set; } = null!;
//     }
// }