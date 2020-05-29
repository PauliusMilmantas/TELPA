using System;
using System.Linq;
using System.Threading;
using Castle.Core.Internal;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TELPA.Data;
using TELPA.Models;
using TELPA.Components;

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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
        [HttpPost("create")]
        public IActionResult createLimit([FromBody] Limit limit)
        {
            if (limit != null)
            {
                var result = db.CheckBool.FromSqlInterpolated(
                    $@"
                    select
                      1 checkBool
                    from
                      limits lim
                    where
                      lim.employeeId = {limit.EmployeeId} and
                      ({DateTime.Parse(limit.StartDate)} between convert(datetime, lim.startDate) and convert(datetime, lim.endDate) or
                      {DateTime.Parse(limit.EndDate)} between convert(datetime, lim.startDate) and convert(datetime, lim.endDate)) or
                      convert(datetime, lim.startDate) between {DateTime.Parse(limit.StartDate)} and {DateTime.Parse(limit.EndDate)} or
                      convert(datetime, lim.endDate) between {DateTime.Parse(limit.StartDate)} and {DateTime.Parse(limit.EndDate)}")
                    .ToList<CheckBool>();

                if (!result.IsNullOrEmpty())
                    return Json(BadRequest("Limit period overlaps with another!"));

                if (DateTime.Parse(limit.StartDate) > DateTime.Parse(limit.EndDate))
                    return Json(BadRequest("Incorrect limit period specified!"));

                db.Limits.Add(limit);
                db.SaveChanges();
                return Json(Ok("Limit created"));
            }
            else
            {
                return NotFound("CREATE: Limit was not found");
            }
        }

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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