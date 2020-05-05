using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;

namespace TELPA.Controllers
{
    public class CalendarController : ApiController
    {
        [System.Web.Http.HttpGet]
        public String ViewDays()
        {
            return "Hello world";
        }

        [System.Web.Http.HttpGet]
        public String ViewLearningDayTopic() {
            return "123";
        }
    }
}