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
        private readonly string telpaLogo = "/Content/Images/telpa-logo.jpg";

        public ActionResult Index()
        {
            ViewBag.ImageData = telpaLogo;

            Employee emp = new Employee();
            emp.display_name = "Testas";
            emp.last_name = "Testauskas";
            emp.objective = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            db.employees.Add(emp);
            db.SaveChanges();
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
    }
}