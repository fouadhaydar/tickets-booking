using System.Linq.Expressions;
using AutoMapper;
using backend.API.Models;
using backend.API.Repository.IRepository;

namespace backend.API.Repository;

public class Repository<T> : IRepository<T> where T : MyBaseModel, new()
{
    private readonly Supabase.Client _supabaseClient;
    private readonly IMapper _mapper;
    public Repository(Supabase.Client supabaseClient, IMapper mapper)
    {
        _supabaseClient = supabaseClient;
        _mapper = mapper;
    }

    public async Task<bool> Add(T entity)
    {
        await _supabaseClient.From<T>().Insert(entity);
        return true;
    }

    public async Task<bool> Exists(int id)
    {
        var item = await _supabaseClient.From<T>().Get();
        var exists = item.Models.Find(x => x.PrimaryKey.Equals(id));

        if (exists != null)
        {
            return true;
        }
        return false;
    }

    public async Task<T> Find(Predicate<T> match)
    {
        var model = await _supabaseClient.From<T>().Get();
        var item = model.Models.Find(match);
        return item;
    }

    public async Task<IEnumerable<T>> GetAll()
    {
        var model = await _supabaseClient.From<T>().Get();
        var item = model.Models;

        return item;
    }

    public async Task<T> GetById(int id)
    {
        var item = await _supabaseClient.From<T>().Get();
        var user = item.Models.Find(x => x.Id == id);

        return user;
    }

    public Task Remove(T entity)
    {
        throw new NotImplementedException();
    }

    public async Task Update(int id, Expression<Func<T, object>> keySelector, object? value)
    {
        await _supabaseClient
          .From<T>()
          .Where(x => x.Id == id)
          .Set(keySelector, value)
          .Update();
    }
}