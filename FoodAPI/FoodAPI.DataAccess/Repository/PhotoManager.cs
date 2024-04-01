using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace FoodAPI.DataAccess.Repository
{
    public class PhotoManager : IPhotoManager
    {
        private readonly CloudinarySettings _cloudinarySettings;
        private readonly Cloudinary _cloudinary;
        public PhotoManager(IOptions<CloudinarySettings> options)
        {
            this._cloudinarySettings = options.Value;
            Account account = new Account(_cloudinarySettings.CloudName, _cloudinarySettings.ApiKey, _cloudinarySettings.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> UploadImageAsync(IFormFile file)
        {
            ImageUploadResult uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };
                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }
            return uploadResult;
        }
    }
}
