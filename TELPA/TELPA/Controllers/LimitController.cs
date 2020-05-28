﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/limit")]
    public class LimitController : Controller
    {
        private ApplicationDbContext db;

        public LimitController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Json(Ok("LimitController online"));
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getLimit(int id)
        {
            Limit limit = db.Limits.Find(id);

            if (limit != null)
            {
                return Json(limit);
            }
            else
            {
                return NotFound("GET: Limit with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("getByEmployee/{employeeId}")]
        public IActionResult getByEmployeeLimit(int employeeId)
        {
            IList<Limit> allLimits = db.Limits.ToList<Limit>();
            IList<Limit> employeeLimits = new List<Limit>();
            foreach (Limit lim in allLimits)
            {
                if (lim.EmployeeId == employeeId)
                {
                    employeeLimits.Add(lim);
                }
            }

            if (employeeLimits.Count != 0)
            {
                return Json(employeeLimits);
            }
            else
            {
                return NotFound("GET: No limits associated to employee ID = " + employeeId + " was found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createLimit([FromBody] Limit limit)
        {
            if (limit != null)
            {
                db.Limits.Add(limit);
                db.SaveChanges();
                return Json(Ok("Limit created"));
            }
            else
            {
                return NotFound("CREATE: Limit was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateLimit([FromBody] Limit limit)
        {
            if (limit != null)
            {
                db.Limits.Update(limit);
                db.SaveChanges();
                return Json(Ok("Limit updated"));
            }
            else
            {
                return NotFound("UPDATE: Limit was not found");
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult deleteLimit(int id)
        {
            try
            {
                Limit limit = db.Limits.Find(id);
                db.Limits.Remove(limit);
                db.SaveChanges();
                return Json(Ok("Limit deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: Limit with ID = " + id + " was not found.");
            }
        }
    }
}