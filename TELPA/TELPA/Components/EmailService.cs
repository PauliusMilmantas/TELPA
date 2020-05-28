using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TELPA.Components
{
    public class EmailService : IEmailService
    {
        private int port = 587;
        private string email = "bootlegas@gmail.com";
        private string password = "testuojam123";
        private string subject = "Invitation to TELPA";
        private string body = "You have been invited to join TELPA click this link to register";
        public void SendEmail(string email)
        {
            try
            {
                SmtpClient clientDetails = new SmtpClient
                {
                    Port = this.port,
                    Host = "smtp.gmail.com",
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(this.email, this.password)
                };

                MailMessage mailDetails = new MailMessage();
                mailDetails.From = new MailAddress(this.email);
                mailDetails.To.Add(email);
                mailDetails.Subject = this.subject;
                mailDetails.Body = this.body;
            } 
            catch 
            {
                
            }
        }
    }
}
