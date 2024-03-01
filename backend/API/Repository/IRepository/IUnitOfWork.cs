namespace backend.API.Repository.IRepository;

public interface IUnitOfWork
{
    IUserRepository User { get; }
}