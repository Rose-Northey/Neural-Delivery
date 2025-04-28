using Microsoft.EntityFrameworkCore;

namespace GameApi.Models
{
    public class GameContext : DbContext
    {
    public GameContext(DbContextOptions<GameContext> options)
        :base(options)
    {
    }
        public DbSet<Game> Games { get; set; } = null!;
    }
}
// using Microsoft.EntityFrameworkCore;

// namespace GameGameApi.Models
// {
//     public class GameContext : DbContext
//     {
//         public GameContext(DbContextOptions<GameContext> options)
//             : base(options)
//         {
//         }

//         public DbSet<GameItem> GameItems { get; set; } = null!;
//     }
// }