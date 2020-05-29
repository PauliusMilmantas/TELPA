using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using TELPA.Entities;
using Microsoft.Extensions.Options;
using TELPA.Constants;

namespace TELPA.Components
{
    public class EmailService : IEmailService
    {

        private IOptions<Config> config;

        public EmailService(IOptions<Config> config)
        {
            this.config = config;
        }

        public void SendEmail(EmailData emailData)
        {
            SmtpClient clientDetails = new SmtpClient
            {
                Port = this.config.Value.Email.Port,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(this.config.Value.Email.Address, this.config.Value.Email.Password)
            };

            MailMessage mailDetails = new MailMessage();
            mailDetails.From = new MailAddress(this.config.Value.Email.Address);
            mailDetails.To.Add(emailData.ReceiverAddress);
            mailDetails.Subject = emailData.Subject;
            mailDetails.Body = emailData.Body;

            clientDetails.Send(mailDetails);
        }
    }
}
