namespace backend.API.Models.DTO.Request;

public class TicketRequest
{
    public int[] SeatsToReserve { get; set; }
    public int MovieHallId { get; set; }
    public int UserId { get; set; }
}