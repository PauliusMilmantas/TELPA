using System;
using System.Collections.Generic;
using System.Linq;
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
        [Route("get/all")]
        public IActionResult getAll()
        {
            IList<Topic> topics = db.Topics.ToList<Topic>();

            if (topics.Count != 0)
            {
                return Json(topics);
            }
            else
            {
                return NotFound("No topics found.");
            }
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

        [HttpGet]
        [Route("get/last")]
        public IActionResult getLastTopicId()
        {
            IList<Topic> topics = db.Topics.ToList<Topic>();

            if (topics.Count != 0)
            {
                return Json(topics[topics.Count - 1].Id);
            }
            else
            {
                return NotFound("No topics found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createTopic([FromBody] Topic topic)
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
        public IActionResult updateTopic([FromBody] Topic topic)
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