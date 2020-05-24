using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public class NoOpAuthenticationHandler : AuthenticationHandler<NoOpAuthenticationOptions>
    {
        public NoOpAuthenticationHandler(IOptionsMonitor<NoOpAuthenticationOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
        {

        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var prop = new AuthenticationProperties();
            var ticket = new AuthenticationTicket(Context.User, prop, "NoOpAuthentication");
            return await Task.Run(() => AuthenticateResult.Success(ticket));
        }
    }
}
