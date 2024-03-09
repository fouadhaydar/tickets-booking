using System.Linq.Expressions;

namespace backend.API.Repository.IRepository;

public interface IRepository<T> where T : class
{
    public Task<IEnumerable<T>> GetAll();
    public Task<bool> Add(T entity);
    public Task<bool> Update(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> keySelector, object? value);
    public Task Remove(T entity);
    public Task<bool> Exists(Predicate<T> match);
    public Task<T> Find(Predicate<T> match);
    public Task<List<T>> FindAll(Predicate<T> match);
}