namespace MemoryApi.Models;
public class MemoryItemDTO
{
    public long Id {get; set;}
    public required string Difficulty{get;set;}
    public required List<int> UserMoves{get;set;}
}

//   public long Id{get;set;}
//     public required string Difficulty{get;set;}
//     public required List<int> UserMoves{get;set;}
//     public string? Secret { get; set; }