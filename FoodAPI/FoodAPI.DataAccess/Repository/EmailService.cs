using FoodAPI.DataAccess.Repository.IRepository;
using FoodAPI.Models.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace FoodAPI.DataAccess.Repository
{
    public class EmailService : IEmailService
    {
        private readonly EmailSetting _emailSetting;
        public EmailService(IOptions<EmailSetting> options)
        {
            this._emailSetting = options.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailSetting.Email);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();

            var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailSetting.Host, _emailSetting.Port, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailSetting.Email, _emailSetting.Password);

            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
