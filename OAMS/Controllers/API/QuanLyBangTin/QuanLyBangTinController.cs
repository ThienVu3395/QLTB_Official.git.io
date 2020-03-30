using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OAMS.Models;
using OAMS.Database;
using System.IO;

namespace QuanLyThietBi.Controllers.APIs.QuanLyBangTin
{
    [RoutePrefix("API/QuanLyBangTin")]
    public class QuanLyBangTinController : ApiController
    {
        dbOAMSEntities dbContext = new dbOAMSEntities();
        [HttpGet]
        [Route("LayDanhSachLoaiTin")]
        public IHttpActionResult LayDanhSachLoaiTin()
        {
            var dsLoaiTin = dbContext.NEWS_LoaiTinTuc.Where(x => x.ThuTuHienThi != null).OrderBy(x => x.ThuTuHienThi).ToList();
            DateTime date = DateTime.Now;
            var dsSinhNhat = dbContext.NEWS_NguoiSuDung.Where(x => x.ThangSinh == date.Month).ToList();
            List<LoaiTinTucModel> dsLoaiModel = new List<LoaiTinTucModel>();
            if (dsLoaiTin.Count > 0)
            {
                foreach (var item in dsLoaiTin)
                {
                    LoaiTinTucModel loaiTinTuc = new LoaiTinTucModel();
                    loaiTinTuc.MaLoaiTin = item.MaLoaiTin;
                    int dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == loaiTinTuc.MaLoaiTin && x.HienThi == true).Count();
                    loaiTinTuc.Ten = item.Ten;
                    loaiTinTuc.TrangThai = item.TrangThai;
                    loaiTinTuc.Icon = item.Icon;
                    loaiTinTuc.Count = dsTin;
                    loaiTinTuc.CountUser = dsSinhNhat.Count();
                    loaiTinTuc.Month = date.Month;
                    loaiTinTuc.TemplateList = item.TemplateList;
                    loaiTinTuc.TemplateDetail = item.TemplateDetail;
                    dsLoaiModel.Add(loaiTinTuc);
                }
            }
            return Ok(dsLoaiModel);
        }

        [HttpGet]
        [Route("LaySinhNhat")]
        public IHttpActionResult LaySinhNhat(int Month)
        {
            var dsUser = dbContext.NEWS_NguoiSuDung.Where(x => x.ThangSinh == Month).ToList();
            List<NguoiDungModel> dsUserModel = new List<NguoiDungModel>();
            if (dsUser.Count > 0)
            {
                foreach (var item in dsUser)
                {
                    NguoiDungModel user = new NguoiDungModel();
                    user.MaNguoiDung = item.MaNguoiDung;
                    user.Ten = item.Ten;
                    user.NgaySinh = item.NgaySinh;
                    user.ThangSinh = item.ThangSinh;
                    user.NamSinh = item.NamSinh;
                    user.HinhAnh = item.HinhAnh;
                    user.CountTin = dsUser.Count();
                    dsUserModel.Add(user);
                }
                return Ok(dsUserModel);
            }
            return Ok(dsUserModel);
        }

