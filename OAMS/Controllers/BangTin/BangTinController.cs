using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OAMS.Controllers.BangTin
{
    public class BangTinController : Controller
    {
        // GET: BangTin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult QuanLy()
        {
            return View();
        }

        public ActionResult SoanBaiViet()
        {
            return View();
        }

        public ActionResult TrangChu()
        {
            return View();
        }

        public ActionResult ChiTietBaiViet(int MaTinTuc)
        {
            ViewBag.MaTinTuc = MaTinTuc;
            return View();
        }

        public ActionResult SuaBaiViet(int MaTinTuc)
        {
            ViewBag.MaTinTuc = MaTinTuc;
            return View();
        }
    }
}