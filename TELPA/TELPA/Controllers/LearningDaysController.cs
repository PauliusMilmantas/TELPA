using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;

namespace TELPA.Controllers
{
    public class LearningDaysController : System.Web.Http.ApiController
    {
        private readonly ApplicationDbContext db;

        public LearningDaysController(ApplicationDbContext db)
        {
            this.db = db;
        }

        // GET: /<controller>/
        [System.Web.Http.HttpGet]
        public String Index()
        {
            return "test";
        }
    }
}
