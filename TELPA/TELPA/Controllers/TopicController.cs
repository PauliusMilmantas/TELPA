﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Components;
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

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/all")]
        public IActionResult GetAll()
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
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