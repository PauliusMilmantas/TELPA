using System;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/topic")]
    public class TopicController : Controller
    {
        private ApplicationDbContext db;

        public TopicController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Ok("TopicController online");
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getTopic(int id)
        {
            Topic topic = db.Topics.Find(id);

            if (topic != null)
            {
                return Json(topic);
            }
            else
            {
                return NotFound("GET: Topic with ID = " + id + " was not found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createTopic(Topic topic)
        {
            if (topic != null)
            {
                db.Topics.Add(topic);
                db.SaveChanges();
                return Ok("Topic created");
            }
            else
            {
                return NotFound("CREATE: Topic was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateTopic(Topic topic)
        {
            if (topic != null)
            {
                db.Topics.Update(topic);
                db.SaveChanges();
                return Ok("Topic updated");
            }
            else
            {
                return NotFound("UPDATE: Topic was not found");
            }
        }

        [HttpGet]
        [Route("delete/{id}")]
        public IActionResult deleteTopic(int id)
        {
            try
            {
                Topic topic = db.Topics.Find(id);
                db.Topics.Remove(topic);
                db.SaveChanges();
                return Ok("Topic deleted");
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: Topic with ID = " + id + " was not found.");
            }
        }
    }
}