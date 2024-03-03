using System.Collections;
using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.API.Models;

[Table("MovieHall")]
public class MovieHall : BaseModel
{
    [PrimaryKey("Id")]
    public int Id { get; set; }
    [Column("DateOfMovie")]
    public DateTime DateOfMovie { get; set; }
    [Column("SeatsReservation")]
    public int[] SeatsReservation { get; set; }

    // Foreign key properties
    [Column("MovieId")]
    public int MovieId { get; set; }
    [Column("HallId")]
    public int HallId { get; set; }
}