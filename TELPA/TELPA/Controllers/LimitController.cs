using System;
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

        [HttpGet]
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