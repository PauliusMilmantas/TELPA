﻿using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TELPA.Components;
using TELPA.Data;

namespace TELPA.Controllers
{
    [Route("api/section")]
    public class SectionController : Controller
    {
        private ApplicationDbContext db;

        public SectionController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Json(Ok("SectionController online"));
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/employeesForTopic/{topicId}")]
        public IActionResult getEmployeesForTopic(int topicId)
        {
            var result = db.EmployeesForTopic.FromSqlInterpolated(
                $@"
                select
                  row_number()
                    over(
                      order by
                        lda.date desc) rowNo,
                  emp.name,
                  ldr.name leaderName,
                  convert(varchar, lda.date, 23) date
                from
                  employees emp,
                  employees ldr,
                  learningDays lda,
                  learningDayTopics ldt
                where
                  ldr.id = emp.leaderId and
                  emp.id = lda.EmployeeId and
                  lda.id = ldt.LearningDayId and
				  lda.date <= getDate() and
                  ldt.topicId = {topicId}
                order by
                  lda.date desc")
                .ToList();

            if (result.Count != 0)
            {
                return Json(result);
            }
            else
            {
                return NotFound("No employees found for topic ID = " + topicId );
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/leadersForTopic/{topicId}")]
        public IActionResult getLeadersForTopic(int topicId)
        {
            var result = db.LeadersForTopic.FromSqlInterpolated(
                $@"
                select
                  row_number()
                    over(
	                  order by
	                    lda.date desc) rowNo,
                  ldr.name leaderName,
                  count(lda.employeeId) empCount,
                  convert(varchar, lda.date, 23) date
                from
                  employees emp,
                  (select
	                emp.*
                  from
	                (select
	                  emp_ldr_in.leaderId id
	                from
	                  employees emp_ldr_in
	                where
	                  emp_ldr_in.leaderId is not null
	                group by
	                  emp_ldr_in.leaderId) emp_ldr,
		                employees emp
	                where
		                emp.id = emp_ldr.id) ldr,
                  learningDays lda,
                  learningDayTopics ldt
                where
                  emp.id = lda.employeeId and
                  ldr.id = emp.LeaderId and
                  lda.id = ldt.LearningDayId and
                  lda.date <= getDate() and
                  ldt.topicId = {topicId}
                group by
                  ldr.name,
                  lda.date
                order by
                  lda.date desc")
                .ToList();

            if (result.Count != 0)
            {
                return Json(result);
            }
            else
            {
                return NotFound("No leaders found for topic ID = " + topicId);
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/learnedTopicsForLeader/{leaderId}")]
        public IActionResult getLearnedTopicsForLeader(int leaderId)
        {
            var result = db.LearnedTopicsForLeader.FromSqlInterpolated(
                $@"
                select
                  row_number()
                    over(
                      order by
                        emp.name) rowNo,
                  ldr.name leaderName,
                  emp.name employeeName,
                  tpc.name topicName
                from
                  employees ldr,
                  employees emp,
                  learnedTopics lto,
                  topics tpc
                where
                  ldr.id = {leaderId} and
                  emp.leaderId = ldr.id and
                  lto.employeeId = emp.id and
                  tpc.id = lto.topicId
				order by
				  emp.name")
                .ToList();

            if (result.Count != 0)
            {
                return Json(result);
            }
            else
            {
                return NotFound("No completed learnings found for leader ID = " + leaderId);
            }
        }

        [Logged]
        [Authenticated]
        [HttpGet]
        [Route("get/futureLearningDaysForLeader/{leaderId}")]
        public IActionResult getFutureLearningDaysForLeader(int leaderId)
        {
            var result = db.FutureLearningDaysForLeader.FromSqlInterpolated(
                $@"
                select
                  row_number()
                    over(
                      order by
                        lda.date,
                        tpc.name,
                        emp.name) rowNo,
                  ldr.name leaderName,
                  emp.name employeeName,
                  tpc.name topicName,
                  convert(varchar, lda.date, 23) date
                from
                  employees ldr,
                  employees emp,
                  learningDays lda,
                  learningDayTopics ldt,
                  topics tpc
                where
                  ldr.id = {leaderId} and
                  emp.leaderId = ldr.id and
                  lda.employeeId = emp.id and
                  ldt.learningDayId = lda.id and
                  ldt.topicId = tpc.id and
                  lda.date > GetDate()
                order by
                  lda.date,
                  tpc.name,
                  emp.name")
                .ToList();

            if (result.Count != 0)
            {
                return Json(result);
            }
            else
            {
                return NotFound("No future schedules found for leader ID = " + leaderId);
            }
        }
    }
}