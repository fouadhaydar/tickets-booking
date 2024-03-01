using Postgrest.Models;
using Postgrest.Attributes;

namespace backend.API.Models;

public class MyBaseModel : BaseModel
{
    [PrimaryKey("Id")]
    public int Id { get; set; }
}