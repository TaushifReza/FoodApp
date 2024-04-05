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

        public async Task<Category> UpdateAsync(Category entity)
        {
            entity.UpdatedDate = DateTime.Now;
            _db.Category.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
