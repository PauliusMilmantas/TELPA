using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public static class NoOpAuthExtensions
    {
        //public static AuthenticationBuilder AddNoOpAuth(this AuthenticationBuilder builder)
        //    => builder.AddNoOpAuth(NoOpScheme, _ => { });
        //public static AuthenticationBuilder AddNoOpAuth(this AuthenticationBuilder builder, Action<NoOpAuthOptions> configureOptions)
        //    => builder.AddNoOpAuth(NoOpAuthenticationHandler.NoOpSchema, configureOptions);
        //public static AuthenticationBuilder AddNoOpAuth(this AuthenticationBuilder builder, string authenticationScheme, Action<NoOpAuthOptions> configureOptions)
        //    => builder.AddNoOpAuth(authenticationScheme, null, configureOptions);
        //public static AuthenticationBuilder AddNoOpAuth(this AuthenticationBuilder builder, string authenticationScheme, string displayName, Action<NoOpAuthOptions> configureOptions)
        //{
        //    return builder.AddScheme<NoOpAuthOptions, NoOpAuthHandler>(authenticationScheme, displayName, configureOptions);
        //}
    }
}
