using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository.IRepository
{
    public interface IFoodItemRepository : IRepository<FoodItem>
    {
    }
}
