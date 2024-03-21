using YetaiEatsAPI.Models;

namespace YetaiEatsAPI.Interfaces
{
    public interface ISellerService
    {
        public List<Seller> GetRestaurantSellerDetails();
        public Seller AddDeliveryRider(Seller restaurantSeller);
    }
}
