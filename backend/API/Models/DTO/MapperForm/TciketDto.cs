using System.Collections;

namespace backend.API.Models.DTO.MapperForm;

public class TciketDto
{
    public int Id { get; set; }
    public int[] SeatsReservation { get; set; }
    public int MovieHallId { get; set; }
    public int UserId { get; set; }
}