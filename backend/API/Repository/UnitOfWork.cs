using AutoMapper;
using backend.API.Repository.IRepository;

namespace backend.API.Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly Supabase.Client _supabaseClient;
    private readonly IMapper _mapper;
    public IUserRepository User { get; private set; }
    public ITicketRepository Ticket { get; private set; }
    public IMovieHallRepository MovieHall { get; private set; }

    public UnitOfWork(Supabase.Client supabaseClient, IMapper mapper)
    {
        _supabaseClient = supabaseClient;
        _mapper = mapper;

        User = new UserRepository(_supabaseClient, mapper);
        Ticket = new TicketRepository(_supabaseClient, mapper);
        MovieHall = new MovieHallRepository(_supabaseClient, mapper);
    }
}