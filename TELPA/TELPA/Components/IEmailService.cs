using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TELPA.Entities;

namespace TELPA.Components
{
    public interface IEmailService
    {
        public void SendEmail(EmailData emailData);
    }
}
