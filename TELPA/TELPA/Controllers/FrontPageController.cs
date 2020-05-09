using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TELPA.Controllers
{
    public class FrontPageController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}