using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TELPA.Controllers
{
    public class CalenderController : Controller
    {
        // GET: Calender
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
    }
}