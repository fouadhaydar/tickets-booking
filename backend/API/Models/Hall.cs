using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.API.Models;

[Table("Hall")]
public class Hall : BaseModel
{
    [PrimaryKey("Id")]
    public int Id { get; set; }
    [Column("HallNumber")]
    public int HallNumber { get; set; }
    [Column("NumberOfSeats")]
    public int NumberOfSeats { get; set; }
}