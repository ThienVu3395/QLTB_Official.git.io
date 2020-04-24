using OAMS.Database;
using OAMS.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace OAMS.Controllers.API.QuanLyBangTin
{
    [RoutePrefix("API/QuanLyBangTin")]
    public class ThemTinTucController : ApiController
    {
        dbOAMSEntities dbContext = new dbOAMSEntities();
        [HttpGet]
        [Route("LayLoaiTin_ThemBaiViet")]
        public IHttpActionResult LayLoaiTin_ThemBaiViet()
        {
            var dsLoaiTin = dbContext.NEWS_LoaiTinTuc.Where(x => x.ThuTuHienThi != null && x.MaLoaiTin != 1).OrderBy(x => x.ThuTuHienThi).ToList();
            List<LoaiTinTucModel> dsLoaiModel = new List<LoaiTinTucModel>();
            if (dsLoaiTin.Count > 0)
            {
                foreach (var item in dsLoaiTin)
                {
                    LoaiTinTucModel loaiTinTuc = new LoaiTinTucModel();
                    loaiTinTuc.MaLoaiTin = item.MaLoaiTin;
                    loaiTinTuc.Ten = item.Ten;
                    loaiTinTuc.TrangThai = item.TrangThai;
                    loaiTinTuc.Icon = item.Icon;
                    loaiTinTuc.TemplateList = item.TemplateList;
                    loaiTinTuc.TemplateDetail = item.TemplateDetail;
                    dsLoaiModel.Add(loaiTinTuc);
                }
            }
            return Ok(dsLoaiModel);
        }

        [HttpPost]
        [Route("UploadImage")]
        public string UploadImage()
        {
            int iUploadedCnt = 0;

            string sPath = "";

            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/image/");

            if (!Directory.Exists(sPath))

            {

                Directory.CreateDirectory(sPath);

            }

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

            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/attachment/");

            //string date = DateTime.Now.Year.ToString();

            //sPath = Path.Combine(sPath, date);

            if (!Directory.Exists(sPath))

            {

                Directory.CreateDirectory(sPath);

            }

            //date = DateTime.Now.Month.ToString();

            //sPath = Path.Combine(sPath, date);

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
            tin.TinNoiBat = tinTuc.TinNoiBat;
            tin.HienThi = tinTuc.HienThi == true ? true : false;
            tin.HinhAnh = tinTuc.HinhAnh;
            tin.NgayHetHan = tinTuc.NgayHetHan;
            tin.NgayTao = tinTuc.NgayTao;
            tin.NguoiTao = 56;
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
                    tttt.Ten = item.Ten;
                    dbContext.NEWS_TinTucTapTin.Add(tttt);
                    dbContext.SaveChanges();
                }
            }
            return Ok("Thêm Bài Viết Thành Công");
        }

        [HttpPost]
        [Route("ThemBaiViet_Tuong")]
        public IHttpActionResult ThemBaiViet_Tuong(TinTucModel tinTuc)
        {
            NEWSTUONG_BaiViet tin = new NEWSTUONG_BaiViet();
            tin.Title = tinTuc.TieuDe;
            tin.Content = tinTuc.NoiDung;
            tin.TotalView = 0;
            tin.CreatedUserId = 56;
            tin.CreatedDate = tinTuc.NgayTao;
            tin.IsApproved = tinTuc.HienThi;
            dbContext.NEWSTUONG_BaiViet.Add(tin);
            dbContext.SaveChanges();
            if (tinTuc.TapTinDinhKem.Count > 0)
            {
                foreach (var item in tinTuc.TapTinDinhKem)
                {
                    NEWSTUONG_TinDinhKem tttt = new NEWSTUONG_TinDinhKem();
                    tttt.FileName = item.Ten;
                    tttt.FileSize = item.Size;
                    tttt.PostId = tin.PostId;
                    tttt.CreatedDate = DateTime.Now;
                    dbContext.NEWSTUONG_TinDinhKem.Add(tttt);
                    dbContext.SaveChanges();
                }
            }
            return Ok("Thêm Bài Viết Thành Công");
        }
    }
}
