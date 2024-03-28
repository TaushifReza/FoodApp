using System.Net;

namespace FoodAPI.Models.Models
{
    public class APIResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; } = false;
        public List<string> ErrorMessage { get; set; }
        public object Result { get; set; }
    }
}
