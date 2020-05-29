using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Components;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/recommendedTopic")]
    public class RecommendedTopicController : Controller
    {
        private ApplicationDbContext db;

        public RecommendedTopicController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Json(Ok("RecommendedTopicController online"));
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getRecommendedTopic(int id)
        {
            RecommendedTopic recommendedTopic = db.RecommendedTopics.Find(id);

            if (recommendedTopic != null)
            {
                return Json(recommendedTopic);
            }
            else
            {
                return NotFound("GET: RecommendedTopic with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("getByEmployee/{employeeId}")]
        public IActionResult getRecommendedTopicByEmployee(int employeeId)
        {
            IList<RecommendedTopic> allRecommendedTopics = db.RecommendedTopics.ToList<RecommendedTopic>();
            IList<RecommendedTopic> recommendedTopics = new List<RecommendedTopic>();
            foreach (RecommendedTopic topic in allRecommendedTopics)
            {
                if (topic.EmployeeId == employeeId)
                {
                    recommendedTopics.Add(topic);
                }
            }

            if (recommendedTopics.Count != 0)
            {
                return Json(recommendedTopics);
            }
            else
            {
                return NotFound("GET: No topics associated to employee ID = " + employeeId + " not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpPost("create")]
        public IActionResult createRecommendedTopic([FromBody] RecommendedTopic recommendedTopic)
        {
            if (recommendedTopic != null)
            {
                db.RecommendedTopics.Add(recommendedTopic);
                db.SaveChanges();
                return Json(Ok("RecommendedTopic created"));
            }
            else
            {
                return NotFound("CREATE: RecommendedTopic was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpPut("update")]
        public IActionResult updateRecommendedTopic([FromBody] RecommendedTopic recommendedTopic)
        {
            if (recommendedTopic != null)
            {
                db.RecommendedTopics.Update(recommendedTopic);
                db.SaveChanges();
                return Json(Ok("RecommendedTopic updated"));
            }
            else
            {
                return NotFound("UPDATE: RecommendedTopic was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult deleteRecommendedTopic(int id)
        {
            try
            {
                RecommendedTopic recommendedTopic = db.RecommendedTopics.Find(id);
                db.RecommendedTopics.Remove(recommendedTopic);
                db.SaveChanges();
                return Json(Ok("RecommendedTopic deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: RecommendedTopic with ID = " + id + " was not found.");
            }
        }
    }
}