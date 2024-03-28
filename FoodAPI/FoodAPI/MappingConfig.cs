using AutoMapper;
using FoodAPI.Models.Models;
using FoodAPI.Models.Models.Dto;

namespace FoodAPI
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<SellerProfile, SellerProfileCreateDTO>().ReverseMap();
            CreateMap<SellerProfile, SellerProfileDTO>().ReverseMap();
            CreateMap<Category, CategoryCreateDTO>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
        }
    }
}
