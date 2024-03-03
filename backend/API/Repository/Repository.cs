using System.Linq.Expressions;
using AutoMapper;
using backend.API.Repository.IRepository;
using Postgrest.Models;

namespace backend.API.Repository;

public class Repository<T> : IRepository<T> where T : BaseModel, new()
{
    private readonly Supabase.Client _supabaseClient;
    public Repository(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<bool> Add(T entity)
    {
        await _supabaseClient.From<T>().Insert(entity);
        return true;
    }

    public async Task<bool> Exists(Predicate<T> match)
    {
        var item = await _supabaseClient.From<T>().Get();
        var exists = item.Models.Find(match);

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

    public Task Remove(T entity)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> Update(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> keySelector, object? value)
    {
        var result = await _supabaseClient
          .From<T>()
          .Where(predicate)
          .Set(keySelector, value)
          .Update();
        return true;
    }
}