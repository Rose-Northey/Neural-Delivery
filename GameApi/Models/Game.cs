using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameApi.Models;

public class Game
{
    public long Id{get;set;}
    public required string Difficulty{get;set;}
    public required List<int> UserMoves{get;set;}
    public required List<int> PictureIdLayout{get;set;}
}

// required means it must be set during initisation otherwise it will throw an error
// public List<long> UserMoves { get; set; } = new(); will automatically initialize the property with a default instance, so you don’t have to supply a value when creating an object
// if you don't put required or new it will have null set if nothing is set.