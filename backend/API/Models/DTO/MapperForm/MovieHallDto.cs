using System.Collections;

namespace backend.API.Models.DTO.MapperForm;

public class MovieHallDto
{
    public int Id { get; set; }
    public DateTime DateOfMovie { get; set; }
    public int[] SeatsReservation { get; set; }
    public int MovieId { get; set; }
    public int HallId { get; set; }
}