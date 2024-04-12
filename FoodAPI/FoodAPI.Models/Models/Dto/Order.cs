namespace FoodAPI.Models.Models.Dto
{
    public class Order
    {
        public OrderHeader OrderHeader { get; set; }
        public List<OrderDetail> OrderDetail { get; set; }
    }
}
