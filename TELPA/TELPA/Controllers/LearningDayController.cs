using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TELPA.Components;
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
        public IActionResult Ping()
        {
            return Json(Ok("LearningDayController online"));
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}")]
        public IActionResult GetLearningDay(int id)
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

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}/learningDayTopics")]
        public IActionResult GetLearningDayLearningDayTopics(int id)
        {
            LearningDay learningDay = db.LearningDays.Find(id);

            if (learningDay != null)
            {
                return Json(learningDay.LearningDayTopics);
            }
            else
            {
                return NotFound("GET: LearningDay with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/{id}/learningDayLinks")]
        public IActionResult GetLearningDayLearningDayLinks(int id)
        {
            LearningDay learningDay = db.LearningDays.Find(id);

            if (learningDay != null)
            {
                return Json(learningDay.LearningDayLinks);
            }
            else
            {
                return NotFound("GET: LearningDay with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/all")]
        public IActionResult GetLearningDays()
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

        [Logged]
        [Authenticated]
        [HttpPost("create")]
        public IActionResult CreateLearningDay([FromBody] LearningDay learningDay)
        {
            Employee employee = db.Employees.Find(learningDay.EmployeeId);

            IList<LearningDay> learningDayExisting = db.LearningDays.FromSqlInterpolated(
                $@"
                select
                  lda.*
				from
				  learningDays lda
				where
				  lda.date = {learningDay.Date} and
				  lda.employeeId = {employee.Id}")
                .ToList<LearningDay>();

            if (!learningDayExisting.IsNullOrEmpty())
                return Json(BadRequest("Learning day already exists!"));

            if (!employee.Limits.IsNullOrEmpty())  // jei darbuotojas turi kazkokiu nustatytu apribojimu
            {
                var result = db.CheckBool.FromSqlInterpolated(
                    $@"
                    select
                      1 checkBool
                    from
                      limits lim
                    where
                      lim.employeeId = {employee.Id} and
                      {learningDay.Date} between convert(datetime, lim.startDate) and convert(datetime, lim.endDate)")
                    .ToList<CheckBool>();

                if (result.IsNullOrEmpty()) 
                    return Json(BadRequest("Learning day is not in allowed learning period of the employee!"));

                if (!employee.LearningDays.IsNullOrEmpty())
                {
                    result = db.CheckBool.FromSqlInterpolated(
                        $@"
                        select
				          sum(che.checkBool) checkBool
				        from
					      (select
                            case
					          when count(lda.id) < lim.maxTotalLearningDays then
						        0
						      else
						        1
					        end checkBool
                          from
                            limits lim,
					        learningDays lda
                          where
                            lim.employeeId = {employee.Id} and
                            {learningDay.Date} between convert(datetime, lim.startDate) and convert(datetime, lim.endDate) and
					        lda.employeeId = lim.employeeId and
					        lda.date between convert(datetime, lim.startDate) and convert(datetime, lim.endDate)
					      group by
					        lim.id,
					        lim.maxTotalLearningDays) che")
                        .ToList<CheckBool>();

                    if (result.First().checkBool != 0) 
                        return Json(BadRequest("Max learning days reached!"));

                    result = db.CheckBool.FromSqlInterpolated(
                        $@"
                        with groups(date, grp, maxDays) as (
                          select
                            lda.date,
                            dateadd(
	                          day,
	                          -dense_rank()
	                            over(
		                          order by
		                            lda.date), 
                              lda.date) grp,
	                          lim.maxConsecutiveLearningDays maxDays
                          from
                            learningDays lda,
	                        limits lim
                          where
   	                        lim.employeeId = {employee.Id}  and
	                        {learningDay.Date} between convert(datetime, lim.startDate) and convert(datetime, lim.endDate) and
	                        lda.employeeId = lim.employeeId and
	                        lda.date between convert(datetime, lim.startDate) and convert(datetime, lim.endDate)
                          group by
                            lda.date,
	                        lim.id,
	                        lim.maxConsecutiveLearningDays)
                        select
                          case
                            when count(date) = maxDays and
	                          (convert(datetime, min(date)) - 1 = {learningDay.Date} or
	                          convert(datetime, max(date)) + 1 = {learningDay.Date}) then
	                          0
	                        else 
	                          1
                          end checkBool
                        from
                          groups
                        group by
                          grp,
                          maxDays")
                        .ToList<CheckBool>();

                    if (result.First().checkBool == 0)
                        return Json(BadRequest("Max consecutive learning days reached!"));
                }
            }

            if (learningDay != null)
            {
                db.LearningDays.Add(learningDay);
                db.SaveChanges();
                return Json(Ok("LearningDay created"));
            }
            else
            {
                return NotFound("CREATE: LearningDay was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("createWithGET/{date}/{comment}/{employeeId}/{version}/{topicId}")]
        public IActionResult CreateWithGet(string date, string comment, string employeeId, string version, string topicId) {
            //Adding to LearningDays
            LearningDay learningDay = new LearningDay();
            learningDay.Date = DateTime.Parse(date.Replace('-', '.'));
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

            return Json(Ok("Added"));
        }

        [Logged]
        [Authenticated]
        [HttpPut("update")]
        public IActionResult UpdateLearningDay([FromBody] LearningDay learningDay)
        {
            if (learningDay != null)
            {
                db.LearningDays.Update(learningDay);
                db.SaveChanges();
                return Json(Ok("LearningDay updated"));
            }
            else
            {
                return NotFound("UPDATE: LearningDay was not found");
            }
        }

        [Logged]
        [Authenticated]
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult DeleteLearningDay(int id)
        {
            try
            {
                LearningDay learningDay = db.LearningDays.Find(id);
                db.LearningDays.Remove(learningDay);
                db.SaveChanges();
                return Json(Ok("LearningDay deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: LearningDay with ID = " + id + " was not found.");
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/learningDaysAndTopicsForEmployee/{employeeId}")]
        public IActionResult getLearningDaysAndTopicsForEmployee(int employeeId)
        {
            var result = db.LearningDaysAndTopicsForEmployee.FromSqlInterpolated(
                $@"
                select
                  lda.employeeId,
                  lda.id learningDayId,
                  convert(varchar, lda.date, 23) learningDayDate,
                  lda.comment learningDayComment,
                  lda.version learningDayVersion,
                  ldt.id learningDayTopicId,
                  ldt.version learningDayTopicVersion,
                  tpc.id topicId,
                  tpc.name topicName,
                  tpc.description topicDescription,
                  isNull(tpc.ParentTopicId, 0) topicParentTopicId,
                  tpc.version topicVersion
                from
                  learningDays lda,
                  learningDayTopics ldt,
                  topics tpc
                where
                  lda.employeeId = {employeeId} and
                  lda.id = ldt.learningDayId and
                  tpc.id = ldt.topicId")
                .ToList<LearningDaysAndTopicsForEmployee>();

            if (result.Count != 0)
            {
                return Json(result);
            }
            else
            {
                return NotFound("No learning days found for employee ID = " + employeeId);
            }
        }
    }
}