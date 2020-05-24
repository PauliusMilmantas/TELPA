using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/learnedTopic")]
    public class LearnedTopicController : Controller
    {
        private ApplicationDbContext db;

        public LearnedTopicController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Ok("LearnedTopicController online");
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getLearnedTopic(int id)
        {
            LearnedTopic learnedTopic = db.LearnedTopics.Find(id);

            if (learnedTopic != null)
            {
                return Json(learnedTopic);
            }
            else
            {
                return NotFound("GET: LearnedTopic with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("get/all")]
        public IActionResult getLearnedTopics()
        {
            IList<LearnedTopic> learnedTopics = db.LearnedTopics.ToList<LearnedTopic>();

            if (learnedTopics.Count != 0)
            {
                return Json(learnedTopics);
            }
            else
            {
                return NotFound("No learned topics found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createLearnedTopic([FromBody] LearnedTopic learnedTopic)
        {
            if (learnedTopic != null)
            {
                db.LearnedTopics.Add(learnedTopic);
                db.SaveChanges();
                return Ok("LearnedTopic created");
            }
            else
            {
                return NotFound("CREATE: LearnedTopic was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateLearnedTopic([FromBody] LearnedTopic learnedTopic)
        {
            if (learnedTopic != null)
            {
                db.LearnedTopics.Update(learnedTopic);
                db.SaveChanges();
                return Ok("LearnedTopic updated");
            }
            else
            {
                return NotFound("UPDATE: LearnedTopic was not found");
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult deleteLearnedTopic(int id)
        {
            try
            {
                LearnedTopic learnedTopic = db.LearnedTopics.Find(id);
                db.LearnedTopics.Remove(learnedTopic);
                db.SaveChanges();
                return Ok("LearnedTopic deleted");
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: LearnedTopic with ID = " + id + " was not found.");
            }
        }
    }
}