namespace backend.API.Models.DTO.Request;

public class ShowAvailableSeatsRequest
{
    public int MovieHallId { get; set; }
    public int HallNumber { get; set; }
    public int MediaId { get; set; }
    public DateTime DateOfMove { get; set; }
}