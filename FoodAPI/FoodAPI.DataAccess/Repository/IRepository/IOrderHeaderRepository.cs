using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository.IRepository
{
    public interface IOrderHeaderRepository : IRepository<OrderHeader>
    {
        Task<OrderHeader> UpdateAsync(OrderHeader entity);
        Task<OrderHeader?> UpdateStatusAsync(int id, string orderStatus, string? paymentStatus =  null);
        Task<OrderHeader?> UpdateStripePaymentIDAsync(int id, string sessionId, string paymentIntentId);
    }
}
