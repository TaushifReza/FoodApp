using FoodAPI.DataAccess.Data;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository
{
    public class ShoppingCartRepository : Repository<ShoppingCart>, IShoppingCartRepository
    {
        private readonly ApplicationDbContext _db;

        public ShoppingCartRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<ShoppingCart> UpdateAsync(ShoppingCart entity)
        {
            _db.ShoppingCarts.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
