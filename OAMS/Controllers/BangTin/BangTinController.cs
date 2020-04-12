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

        public ActionResult TestTinTuc()
        {
            return View();
        }

        public ActionResult DanhMucTin(int MaLoaiTin)
        {
            ViewBag.Header = "";
            if (MaLoaiTin == 2)
            {
                ViewBag.Header = "Nơi Tổng Hợp Thông Báo Của Công Ty";
            }
            else if (MaLoaiTin == 4)
            {
                ViewBag.Header = "Nơi Tổng Hợp Tin Tức Sự Kiện Của Công Ty";
            }
            else if (MaLoaiTin == 1)
            {
                ViewBag.Header = "Nơi Tổng Hợp Tin Tức Sawaco";
            }
            else if (MaLoaiTin == 3)
            {
                ViewBag.Header = "Nơi Chứa Tin Tức Bình Luận Về Các Bài Viết Của Tường Công Ty";
            }
            ViewBag.MaLoaiTin = MaLoaiTin;
            return View();
        }

        public ActionResult ChiTietTin(int MaTinTuc)
        {
            ViewBag.MaTinTuc = MaTinTuc;
            return View();
        }

        public ActionResult TestTinTucHai()
        {
            return View();
        }
    }
}