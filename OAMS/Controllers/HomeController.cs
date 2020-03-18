using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OAMS.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }
        public ActionResult Index1()
        {
            ViewBag.Title = "Home Page";
            return View();
        }
        public ActionResult doimatkhauPopup()
        {
            return View();
        }
        public ActionResult hosocanhanPopup()
        {
            return View();
        }
        public ActionResult acessdenied()
        {
            return View();
        }

    }
}
