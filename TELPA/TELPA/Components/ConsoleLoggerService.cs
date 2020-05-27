using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public class ConsoleLoggerService : ILoggerService
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            var message = DateTime.Now.ToLongDateString() + " " + DateTime.Now.ToLongTimeString() + ":\n";
            message += "    " + context.ActionDescriptor.DisplayName + " was called by " + "\n";
            System.Diagnostics.Debug.Write(message);
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
