using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using TELPA.Components;

namespace TELPA.Extensions.Logic.Components
{
    public class FileLoggerService : ILoggerService
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            var message = DateTime.Now.ToLongDateString() + " " + DateTime.Now.ToLongTimeString() + ":\n";
            message += "    " + context.ActionDescriptor.DisplayName + " was called by " + "\n";
            var bytes = Encoding.UTF8.GetBytes(message);

            for (var i = 0; i < 10; i++)
            {
                try
                {
                    using (var file = File.Open("log.txt", FileMode.Append, FileAccess.Write, FileShare.None))
                    {
                        file.Write(bytes, 0, bytes.Length);
                        break;
                    }
                }
                catch (IOException e)
                {
                    Thread.Sleep(10);
                }
            }
            
            System.Diagnostics.Debug.WriteLine(context.ActionDescriptor.DisplayName);
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
