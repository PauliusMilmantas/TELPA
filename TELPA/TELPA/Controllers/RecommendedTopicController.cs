﻿using System;
using Microsoft.AspNetCore.Mvc;
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
            return Ok("RecommendedTopicController online");
        }

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

        [HttpPost("create")]
        public IActionResult createRecommendedTopic(RecommendedTopic recommendedTopic)
        {
            if (recommendedTopic != null)
            {
                db.RecommendedTopics.Add(recommendedTopic);
                db.SaveChanges();
                return Ok("RecommendedTopic created");
            }
            else
            {
                return NotFound("CREATE: RecommendedTopic was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateRecommendedTopic(RecommendedTopic recommendedTopic)
        {
            if (recommendedTopic != null)
            {
                db.RecommendedTopics.Update(recommendedTopic);
                db.SaveChanges();
                return Ok("RecommendedTopic updated");
            }
            else
            {
                return NotFound("UPDATE: RecommendedTopic was not found");
            }
        }

        [HttpGet]
        [Route("delete/{id}")]
        public IActionResult deleteRecommendedTopic(int id)
        {
            try
            {
                RecommendedTopic recommendedTopic = db.RecommendedTopics.Find(id);
                db.RecommendedTopics.Remove(recommendedTopic);
                db.SaveChanges();
                return Ok("RecommendedTopic deleted");
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: RecommendedTopic with ID = " + id + " was not found.");
            }
        }
    }
}