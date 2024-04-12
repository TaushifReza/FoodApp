using FoodAPI.DataAccess.Data;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodAPI.DataAccess.Repository
{
    public class OrderHeaderRepository : Repository<OrderHeader>, IOrderHeaderRepository
    {
        private readonly ApplicationDbContext _db;

        public OrderHeaderRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<OrderHeader> UpdateAsync(OrderHeader entity)
        {
            _db.OrderHeaders.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }

        public async Task<OrderHeader?> UpdateStatusAsync(int id, string orderStatus, string? paymentStatus = null)
        {
            var orderFromDb = await _db.OrderHeaders.FirstOrDefaultAsync(u => u.Id == id);
            if (orderFromDb != null) {
                orderFromDb.OrderStatus = orderStatus;
                if (!string.IsNullOrEmpty(paymentStatus)) {
                    orderFromDb.PaymentStatus = paymentStatus;
                }
            }
            await _db.SaveChangesAsync();
            return orderFromDb;
        }

        public async Task<OrderHeader?> UpdateStripePaymentIDAsync(int id, string sessionId, string paymentIntentId)
        {
            var orderFromDb = await _db.OrderHeaders.FirstOrDefaultAsync(u => u.Id == id);
            if (!string.IsNullOrEmpty(sessionId)) {
                orderFromDb.SessionId = sessionId;
            }
            if (!string.IsNullOrEmpty(paymentIntentId)) {
                orderFromDb.PaymentIntentId = paymentIntentId;
                orderFromDb.PaymentDate = DateTime.Now;
            }
            await _db.SaveChangesAsync();
            return orderFromDb;
        }
    }
}
