﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Components
{
    interface IEmailService
    {
        public void SendEmail(string email);
    }
}
