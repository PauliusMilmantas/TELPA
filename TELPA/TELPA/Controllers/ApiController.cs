using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    public class ApiController : System.Web.Http.ApiController
    {
        private readonly ApplicationDbContext db;

        public ApiController(ApplicationDbContext db) {
            this.db = db;
        }

        [System.Web.Http.HttpGet]
        public String ViewDays()
        {
            return "Hello world";
        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult ViewEmployees() {
            IList<Employee> emploees = null;

            emploees = db.Employees.ToList<Employee>();

            if (emploees.Count == 0) {
                return NotFound();
            }

            Console.WriteLine(emploees.Count);

            return Ok(emploees);
        }

        [System.Web.Http.HttpGet]
        public String ViewLearningDayTopic() {
            return "123";
        }
    }
}