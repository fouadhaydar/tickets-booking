namespace backend.API.Models.DTO.Request;


public class UserAuthenticationRequest
{
    public string UserName { get; set; }
    public string request_token { get; set; }
}