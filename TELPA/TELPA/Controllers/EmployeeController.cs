﻿using System;
using System.Collections.Generic;
using System.Linq;
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
            return Ok("EmployeeController online");
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

        [HttpPost("create")]
        public IActionResult createEmployee(Employee employee)
        {
            if (employee != null)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                return Ok("Employee created");
            }
            else
            {
                return NotFound("CREATE: Employee was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateEmployee(Employee employee)
        {
            if (employee != null)
            {
                db.Employees.Update(employee);
                db.SaveChanges();
                return Ok("Employee updated");
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
                return Ok("Employee deleted");
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: Employee with ID = " + id + " was not found.");
            }
        }




        [HttpGet("test/1")]
        public IActionResult testCreate()
        {
            Employee emp = new Employee();
            emp.Email = "ignas@email.com";
            emp.PasswordHash = "hash(abc123)";
            emp.Name = "Ignas";

            return createEmployee(emp);
        }

        [HttpGet("test/2")]
        public IActionResult testUpdate()
        {
            Employee emp = db.Employees.Find("2");
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