namespace backend.API.Models.DTO.Response;

public class AuthenticationResponce
{
    public bool Error { get; set; }
    public string Message { get; set; } = "";
    public string SessionId { get; set; } = "";
    public string AccessToken { get; set; } = "";
    public string RefreshToken { get; set; } = "";

}