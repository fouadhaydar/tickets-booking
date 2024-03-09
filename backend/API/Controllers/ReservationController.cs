using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using backend.API.Models;
using backend.API.Models.DTO.Request;
using backend.API.Repository.IRepository;


namespace backend.API.Controllers;


[Route("api/[controller]")]
public class ReservationController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ReservationController(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpPost("Request_a_Ticket")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
    [ProducesResponseType(statusCode: StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Request_a_Ticket([FromBody] TicketRequest ticketRequest)
    {
        // Check user credential 
        var user = await _unitOfWork.User.Find(x => x.UserName == ticketRequest.UserName && x.Password == ticketRequest.SessionId);
        if (user == null)
        {
            return BadRequest(new { error = true, message = "Please sign in correctly before requesting a ticket" });
        }

        var TheMovieHall = await _unitOfWork.MovieHall.Find(x => x.Id == ticketRequest.MovieHallId);

        // Get the seats reservation in the specified movie hall
        ReservationResult result1 = ConstructBinary(ticketRequest.SeatsToReserve, false, TheMovieHall.SeatsReservation);
        ReservationResult result2 = ConstructBinary(ticketRequest.SeatsToReserve, true, TheMovieHall.SeatsReservation);
        if (result1.Error)
        {
            return Ok(new { Error = result1.Error, message = result1.ErrorMessage });
        }
        if (result2.Error)
        {
            return Ok(new { Error = result2.Error, message = result2.ErrorMessage });
        }

        // Check if the user already has a ticket for this movie hall, just update the old ticket
        var check_user = await _unitOfWork.Ticket.Find(x => x.MovieHallId == ticketRequest.MovieHallId && x.UserId == user.Id);
        var result = false;
        if (check_user == null)
        {
            // create a ticket for the user, this is the first ticket for this movie hall
            int[] seats = result1.Arr;
            var model = new Ticket
            {
                SeatsReservation = seats,
                MovieHallId = ticketRequest.MovieHallId,
                UserId = user.Id
            };
            result = await _unitOfWork.Ticket.Add(model);
        }
        else
        {
            // update the ticket of the user for this specific movie hall
            var old_reservation = check_user.SeatsReservation;
            result1 = ConstructBinary(ticketRequest.SeatsToReserve, true, old_reservation);
            result = await _unitOfWork.Ticket.Update(x => x.Id == check_user.Id, x => x.SeatsReservation, result1.Arr);
        }
        if (!result)
        {
            return StatusCode(500, new { error = true, message = "something when wrong please try again" });
        }

        // update the reserved seats for this movie hall
        result = await _unitOfWork.Ticket.Update(x => x.Id == ticketRequest.MovieHallId, x => x.SeatsReservation, result2.Arr);
        if (!result)
        {
            return StatusCode(500, new { error = true, message = "something when wrong please try again" });
        }
        return Ok(new { error = false, message = "Your Ticket is added" });
    }

    [HttpPost("Show_Available_Seats")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
    [ProducesResponseType(statusCode: StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Show_Available_Seats([FromBody] ShowAvailableSeatsRequest showAvailableSeatsRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { error = true, message = "Please enter a valid Movie hall" });
        }

        // Get all the reserved seats
        List<int> all_reserved_seats = new();
        var all_movie_hall = await _unitOfWork.MovieHall.Find(x => x.Id == showAvailableSeatsRequest.MovieHallId);
        var seats = all_movie_hall.SeatsReservation;
        int count = 0;
        foreach (var block in seats)
        {
            for (int i = 0; i < 32; i++)
            {
                if ((1 & (block >> i)) == 1)
                {
                    all_reserved_seats.Add(count * 32 + i + 1);
                }
            }
            count++;
        }

        // Get the seats reserved by this user
        // List<int> user_reserved_seats = new();
        // var all_tickets = await _unitOfWork.Ticket.Find(x => x.MovieHallId == showAvailableSeatsRequest.MovieHallId && x.UserId == showAvailableSeatsRequest.UserId);
        // seats = all_tickets.SeatsReservation;
        // count = 0;
        // foreach (var block in seats)
        // {
        //     for (int i = 0; i < 32; i++)
        //     {
        //         if ((1 & (block >> i)) == 1)
        //         {
        //             user_reserved_seats.Add(count * 32 + i + 1);
        //         }
        //     }
        //     count++;
        // }


        return Ok(new
        {
            all_seats = all_reserved_seats,
            // user_seats = user_reserved_seats 
        });
    }


    private static ReservationResult ConstructBinary(int[] seats, bool updateReservation, int[] oldRes)
    {
        ReservationResult reservationResult = new();
        if (updateReservation)
        {
            reservationResult.Arr = oldRes;
        }

        foreach (var seatNumber in seats)
        {
            if (seatNumber == 0)
            {
                reservationResult.Error = true;
                reservationResult.ErrorMessage = "their is no seat with number 0, Please shoose another one";
                return reservationResult;
            }

            int pos = (seatNumber - 1) / 32;
            int offset = (seatNumber - 1) % 32;

            if (((reservationResult.Arr[pos] >> offset) & 1) == 1)
            {
                reservationResult.Error = true;
                reservationResult.ErrorMessage = $"The seat {seatNumber} is already taken";
                return reservationResult;
            }

            int number = 1 << offset;
            reservationResult.Arr[pos] |= number; // transfer the bit in the pos at the bit offset to 1
        }

        return reservationResult;
    }

    private class ReservationResult
    {
        public int[] Arr { get; set; }
        public bool Error { get; set; }
        public string ErrorMessage { get; set; }
        public ReservationResult()
        {
            Arr = new int[10];
            Error = false;
        }
    }
}