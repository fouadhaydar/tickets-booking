using backend.API.Models;
using backend.API.Models.DTO.Response;

namespace backend.API.Repository.IRepository;

public interface IUserRepository : IRepository<User>
{
    public Task<List<TicketResponce>> GetTickets(int userId);
}