using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public interface ILoggerService
    {
        public void OnActionExecuting(ActionExecutingContext context);

        public void OnActionExecuted(ActionExecutedContext context);
    }
}
