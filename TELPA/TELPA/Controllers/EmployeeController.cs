using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/employee")]
    public class EmployeeController : Controller
    {
        private ApplicationDbContext db;
        public EmployeeController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Ok("System online");
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult getEmployee(string id)
        {
            return Json(db.Employees.Find(id));
        }

        [HttpPost("create")]
        public IActionResult createEmployee(Employee employee)
        {
            this.db.Employees.Add(employee);
            this.db.SaveChanges();
            return Ok("Employee created");
        }

        [HttpPost("update")]
        public IActionResult updateEmployee(Employee employee)
        {
            this.db.Employees.Update(employee);
            this.db.SaveChanges();
            return Ok("Employee updated");
        }

        [HttpGet("test/1")]
        public IActionResult testCreate()
        {
            Employee emp = new Employee();
            emp.UserId = "3";
            emp.Name = "Ignas";
            emp.Version = 0;

            return createEmployee(emp);
        }

        [HttpGet("test/2")]
        public IActionResult testUpdate()
        {
            Employee emp = this.db.Employees.Find("2");
            emp.Role = "New role";
            emp.Name = emp.Name + "2";
            
            return updateEmployee(emp);
        }



        /*public ActionResult Index()
        {
            IEnumerable<Employee> employees = null;
             
            using (var client = new HttpClient()) {
                client.BaseAddress = new Uri(Constants.Config.localAddress);

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
        }*/

    }
}