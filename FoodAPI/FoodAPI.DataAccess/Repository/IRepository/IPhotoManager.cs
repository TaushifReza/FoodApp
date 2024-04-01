using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace FoodAPI.DataAccess.Repository.IRepository
{
    public interface IPhotoManager
    {
        public Task<ImageUploadResult> UploadImageAsync(IFormFile file);
    }
}
