using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.API.Models;

[Table("Hall")]
public class Hall : BaseModel
{
    [Column("HallNumber")]
    public int HallNumber { get; set; }
    [Column("NumberOfSeats")]
    public int NumberOfSeats { get; set; }
}