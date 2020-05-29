using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TELPA.Models;

namespace TELPA.Components
{
    public class ConsoleLoggerService : ILoggerService
    {
        private IAuthorizationService authorization;

        public ConsoleLoggerService(IAuthorizationService authorization)
        {
            this.authorization = authorization;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            var userString = "anonymous";
            Employee me = authorization.Me;
            if (me != null)
            {
                userString = "";
                userString += me.Role ?? "employee" + " ";
                userString += me.Name + " ";
                userString += "(" + me.Email + ")";
            }
            var message = DateTime.Now.ToLongDateString() + " " + DateTime.Now.ToLongTimeString() + ":\n";
            message += "    " + context.ActionDescriptor.DisplayName + " was called by " + userString + "\n";
            System.Diagnostics.Debug.Write(message);
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
