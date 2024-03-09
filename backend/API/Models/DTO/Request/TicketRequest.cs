namespace backend.API.Models.DTO.Request;

public class TicketRequest
{
    public string UserName { get; set; }
    public string SessionId { get; set; }
    public int[] SeatsToReserve { get; set; }
    public int MovieHallId { get; set; }
}