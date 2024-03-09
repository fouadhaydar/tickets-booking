namespace backend.API.Models.DTO.Response;

public class TicketResponce
{
    public int Id { get; set; }
    public int[] SeatsReservation { get; set; }
    public int HallNumber { get; set; }
    public DateTime DateOfMovie { get; set; }
    public int MediaId { get; set; }
    public string MediaType { get; set; }
    public int NumberOfSeats { get; set; }
    public string MovieTitle { get; set; }
    public float Rate { get; set; }
    public string ImagePath { get; set; }
}