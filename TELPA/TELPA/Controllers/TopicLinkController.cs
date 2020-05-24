using System;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/topicLink")]
    public class TopicLinkController : Controller
    {
        private ApplicationDbContext db;

        public TopicLinkController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Ok("TopicLinkController online");
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getTopicLink(int id)
        {
            TopicLink topicLink = db.TopicLinks.Find(id);

            if (topicLink != null)
            {
                return Json(topicLink);
            }
            else
            {
                return NotFound("GET: TopicLink with ID = " + id + " was not found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createTopicLink([FromBody] TopicLink topicLink)
        {
            if (topicLink != null)
            {
                db.TopicLinks.Add(topicLink);
                db.SaveChanges();
                return Ok("TopicLink created");
            }
            else
            {
                return NotFound("CREATE: TopicLink was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateTopicLink([FromBody] TopicLink topicLink)
        {
            if (topicLink != null)
            {
                db.TopicLinks.Update(topicLink);
                db.SaveChanges();
                return Ok("TopicLink updated");
            }
            else
            {
                return NotFound("UPDATE: TopicLink was not found");
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult deleteTopicLink(int id)
        {
            try
            {
                TopicLink topicLink = db.TopicLinks.Find(id);
                db.TopicLinks.Remove(topicLink);
                db.SaveChanges();
                return Ok("TopicLink deleted");
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: TopicLink with ID = " + id + " was not found.");
            }
        }
    }
}