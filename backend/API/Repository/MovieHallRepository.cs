using AutoMapper;
using backend.API.Models;
using backend.API.Repository.IRepository;
using Supabase;

namespace backend.API.Repository;

public class MovieHallRepository : Repository<MovieHall>, IMovieHallRepository
{
    public MovieHallRepository(Client supabaseClient, IMapper mapper) : base(supabaseClient)
    {
    }
}