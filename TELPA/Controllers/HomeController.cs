using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TELPA.Models;

namespace TELPA.Controllers
{
    public class HomeController : Controller
    {
        ModelContext db = new ModelContext();
        public ActionResult Index()
        {
            User user = new User();
            user.name = "Jonas";
            user.last_name = "Jonskis";

            db.Users.Add(user);
            db.SaveChanges();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}