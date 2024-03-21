using System.ComponentModel.DataAnnotations;

namespace YetaiEatsAPI.Models
{
    public class DeliveryRider
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Vehicle information is required")]
        public string VehicleInformation { get; set; }
        public bool AvailabilityStatus { get; set; }
    }
}
