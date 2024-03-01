using System.Linq.Expressions;

namespace backend.API.Repository.IRepository;

public interface IRepository<T> where T : class
{
    public Task<T> GetById(int id);
    public Task<IEnumerable<T>> GetAll();
    public Task<bool> Add(T entity);
    public Task Update(int id, Expression<Func<T, object>> keySelector, object? value);
    public Task Remove(T entity);
    public Task<bool> Exists(int id);
    public Task<T> Find(Predicate<T> match);
}