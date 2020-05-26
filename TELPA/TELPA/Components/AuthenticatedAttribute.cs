using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public class AuthenticatedAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            IAuthorizationService authorization = context.HttpContext.RequestServices.GetService(typeof(IAuthorizationService)) as IAuthorizationService;
            if (context.HttpContext.Request.Headers.ContainsKey("X-SessionToken"))
            {
                string token = context.HttpContext.Request.Headers["X-SessionToken"];
                if (!authorization.IsLoggedIn(token))
                {
                    context.Result = new ForbidResult();
                    return;
                }
            }
            else
            {
                context.Result = new ForbidResult();
                return;
            }
        }
    }
}
