using Postgrest.Attributes;
using Postgrest.Models;

namespace backend.API.Models;

[Table("User")]
public class User : MyBaseModel
{
    [Column("UserName")]
    public string UserName { get; set; }
    [Column("Password")]
    public string Password { get; set; }
}