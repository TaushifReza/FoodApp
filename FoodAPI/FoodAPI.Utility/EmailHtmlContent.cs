using System;

namespace FoodAPI.Utility
{
    public class EmailHtmlContent
    {
        public string AccountRegistrationResponse(string sellerName)
        {
            string response = $@"
            <div style=""text-align: center; background-color: #f6f6f6; font-family: 'Rubik', sans-serif; padding: 0.3rem;"">
                <div style=""max-width: 500px; margin: 0 auto;"">
                    <section>
                        <div style=""margin: 2rem auto; padding: 1rem; background-color: #ffffff; border-radius: 0.5rem; font-family: 'Rubik', sans-serif;"">
                            <div style=""position: relative;"">
                                <h2 style=""position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #555; font-family: 'Rubik', sans-serif;"">Yetai Food</h2>
                                <img src=""https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"" style=""width: 100%; border-radius: 0.5rem; opacity:0.7;"">
                            </div>
                            <p style=""margin-top: 1.5rem; text-align: left; font-size: 16px;"">Hey {sellerName},</p>
                            <p style=""line-height: 1.5; text-align: left; font-size: 16px;"">You're just one step away from managing your delicious offerings with ease. Access your seller dashboard and start delighting customers.</p>
                            <div style=""text-align: center;"">
                                <a href=""{SD.FrontEndLoginUrl}"" style=""display: inline-block; padding: 0.6rem 1.1rem; background-color: #28a745; color: #fff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 0.3rem;"">Go to Login Page</a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            ";

            return response;
        }
    }
}