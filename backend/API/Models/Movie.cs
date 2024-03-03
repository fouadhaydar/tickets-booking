using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.API.Models;

[Table("Movie")]
public class Movie : BaseModel
{
    [PrimaryKey("Id")]
    public int Id { get; set; }
    [Column("MediaType")]
    public string MediaType { get; set; }
    [Column("MediaId")]
    public int MediaId { get; set; }
}