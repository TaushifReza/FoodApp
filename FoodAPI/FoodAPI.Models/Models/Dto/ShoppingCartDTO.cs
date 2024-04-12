namespace FoodAPI.Models.Models.Dto
{
    public class ShoppingCartDTO
    {
        public int Id { get; set; }
        public int FoodItemId { get; set; }
        public FoodItem FoodItem { get; set; }
        public int Count { get; set; }
        public double? Price { get; set; }
    }
}
