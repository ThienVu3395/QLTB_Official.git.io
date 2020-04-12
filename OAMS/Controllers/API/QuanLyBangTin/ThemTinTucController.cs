using OAMS.Database;
using OAMS.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OAMS.Controllers.API.QuanLyBangTin
{
    public class ThemTinTucController : ApiController
    {
        dbOAMSEntities dbContext = new dbOAMSEntities();
        [HttpPost]
        [Route("UploadImage")]
        public string UploadImage()

        {

            int iUploadedCnt = 0;

            string sPath = "";

            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/image/TinTuc");

            string date = DateTime.Now.Year.ToString();

            sPath = Path.Combine(sPath, date);

            if (!Directory.Exists(sPath))

            {

                Directory.CreateDirectory(sPath);

            }

            date = DateTime.Now.Month.ToString();

            sPath = Path.Combine(sPath, date);

            if (!Directory.Exists(sPath))

            {

                Directory.CreateDirectory(sPath);

            }

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)

            {

                System.Web.HttpPostedFile hpf = hfc[iCnt];

                if (hpf.ContentLength > 0)

                {

                    if (!System.IO.File.Exists(sPath + Path.GetFileName(hpf.FileName)))

                    {

                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));

                        iUploadedCnt = iUploadedCnt + 1;

                    }

                    else

                    {

                        FileInfo f = new FileInfo(sPath + Path.GetFileName(hpf.FileName));

                        f.Delete();

                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));

                        iUploadedCnt = iUploadedCnt + 1;

                        return "Files Is Duplicate,Upload Failed";
                    }

                }

            }

            if (iUploadedCnt > 0)

            {

                return iUploadedCnt + " Files Uploaded Successfully";

            }

            else

            {

                return "Upload Failed";

            }

        }

        [HttpPost]
        [Route("UploadFiles")]
        public string UploadFiles()
        {

            int iUploadedCnt = 0;

            string sPath = "";

            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/attachment/TinTuc");

            string date = DateTime.Now.Year.ToString();

            sPath = Path.Combine(sPath, date);

            if (!Directory.Exists(sPath))

            {

                Directory.CreateDirectory(sPath);

            }

            date = DateTime.Now.Month.ToString();

            sPath = Path.Combine(sPath, date);

            if (!Directory.Exists(sPath))

            {

                Directory.CreateDirectory(sPath);

            }

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)

            {

                System.Web.HttpPostedFile hpf = hfc[iCnt];

                if (hpf.ContentLength > 0)

                {

                    if (!System.IO.File.Exists(sPath + Path.GetFileName(hpf.FileName)))

                    {

                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));

                        iUploadedCnt = iUploadedCnt + 1;

                    }

                    else

                    {

                        FileInfo f = new FileInfo(sPath + Path.GetFileName(hpf.FileName));

                        f.Delete();

                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));

                        iUploadedCnt = iUploadedCnt + 1;

                        return "Files Is Duplicate,Upload Failed";
                    }

                }

            }

            if (iUploadedCnt > 0)

            {

                return iUploadedCnt + " Files Uploaded Successfully";

            }

            else

            {

                return "Upload Failed";

            }

        }

        [HttpPost]
        [Route("ThemBaiViet")]
        public IHttpActionResult ThemBaiViet(TinTucModel tinTuc)
        {
            NEWS_TinTuc tin = new NEWS_TinTuc();
            tin.TieuDe = tinTuc.TieuDe;
            tin.NoiDung = tinTuc.NoiDung;
            tin.MoTa = tinTuc.MoTa;
            tin.MaLoaiTin = tinTuc.MaLoaiTin;
            tin.HienThi = true;
            tin.TinNoiBat = tinTuc.TinNoiBat;
            tin.HienThi = tinTuc.HienThi == true ? true : false;
            tin.HinhAnh = tinTuc.HinhAnh;
            tin.NgayHetHan = tinTuc.NgayHetHan;
            tin.NgayTao = DateTime.Now;
            tin.NgayHetHanTinMoi = tinTuc.NgayHetHanTinMoi;
            tin.NgayHetHanTrangChu = tinTuc.NgayHetHanTrangChu;
            dbContext.NEWS_TinTuc.Add(tin);
            dbContext.SaveChanges();
            if (tinTuc.TapTinDinhKem.Count > 0)
            {
                foreach (var item in tinTuc.TapTinDinhKem)
                {
                    NEWS_TinTucTapTin tttt = new NEWS_TinTucTapTin();
                    tttt.MaTinTuc = tin.MaTinTuc;
                    tttt.Ngay = DateTime.Now;
                    dbContext.NEWS_TinTucTapTin.Add(tttt);
                    dbContext.SaveChanges();
                }
            }
            return Ok("Thêm Bài Viết Thành Công");
        }
    }
}
