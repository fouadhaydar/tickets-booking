namespace backend.API.Repository.IRepository;

public interface IUnitOfWork
{
    IUserRepository User { get; }
    ITicketRepository Ticket { get; }
    IMovieHallRepository MovieHall { get; }
}