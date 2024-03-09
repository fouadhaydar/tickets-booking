using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using backend.API.Models.DTO.Request;
using backend.API.Repository.IRepository;
using backend.API.Models.DTO.MapperForm;
using Newtonsoft.Json;
using System.Text;
using System.Net.Http.Headers;
using backend.API.Models;
using backend.API.Models.DTO.Response;
using Microsoft.Extensions.Options;
using backend.API.Configuration;


namespace backend.API.Controllers;


[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly TMDBApiConfig _configuration;
    private readonly IUnitOfWork _unitOfWork;

    public UserController(IMapper mapper, IUnitOfWork unitOfWork, IOptions<TMDBApiConfig> configuration)
    {
        _mapper = mapper;
        _configuration = configuration.Value;
        _unitOfWork = unitOfWork;
    }

    [HttpPost("UserAuthetication")]
    public async Task<IActionResult> UserAuthentication([FromBody] UserAuthenticationRequest userAuthenticationRequest)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(new { error = true, message = "Please enter a valid input" });
        }

        // 1- Get the new session ID from TMDB
        string url = "https://api.themoviedb.org/3/authentication/session/new";

        // Create an object representing the request data
        var requestData = new { userAuthenticationRequest.request_token }; // body of the request

        using (var client = new HttpClient())
        {
            // Set request headers
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration.API_Token);

            // Serialize object to JSON string
            var jsonContent = JsonConvert.SerializeObject(requestData);
            try
            {
                // Make the POST request
                var response = await client.PostAsync(url, new StringContent(jsonContent, Encoding.UTF8, "application/json"));

                // Check for successful response
                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the response content
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var responseObject = JsonConvert.DeserializeObject<ResponseSessionIdRequest>(responseContent);
                    if (responseObject != null)
                    {
                        // Create the user if not presente or update his profile
                        // get user name
                        string userName = await GetUserNameAsync(responseObject.session_id);
                        var user = await _unitOfWork.User.Find(x => x.UserName == userName);
                        if (user != null)
                        {
                            // Update the user
                            bool updated = await _unitOfWork.User.Update(x => x.Id == user.Id, x => x.Password, responseObject.session_id);
                            if (updated) return Ok(new AuthenticationResponce
                            {
                                Error = false,
                                Message = "User Updated Successfully",
                                SessionId = responseObject.session_id
                            });
                        }
                        else
                        {
                            // Craete new user
                            bool created = await _unitOfWork.User.Add(new User
                            {
                                UserName = userName,
                                Password = responseObject.session_id
                            });
                            if (created) return Ok(new AuthenticationResponce
                            {
                                Error = false,
                                Message = "User created Successfully",
                                SessionId = responseObject.session_id
                            });
                        }
                    }

                    return StatusCode(500, new AuthenticationResponce
                    {
                        Error = true,
                        Message = "Something Whent wrong please try again"
                    });
                }
                else
                {
                    return StatusCode(500, new AuthenticationResponce
                    {
                        Error = true,
                        Message = $"{response.StatusCode} - {response.ReasonPhrase}"
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthenticationResponce
                {
                    Error = true,
                    Message = $"Error: {ex.Message}"
                });
            }
        }
    }

    [HttpPost("Show_User_Tickets")]
    public async Task<IActionResult> Show_User_Tickets([FromBody] ShowUserTicketsRequest ShowUserTicketsRequest)
    {
        var user = await _unitOfWork.User.Find(x => x.UserName == ShowUserTicketsRequest.UserName && x.Password == ShowUserTicketsRequest.Password);
        if (user == null)
        {
            return BadRequest(new { error = true, message = "Please sign in correctly before requesting a ticket" });
        }

        var tickets = await _unitOfWork.User.GetTickets(user.Id);
        return Ok(tickets);
    }


    [HttpGet("CheckuserExists")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
    [ProducesResponseType(statusCode: StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
    public async Task<IActionResult> CheckuserExists(int id)
    {
        var userexists = await _unitOfWork.User.Find(x => x.Id == id);
        if (userexists == null)
        {
            return Ok(new { message = "Use does not exists" });
        }
        var user = _mapper.Map<UserDto>(userexists);
        return Ok(user);
    }


    private async Task<string> GetUserNameAsync(string session_id)
    {
        string url = "https://api.themoviedb.org/3/account/21028464?session_id=" + session_id;

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration.API_Token);
            try
            {
                // Make the POST request
                var response = await client.GetAsync(url);

                // Check for successful response
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var name = JsonConvert.DeserializeObject<ResponceUserDetail>(content);
                    return name.username;
                }
                return "";
            }
            catch (Exception ex)
            {
                return "";
            }
        }

    }

    private class ResponseSessionIdRequest
    {
        public bool Success { get; set; }
        public string session_id { get; set; }
    }

    private class ResponceUserDetail
    {
        public string id { get; set; }
        public string iso_639_1 { get; set; }
        public string iso_3166_1 { get; set; }
        public string name { get; set; }
        public string include_adult { get; set; }
        public string username { get; set; }
    }

}
