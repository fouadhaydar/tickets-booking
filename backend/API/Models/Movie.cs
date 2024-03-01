using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.API.Models;

[Table("Movie")]
public class Movie : MyBaseModel
{
    [Column("MediaType")]
    public string MediaType { get; set; }
    [Column("MediaId")]
    public int MediaId { get; set; }
}