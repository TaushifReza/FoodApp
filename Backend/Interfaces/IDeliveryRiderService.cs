using YetaiEatsAPI.Models;

namespace YetaiEatsAPI.Interfaces
{
    public interface IDeliveryRiderService
    {
        public List<DeliveryRider> GetDeliveryRiderDetails();
        public DeliveryRider AddDeliveryRider(DeliveryRider deliveryRider);
    }
}
