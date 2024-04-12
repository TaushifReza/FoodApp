using FoodAPI.DataAccess.Data;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository
{
    public class OrderDetailRepository : Repository<OrderDetail>, IOrderDetailRepository
    {
        private readonly ApplicationDbContext _db;

        public OrderDetailRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<OrderDetail> UpdateAsync(OrderDetail entity)
        {
            _db.OrderDetails.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
