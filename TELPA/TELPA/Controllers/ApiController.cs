using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    public class ApiController : System.Web.Http.ApiController
    {
        private readonly ApplicationDbContext db;

        public ApiController(ApplicationDbContext db) {
            this.db = db;
        }

        //===========================//
        //=======Calendar part
        //===========================//

        [System.Web.Http.HttpGet]
        public IHttpActionResult ViewDays()
        {
            IList<LearningDay> days = null;

            days = db.LearningDays.ToList<LearningDay>();

            if (days.Count == 0)
            {
                return NotFound();
            }

            return Ok(days);
        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult ViewLearnedTopics()
        {
            IList<LearnedTopic> topics = null;

            topics = db.LearnedTopics.ToList<LearnedTopic>();

            if (topics.Count == 0)
            {
                return NotFound();
            }

            return Ok(topics);
        }

        //===========================//
        //=======Employee part
        //===========================//

        [System.Web.Http.HttpGet]
        public IHttpActionResult ViewEmployees() {
            IList<Employee> emploees = null;

            emploees = db.Employees.ToList<Employee>();

            if (emploees.Count == 0) {
                return NotFound();
            }

            return Ok(emploees);
        }
    }
}