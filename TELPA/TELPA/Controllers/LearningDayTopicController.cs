﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Components;
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
            return Json(Ok("LearningDayTopicController online"));
        }

        [Logged]
        [Authenticated]
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

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/all")]
        public IActionResult getAllDays() {
            IList<LearningDayTopic> learningDays = db.LearningDayTopics.ToList<LearningDayTopic>();

            if (learningDays.Count != 0)
            {
                return Json(learningDays);
            }
            else
            {
                return NotFound("No learning day topics found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpPost("create")]
        public IActionResult createLearningDayTopic([FromBody] LearningDayTopic learningDayTopic)
        {
            if (learningDayTopic != null)
            {
                db.LearningDayTopics.Add(learningDayTopic);
                db.SaveChanges();
                return Json(Ok("LearningDayTopic created"));
            }
            else
            {
                return NotFound("CREATE: LearningDayTopic was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpPut("update")]
        public IActionResult updateLearningDayTopic([FromBody] LearningDayTopic learningDayTopic)
        {
            if (learningDayTopic != null)
            {
                db.LearningDayTopics.Update(learningDayTopic);
                db.SaveChanges();
                return Json(Ok("LearningDayTopic updated"));
            }
            else
            {
                return NotFound("UPDATE: LearningDayTopic was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult deleteLearningDayTopic(int id)
        {
            try
            {
                LearningDayTopic learningDayTopic = db.LearningDayTopics.Find(id);
                db.LearningDayTopics.Remove(learningDayTopic);
                db.SaveChanges();
                return Json(Ok("LearningDayTopic deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: LearningDayTopic with ID = " + id + " was not found.");
            }
        }
    }
}