using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public class NoOpAuthenticationOptions : AuthenticationSchemeOptions
    {
        public string AuthenticationScheme { get; private set; }
        public bool AutomaticAuthenticate { get; private set; }

        public NoOpAuthenticationOptions()
        {
            AuthenticationScheme = "AwesomeAuthentication";
            AutomaticAuthenticate = false;
        }
    }
}
