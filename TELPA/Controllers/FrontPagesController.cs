using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TELPA.Controllers
{
    public class FrontPagesController : Controller
    {
        // GET: FrontPages
        public ActionResult Index()
        {
            return View();
        }
    }
}