        [HttpPost]
        [Route("LayDanhSachBaiViet_PhanTrang")]
        public IHttpActionResult LayDanhSachBaiViet_PhanTrang(PageModel pm)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == pm.MaLoaiTin && x.HienThi == true).ToList();
            List<TinTucModel> dsTinModel = new List<TinTucModel>();
            if (dsTin.Count > 0)
            {
                foreach (var item in dsTin)
                {
                    TinTucModel tin = new TinTucModel();
                    tin.MaTinTuc = item.MaTinTuc;
                    tin.TieuDe = item.TieuDe;
                    tin.NoiDung = item.NoiDung;
                    tin.MoTa = item.MoTa;
                    tin.MaLoaiTin = item.MaLoaiTin;
                    tin.TacGia = item.TacGia;
                    tin.NgayTao = item.NgayTao;
                    tin.NgayCapNhat = item.NgayCapNhat;
                    tin.NguoiCapNhat = item.NguoiCapNhat;
                    tin.HienThi = item.HienThi;
                    tin.HinhAnh = item.HinhAnh;
                    tin.TinNoiBat = item.TinNoiBat;
                    tin.CountTin = dsTin.Count;
                    tin.TemplateList = item.NEWS_LoaiTinTuc.TemplateList;
                    dsTinModel.Add(tin);
                }
            }
            return Ok(dsTinModel.Skip(pm.Limit).Take(pm.itemPerPage));
        }

        [HttpGet]
        [Route("LayBaiVietTuong")]
        public IHttpActionResult LayBaiVietTuong()
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == 3).ToList();
            List<TinTucModel> dsTinModel = new List<TinTucModel>();
            if (dsTin.Count > 0)
            {
                foreach (var item in dsTin)
                {
                    TinTucModel tin = new TinTucModel();
                    tin.MaTinTuc = item.MaTinTuc;
                    tin.TieuDe = item.TieuDe;
                    tin.NoiDung = item.NoiDung;
                    tin.MoTa = item.MoTa;
                    tin.MaLoaiTin = item.MaLoaiTin;
                    tin.TacGia = item.TacGia;
                    tin.NgayTao = item.NgayTao;
                    tin.NgayCapNhat = item.NgayCapNhat;
                    tin.NguoiCapNhat = item.NguoiCapNhat;
                    tin.HienThi = item.HienThi;
                    tin.HinhAnh = item.HinhAnh;
                    tin.TinNoiBat = item.TinNoiBat;
                    tin.CountTin = dsTin.Count;
                    var dsBinhLuan = dbContext.NEWS_BinhLuan.Where(x => x.MaTinTuc == item.MaTinTuc).ToList();
                    List<BinhLuanModel> dsBinhLuanModel = new List<BinhLuanModel>();
                    if (dsBinhLuan.Count > 0)
                    {
                        foreach (var index in dsBinhLuan)
                        {
                            BinhLuanModel binhLuan = new BinhLuanModel();
                            binhLuan.MaBinhLuan = index.MaBinhLuan;
                            binhLuan.MaTinTuc = index.MaTinTuc;
                            binhLuan.MaNguoiDung = index.MaNguoiDung;
                            binhLuan.TenNguoiDung = index.NEWS_NguoiSuDung.Ten;
                            binhLuan.HinhAnh = index.NEWS_NguoiSuDung.HinhAnh;
                            binhLuan.DonVi = "Phòng ABCXYAZZ";
                            binhLuan.NoiDung = index.NoiDung;
                            binhLuan.MaTrangThai = index.MaTrangThai;
                            binhLuan.Ngay = index.Ngay;
                            binhLuan.Gio = index.Gio;
                            dsBinhLuanModel.Add(binhLuan);
                        }
                    }
                    tin.BinhLuan = dsBinhLuanModel;
                    dsTinModel.Add(tin);
                }
                return Ok(dsTinModel);
            }
            return Ok(dsTinModel);
        }

        [HttpGet]
        [Route("LayChiTietBaiViet")]
        public IHttpActionResult LayChiTietBaiViet(int MaTinTuc)
        {
            NEWS_TinTuc dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == MaTinTuc).FirstOrDefault();
            if (dsTin != null)
            {
                TinTucModel tinTuc = new TinTucModel();
                tinTuc.MaTinTuc = dsTin.MaTinTuc;
                tinTuc.NoiDung = dsTin.NoiDung;
                tinTuc.TieuDe = dsTin.TieuDe;
                tinTuc.TacGia = dsTin.TacGia;
                tinTuc.HinhAnh = dsTin.HinhAnh;
                var dsTapTin = dbContext.NEWS_TinTucTapTin.Where(x => x.MaTinTuc == MaTinTuc).ToList();
                List<TapTinModel> dsttmodel = new List<TapTinModel>();
                if (dsTapTin.Count > 0)
                {
                    foreach (var item in dsTapTin)
                    {
                        TapTinModel ttmodel = new TapTinModel();
                        ttmodel.MaTapTin = item.MaTapTin;
                        ttmodel.Ten = item.NEWS_TapTinDinhKem.Ten;
                        ttmodel.Url = item.NEWS_TapTinDinhKem.Url;
                        dsttmodel.Add(ttmodel);
                    }
                    tinTuc.TapTinDinhKem = dsttmodel;
                }
                return Ok(tinTuc);
            }
            return Ok("sai rồi");
        }

        [HttpPost]
        [Route("GuiBinhLuan")]
        public IHttpActionResult GuiBinhLuan(BinhLuanModel bl)
        {
            NEWS_BinhLuan binhLuan = new NEWS_BinhLuan();
            binhLuan.MaTinTuc = bl.MaTinTuc;
            binhLuan.MaNguoiDung = 77;
            binhLuan.NoiDung = bl.NoiDung;
            binhLuan.MaTrangThai = 1;
            binhLuan.Ngay = null;
            binhLuan.Gio = null;
            dbContext.NEWS_BinhLuan.Add(binhLuan);
            return Ok("Bình Luận Của Bạn Đã Được Gửi");
        }

        [HttpPost]
        [Route("UploadFiles")]
        public string UploadFiles()
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
                    if (!File.Exists(sPath + Path.GetFileName(hpf.FileName)))
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
        public IHttpActionResult ThemBaiViet()
        {
            return Ok("haha");
        }
    }
}
