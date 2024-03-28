using FoodAPI.DataAccess.Data;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly ApplicationDbContext _db;

        public CategoryRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
