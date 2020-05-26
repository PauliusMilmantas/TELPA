using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public class ConcurrencyExceptionHandler
    {
        private readonly RequestDelegate next;
        public ConcurrencyExceptionHandler(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            if (ex is DbUpdateConcurrencyException)
            {
                var code = HttpStatusCode.Conflict;
                context.Response.StatusCode = (int)code;
            }
            return context.Response.WriteAsync(JsonConvert.SerializeObject(ex.Message));
        }
    }
}
