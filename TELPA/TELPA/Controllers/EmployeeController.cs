﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TELPA.Components;
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

        [Logged]
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Json(Ok("EmployeeController online"));
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}")]
        public IActionResult GetEmployee(int id)
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

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}/subordinates")]
        public IActionResult GetEmployeeSubordinates(int id)
        {
            Employee employee = db.Employees.Find(id);

            if (employee != null)
            {
                return Json(employee.Subordinates);
            }
            else
            {
                return NotFound("GET: Employee with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}/learnedTopics")]
        public IActionResult GetEmployeeLearnedTopics(int id)
        {
            Employee employee = db.Employees.Find(id);

            if (employee != null)
            {
                return Json(employee.LearnedTopics);
            }
            else
            {
                return NotFound("GET: Employee with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}/recommendedTopics")]
        public IActionResult GetEmployeeRecommendedTopics(int id)
        {
            Employee employee = db.Employees.Find(id);

            if (employee != null)
            {
                return Json(employee.RecommendedTopics);
            }
            else
            {
                return NotFound("GET: Employee with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}/learningDays")]
        public IActionResult GetEmployeeLearningDays(int id)
        {
            Employee employee = db.Employees.Find(id);

            if (employee != null)
            {
                return Json(employee.LearningDays);
            }
            else
            {
                return NotFound("GET: Employee with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}/limits")]
        public IActionResult GetEmployeeLimits(int id)
        {
            Employee employee = db.Employees.Find(id);

            if (employee != null)
            {
                return Json(employee.Limits);
            }
            else
            {
                return NotFound("GET: Employee with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}/invites")]
        public IActionResult GetEmployeeInvites(int id)
        {
            Employee employee = db.Employees.Find(id);

            if (employee != null)
            {
                return Json(employee.LearnedTopics);
            }
            else
            {
                return NotFound("GET: Employee with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/all")]
        public IActionResult GetEmployees()
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

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/all/employeesAndLeaders")]
        public IActionResult getEmployeesAndLeaders()
        {
            var result = db.EmployeesAndLeaders.FromSqlRaw(
                @"
                select
                    emp.id employeeId,
                    emp.name employeeName,
                    emp.email employeeEmail,
                    emp.role employeeRole,
                    ldr.id leaderId,
                    ldr.name leaderName,
                    ldr.email leaderEmail
                from
                    employees emp,
                    employees ldr
                where
                    ldr.id = emp.leaderId")
                .ToList<EmployeesAndLeaders>();

            if (result.Count != 0)
            {
                return Json(result);
            }
            else
            {
                return NotFound("No employees with leaders found.");
            }
        }

        // Grazina visu zemesniu lygiu employees ir ju lyderius pagal virsiausio lyderio lygi
        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/employeesAndLeadersForSupremeLeader/{supremeLeaderId}")]
        public IActionResult getEmployeesAndLeadersForSupremeLeader(int supremeLeaderId)  
        {
            var result = db.EmployeesAndLeadersForSupremeLeader.FromSqlInterpolated(
                $@"
                with employees_rec as (
                  select
                    emp_par.*
                  from
                    employees emp_par
                  where
                    emp_par.id = {supremeLeaderId}
                  union all
                  select
                    emp_chi.*
                  from
                    employees emp_chi,
	                employees_rec emp_rec
                  where
                    emp_rec.id = emp_chi.leaderId)
                select
				  emp_rec.id employeeId,
				  emp_rec.name employeeName,
				  emp_rec.email employeeEmail,
				  ldr.id leaderId,
				  ldr.name leaderName,
				  ldr.email leaderEmail,
				  sup_ldr.id supremeLeaderId,
				  sup_ldr.name supremeLeaderName,
				  sup_ldr.email supremeLeaderEmail
                from
                  employees_rec emp_rec,
				  employees ldr,
				  employees sup_ldr
                where 
                  emp_rec.id <> {supremeLeaderId} and
				  ldr.id = emp_rec.leaderId and
				  sup_ldr.id = {supremeLeaderId}")
                .ToList<EmployeesAndLeadersForSupremeLeader>();

            /*            if (result.Count != 0)
                        {
                            return Json(result);
                        }
                        else
                        {
                            return NotFound("No employees and leaders found under supreme leader ID = " + supremeLeaderId);
                        }*/
            return Json(result);
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/employeesForLeader/leaders/{supremeLeaderId}")]
        public IActionResult getLeadersForSupremeLeader(int supremeLeaderId)  // Grazina visu zemesniu lygiu lyderius pagal lyderio lygi
        {
            IList<Employee> leaders = db.Employees.FromSqlInterpolated(
                $@"
                with employees_rec as (
                  select
                    emp_par.*
                  from
                    employees emp_par
                  where
                    emp_par.id = {supremeLeaderId}
                  union all
                  select
                    emp_chi.*
                  from
                    employees emp_chi,
	                employees_rec emp_rec
                  where
                    emp_rec.id = emp_chi.leaderId)
				select
				  emp.*
				from
				  (select
					emp_rec.leaderId id
				  from
					employees_rec emp_rec
				  where 
					emp_rec.id <> {supremeLeaderId} and
					emp_rec.leaderId <>{supremeLeaderId}
				  group by
				    emp_rec.leaderId) ldr,
                  employees emp
				where
				  emp.id = ldr.id")
                .ToList<Employee>();

            /*            if (leaders.Count != 0)
                        {
                            return Json(leaders);
                        }
                        else
                        {
                            return NotFound("No leaders found under supreme leader ID = " + supremeLeaderId);
                        }*/
            return Json(leaders);
        }

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
        [HttpPost("create")]
        public IActionResult CreateEmployee([FromBody] Employee employee)
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

        [Logged]
        [Authenticated]
        [HttpPut("update")]
        public IActionResult UpdateEmployee([FromBody] Employee employee)
        {
            if (employee != null)
            {
                Employee employeeExisting = db.Employees.Find(employee.Id);
                employeeExisting.Email = employee.Email;
                employeeExisting.Role = employee.Role;
                employeeExisting.Name = employee.Name;
                employeeExisting.LeaderId = employee.LeaderId;
                db.Employees.Update(employeeExisting);
                db.SaveChanges();
                return Json(Ok("Employee updated"));
            }
            else
            {
                return NotFound("UPDATE: Employee was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult DeleteEmployee(int id)
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