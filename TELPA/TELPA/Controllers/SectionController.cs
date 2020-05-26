using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        [Route("get/futureLeadersForTopic/{topicId}")]
        public IActionResult getFutureLeadersForTopic(int topicId)
        {
            var result = db.LeadersForTopic.FromSqlInterpolated(
                $@"
                select
                  row_number()
                    over(
	                  order by
	                    lda.date) rowNo,
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
				  lda.date > getDate() and
                  ldt.topicId = {topicId}
                group by
                  ldr.name,
                  lda.date
                order by
                  lda.date")
                .ToList();

            if (result.Count != 0)
            {
                return Json(result);
            }
            else
            {
                return NotFound("No future schedules found for topic ID = " + topicId);
            }
        }

        [HttpGet]
        [Route("get/leadersForLearnedTopic/{topicId}")]
        public IActionResult getLeadersForLearnedTopic(int topicId)
        {
            var result = db.LeadersForLearnedTopic.FromSqlInterpolated(
                $@"
                select
                  row_number()
                    over(
	                  order by
	                    count(lto.employeeId) desc) rowNo,
                  ldr.name leaderName,
                  count(lto.employeeId) empCount
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
                  learnedTopics lto
                where
                  emp.id = lto.employeeId and
                  ldr.id = emp.LeaderId and
                  lto.topicId = {topicId}
                group by
                  ldr.name
				order by
				  3 desc")
                .ToList();

            if (result.Count != 0)
            {
                return Json(result);
            }
            else
            {
                return NotFound("No completed learnings found for topic ID = " + topicId);
            }
        }
    }
}