using AutoMapper;
using backend.API.Models;
using backend.API.Repository.IRepository;
using Supabase;

namespace backend.API.Repository;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(Client supabaseClient, IMapper mapper) : base(supabaseClient)
    {
    }
}