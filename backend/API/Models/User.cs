using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.API.Models;

[Table("User")]
public class User : BaseModel
{
    [PrimaryKey("Id")]
    public int Id { get; set; }
    [Column("UserName")]
    public string UserName { get; set; }
    [Column("Password")]
    public string Password { get; set; }
}