using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public class LoggedAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            (context.HttpContext.RequestServices.GetService(typeof(ILoggerService)) as ILoggerService).OnActionExecuting(context);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            (context.HttpContext.RequestServices.GetService(typeof(ILoggerService)) as ILoggerService).OnActionExecuted(context);
        }
    }
}
