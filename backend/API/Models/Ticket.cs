using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.API.Models;

[Table("Ticket")]
public class Ticket : BaseModel
{
    [PrimaryKey("Id")]
    public int Id { get; set; }
    [Column("SeatsReservation")]
    public int[] SeatsReservation { get; set; }
    // Foreign key properties
    [Column("MovieHallId")]
    public int MovieHallId { get; set; }
    [Column("UserId")]
    public int UserId { get; set; }
}