using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TELPA.Models;

namespace TELPA.Controllers
{
    public class EmployeeController : Controller
    {
        public ActionResult Index()
        {
            IEnumerable<Employee> employees = null;

            using (var client = new HttpClient()) {
                client.BaseAddress = new Uri("https://localhost:44399/api/");

                var responseTask = client.GetAsync("employee");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<Employee>>();
                    readTask.Wait();

                    employees = readTask.Result;
                }
                else { 
                    employees = Enumerable.Empty<Employee>();

                    ModelState.AddModelError(string.Empty, "Server error. Please contact administrator.");
                }
            }

            return View(employees);
        }
    }
}