using AutoMapper;
using backend.API.Models;
using backend.API.Models.DTO.MapperForm;

namespace backend.API.Helper;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<Hall, HallDto>();
        CreateMap<Movie, MovieDto>();
        CreateMap<MovieHall, MovieHallDto>();
    }
}