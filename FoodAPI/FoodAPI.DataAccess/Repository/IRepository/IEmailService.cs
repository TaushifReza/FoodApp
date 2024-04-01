using FoodAPI.Models.Models;

namespace FoodAPI.DataAccess.Repository.IRepository
{
    public interface IEmailService
    {
        public Task SendEmailAsync(MailRequest mailRequest);
    }
}
