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
        public IActionResult Ping()
        {
            return Json(Ok("TopicController online"));
        }

        [HttpGet]
        [Route("get/all")]
        public IActionResult GetAll()
        {
            IList<Topic> learningDays = db.Topics.ToList<Topic>();

            if (learningDays.Count != 0)
            {
                return Json(learningDays);
            }
            else
            {
                return NotFound("No topics found.");
            }
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult GetTopic(int id)
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
        [Route("get/{id}/subtopics")]
        public IActionResult GetTopicSubtopics(int id)
        {
            Topic topic = db.Topics.Find(id);

            if (topic != null)
            {
                return Json(topic.Subtopics);
            }
            else
            {
                return NotFound("GET: Topic with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("get/{id}/topicLinks")]
        public IActionResult GetTopicTopicLinks(int id)
        {
            Topic topic = db.Topics.Find(id);

            if (topic != null)
            {
                return Json(topic.TopicLinks);
            }
            else
            {
                return NotFound("GET: Topic with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("get/{id}/learnedTopics")]
        public IActionResult GetTopicLearnedTopics(int id)
        {
            Topic topic = db.Topics.Find(id);

            if (topic != null)
            {
                return Json(topic.LearnedTopics);
            }
            else
            {
                return NotFound("GET: Topic with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("get/{id}/recommendedTopics")]
        public IActionResult GetTopicRecommendedTopics(int id)
        {
            Topic topic = db.Topics.Find(id);

            if (topic != null)
            {
                return Json(topic.RecommendedTopics);
            }
            else
            {
                return NotFound("GET: Topic with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("get/{id}/learningDayTopics")]
        public IActionResult GetTopicLearningDayTopics(int id)
        {
            Topic topic = db.Topics.Find(id);

            if (topic != null)
            {
                return Json(topic.LearningDayTopics);
            }
            else
            {
                return NotFound("GET: Topic with ID = " + id + " was not found.");
            }
        }

        [HttpPost("create")]
        public IActionResult CreateTopic([FromBody] Topic topic)
        {
            if (topic != null)
            {
                db.Topics.Add(topic);
                db.SaveChanges();
                return Json(Ok("Topic created"));
            }
            else
            {
                return NotFound("CREATE: Topic was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult UpdateTopic([FromBody] Topic topic)
        {
            if (topic != null)
            {
                db.Topics.Update(topic);
                db.SaveChanges();
                return Json(Ok("Topic updated"));
            }
            else
            {
                return NotFound("UPDATE: Topic was not found");
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult DeleteTopic(int id)
        {
            try
            {
                Topic topic = db.Topics.Find(id);
                db.Topics.Remove(topic);
                db.SaveChanges();
                return Json(Ok("Topic deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: Topic with ID = " + id + " was not found.");
            }
        }
    }
}