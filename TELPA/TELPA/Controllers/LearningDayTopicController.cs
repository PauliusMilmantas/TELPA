using System;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/learningDayTopic")]
    public class LearningDayTopicController : Controller
    {
        private ApplicationDbContext db;

        public LearningDayTopicController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Ok("LearningDayTopicController online");
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getLearningDayTopic(int id)
        {
            LearningDayTopic learningDayTopic = db.LearningDayTopics.Find(id);

            if (learningDayTopic != null)
            {
                return Json(learningDayTopic);
            }
            else
            {
                return NotFound("GET: LearningDayTopic with ID = " + id + " was not found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createLearningDayTopic(LearningDayTopic learningDayTopic)
        {
            if (learningDayTopic != null)
            {
                db.LearningDayTopics.Add(learningDayTopic);
                db.SaveChanges();
                return Ok("LearningDayTopic created");
            }
            else
            {
                return NotFound("CREATE: LearningDayTopic was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateLearningDayTopic(LearningDayTopic learningDayTopic)
        {
            if (learningDayTopic != null)
            {
                db.LearningDayTopics.Update(learningDayTopic);
                db.SaveChanges();
                return Ok("LearningDayTopic updated");
            }
            else
            {
                return NotFound("UPDATE: LearningDayTopic was not found");
            }
        }

        [HttpGet]
        [Route("delete/{id}")]
        public IActionResult deleteLearningDayTopic(int id)
        {
            try
            {
                LearningDayTopic learningDayTopic = db.LearningDayTopics.Find(id);
                db.LearningDayTopics.Remove(learningDayTopic);
                db.SaveChanges();
                return Ok("LearningDayTopic deleted");
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: LearningDayTopic with ID = " + id + " was not found.");
            }
        }
    }
}