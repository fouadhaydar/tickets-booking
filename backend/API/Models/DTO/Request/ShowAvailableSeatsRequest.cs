namespace backend.API.Models.DTO.Request;

public class ShowAvailableSeatsRequest
{
    public int MovieHallId { get; set; }
    public int UserId { get; set; }
}