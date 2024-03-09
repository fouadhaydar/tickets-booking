using AutoMapper;
using backend.API.Models;
using backend.API.Repository.IRepository;
using Supabase;

namespace backend.API.Repository;

public class TicketRepository : Repository<Ticket>, ITicketRepository
{
    public TicketRepository(Client supabaseClient, IMapper mapper) : base(supabaseClient)
    {
    }
}