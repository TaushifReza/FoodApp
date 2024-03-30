using FoodAPI.DataAccess.Data;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository
{
    public class FoodItemRepository : Repository<FoodItem>, IFoodItemRepository
    {
        private readonly ApplicationDbContext _db;
        public FoodItemRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
