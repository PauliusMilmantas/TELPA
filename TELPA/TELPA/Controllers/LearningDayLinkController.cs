using System;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/learningDayLink")]
    public class LearningDayLinkController : Controller
    {
        private ApplicationDbContext db;

        public LearningDayLinkController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Json(Ok("LearningDayLinkController online"));
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getLearningDayLink(int id)
        {
            LearningDayLink learningDayLink = db.LearningDayLinks.Find(id);

            if (learningDayLink != null)
            {
                return Json(learningDayLink);
            }
            else
            {
                return NotFound("GET: LearningDayLink with ID = " + id + " was not found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createLearningDayLink([FromBody] LearningDayLink learningDayLink)
        {
            if (learningDayLink != null)
            {
                db.LearningDayLinks.Add(learningDayLink);
                db.SaveChanges();
                return Json(Ok("LearningDayLink created"));
            }
            else
            {
                return NotFound("CREATE: LearningDayLink was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateLearningDayLink([FromBody] LearningDayLink learningDayLink)
        {
            if (learningDayLink != null)
            {
                db.LearningDayLinks.Update(learningDayLink);
                db.SaveChanges();
                return Json(Ok("LearningDayLink updated"));
            }
            else
            {
                return NotFound("UPDATE: LearningDayLink was not found");
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult deleteLearningDayLink(int id)
        {
            try
            {
                LearningDayLink learningDayLink = db.LearningDayLinks.Find(id);
                db.LearningDayLinks.Remove(learningDayLink);
                db.SaveChanges();
                return Json(Ok("LearningDayLink deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: LearningDayLink with ID = " + id + " was not found.");
            }
        }
    }
}