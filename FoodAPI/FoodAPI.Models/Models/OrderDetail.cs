using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodAPI.Models.Models
{
    public class OrderDetail 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("OrderHeader")]
        public int OrderHeaderId { get; set; }
        public OrderHeader OrderHeader { get; set; }

        [ForeignKey("FoodItem")]
        public int FoodItemId { get; set; }
        public FoodItem FoodItem { get; set; }

        public int Count { get; set; }
        public double Price { get; set; }
    }
}
