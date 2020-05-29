using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Components;
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
            return Json(Ok("TopicLinkController online"));
        }

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("getByTopic/{topicId}")]
        public IActionResult getByTopicLink(int topicId)
        {

            IList<TopicLink> allTopicLinks = db.TopicLinks.ToList<TopicLink>();
            IList<TopicLink> topicLinks = new List<TopicLink>();
            foreach(TopicLink link in allTopicLinks)
            {
                if(link.TopicId == topicId)
                {
                    topicLinks.Add(link);
                }
            }

            if (topicLinks.Count != 0)
            {
                return Json(topicLinks);
            }
            else
            {
                return NotFound("GET: No links associated to topic ID = " + topicId + " was found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpPost("create")]
        public IActionResult createTopicLink([FromBody] TopicLink topicLink)
        {
            if (topicLink != null)
            {
                db.TopicLinks.Add(topicLink);
                db.SaveChanges();
                return Json(Ok("TopicLink created"));
            }
            else
            {
                return NotFound("CREATE: TopicLink was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpPut("update")]
        public IActionResult updateTopicLink([FromBody] TopicLink topicLink)
        {
            if (topicLink != null)
            {
                db.TopicLinks.Update(topicLink);
                db.SaveChanges();
                return Json(Ok("TopicLink updated"));
            }
            else
            {
                return NotFound("UPDATE: TopicLink was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult deleteTopicLink(int id)
        {
            try
            {
                TopicLink topicLink = db.TopicLinks.Find(id);
                db.TopicLinks.Remove(topicLink);
                db.SaveChanges();
                return Json(Ok("TopicLink deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: TopicLink with ID = " + id + " was not found.");
            }
        }
    }
}