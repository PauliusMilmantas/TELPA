using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            return Json(Ok("EmployeeController online"));
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);

            if (employee != null)
            {
                return Json(employee);
            }
            else
            {
                return NotFound("GET: Employee with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("get/all")]
        public IActionResult getEmployees()
        {
            IList<Employee> employees = db.Employees.ToList<Employee>();

            if (employees.Count != 0)
            {
                return Json(employees);
            }
            else
            {
                return NotFound("No employees found.");
            }
        }

        [HttpGet]
        [Route("get/all/leaders")]
        public IActionResult getLeaders()
        { 
            IList<Employee> leaders = db.Employees.FromSqlRaw(
                @"
                select
                    emp.*
                from
                    (select
                        emp_ldr.leaderId id
                    from
                        employees emp_ldr
					where
					  emp_ldr.leaderId is not null
                    group by
                        emp_ldr.leaderId) ldr,
                    employees emp
                where
                    emp.id = ldr.id")
                .ToList<Employee>();

            if (leaders.Count != 0)
            {
                return Json(leaders);
            }
            else
            {
                return NotFound("No leaders found.");
            }
        }

        [HttpGet]
        [Route("get/all/leaders/unassigned")]
        public IActionResult getUnassignedLeaders()
        {
            IList<Employee> unassignedLeaders = db.Employees.FromSqlRaw(
                @"
                select
                  emp.*
                from 
                  employees emp
                where
                  emp.id not in (
                    select
                      ldr.leaderId
                    from
                      employees ldr
	                where
	                  ldr.leaderId is not null
                    group by
                      ldr.leaderId)")
                .ToList<Employee>();

            if (unassignedLeaders.Count != 0)
            {
                return Json(unassignedLeaders);
            }
            else
            {
                return NotFound("No unassigned leaders found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createEmployee([FromBody] Employee employee)
        {
            if (employee != null)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                return Json(Ok("Employee created"));
            }
            else
            {
                return NotFound("CREATE: Employee was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateEmployee([FromBody] Employee employee)
        {
            if (employee != null)
            {
                db.Employees.Update(employee);
                db.SaveChanges();
                return Json(Ok("Employee updated"));
            }
            else
            {
                return NotFound("UPDATE: Employee was not found");
            }
        }

        [HttpGet]
        [Route("delete/{id}")]
        public IActionResult deleteEmployee(int id)
        {
            try
            {
                Employee employee = db.Employees.Find(id);
                db.Employees.Remove(employee);
                db.SaveChanges();
                return Json(Ok("Employee deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: Employee with ID = " + id + " was not found.");
            }
        }
    }
}