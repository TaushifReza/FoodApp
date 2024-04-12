using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository.IRepository
{
    public interface IShoppingCartRepository : IRepository<ShoppingCart>
    {
        Task<ShoppingCart> UpdateAsync(ShoppingCart entity);
    }
}
