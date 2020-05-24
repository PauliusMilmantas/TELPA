using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/learningDay")]
    public class LearningDayController : Controller
    {
        private ApplicationDbContext db;

        public LearningDayController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Ok("LearningDayController online");
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getLearningDay(int id)
        {
            LearningDay learningDay = db.LearningDays.Find(id);

            if (learningDay != null)
            {
                return Json(learningDay);
            }
            else
            {
                return NotFound("GET: LearningDay with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("get/all")]
        public IActionResult getLearningDays()
        {
            IList<LearningDay> learningDays = db.LearningDays.ToList<LearningDay>();

            if (learningDays.Count != 0)
            {
                return Json(learningDays);
            }
            else
            {
                return NotFound("No learning days found.");
            }
        }

        [HttpPost("create")]
        public IActionResult createLearningDay(LearningDay learningDay)
        {
            if (learningDay != null)
            {
                db.LearningDays.Add(learningDay);
                db.SaveChanges();
                return Ok("LearningDay created");
            }
            else
            {
                return NotFound("CREATE: LearningDay was not found");
            }
        }

        [HttpGet]
        [Route("createWithGET/{date}/{comment}/{employeeId}/{version}/{topicId}")]
        public string createWithGet(string date, string comment, string employeeId, string version, string topicId) {
            //Adding to LearningDays
            LearningDay learningDay = new LearningDay();
            learningDay.Date = DateTime.Parse(date);
            learningDay.Comment = comment;
            learningDay.EmployeeId = Int32.Parse(employeeId);
            learningDay.Version = Int32.Parse(version);

            db.LearningDays.Add(learningDay);
            db.SaveChanges();

            //Adding to LearningDayTopics
            LearningDayTopic learningDayTopic = new LearningDayTopic();
            learningDayTopic.LearningDayId = learningDay.Id;
            learningDayTopic.TopicId = Int32.Parse(topicId);
            learningDayTopic.Version = Int32.Parse(version);

            db.LearningDayTopics.Add(learningDayTopic);
            db.SaveChanges();

            return "Ok";
        }

        [HttpPut("update")]
        public IActionResult updateLearningDay(LearningDay learningDay)
        {
            if (learningDay != null)
            {
                db.LearningDays.Update(learningDay);
                db.SaveChanges();
                return Ok("LearningDay updated");
            }
            else
            {
                return NotFound("UPDATE: LearningDay was not found");
            }
        }

        [HttpGet]
        [Route("delete/{id}")]
        public IActionResult deleteLearningDay(int id)
        {
            try
            {
                LearningDay learningDay = db.LearningDays.Find(id);
                db.LearningDays.Remove(learningDay);
                db.SaveChanges();
                return Ok("LearningDay deleted");
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: LearningDay with ID = " + id + " was not found.");
            }
        }
    }
}