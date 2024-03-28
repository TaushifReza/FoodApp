using FoodAPI.DataAccess.Data;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository
{
    public class SellerProfileRepository : Repository<SellerProfile>, ISellerProfileRepository
    {
        private readonly ApplicationDbContext _db;
        public SellerProfileRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
