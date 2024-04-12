using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository.IRepository
{
    public interface IOrderDetailRepository : IRepository<OrderDetail>
    {
        Task<OrderDetail> UpdateAsync(OrderDetail entity);
    }
}
