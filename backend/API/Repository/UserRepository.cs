using AutoMapper;
using backend.API.Models;
using backend.API.Models.DTO.Response;
using backend.API.Repository.IRepository;
using Newtonsoft.Json;
using Supabase;

namespace backend.API.Repository;

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly Client _supabase;
    public UserRepository(Client supabase, IMapper mapper) : base(supabase)
    {
        _supabase = supabase;
    }

    public async Task<List<TicketResponce>> GetTickets(int userId)
    {
        var ticketsJson = await _supabase.Rpc("get_tickets_for_user", new Dictionary<string, object> { { "a", userId } });
        if (ticketsJson.ResponseMessage != null && ticketsJson.ResponseMessage.IsSuccessStatusCode)
        {
            if (ticketsJson.Content != null)
            {
                var tickets = JsonConvert.DeserializeObject<List<TicketResponce>>(ticketsJson.Content);
                foreach (var item in tickets)
                {
                    item.SeatsReservation = SeatsReserved(item.SeatsReservation);
                }
#pragma warning disable CS8603 // Possible null reference return.
                return tickets;
#pragma warning restore CS8603 // Possible null reference return.
            }
        }
        return new List<TicketResponce>();
    }

    private static int[] SeatsReserved(int[] seats)
    {
        int count = 0;
        List<int> user_reserved_seats = new();
        foreach (var block in seats)
        {
            for (int i = 0; i < 32; i++)
            {
                if ((1 & (block >> i)) == 1)
                {
                    user_reserved_seats.Add(count * 32 + i + 1);
                }
            }
            count++;
        }
        int[] s = user_reserved_seats.ToArray();
        return s;

    }
}