using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OAMS.Models;
using OAMS.Database;
using System.IO;
using System.Data.Entity;
using System.Globalization;
using System.Web;

namespace OAMS.Controllers.API.QuanLyBangTin
{
    [RoutePrefix("API/AdminBangTin")]
    public class AdminBangTinController : ApiController
    {
        dbOAMSEntities dbContext = new dbOAMSEntities();
        [HttpGet]
        [Route("LayDanhSachBaiViet")]
        public IHttpActionResult LayDanhSachBaiViet(int page, int pageLimit)
        {
            var dsTin = dbContext.NEWS_TinTuc.ToList().OrderByDescending(x => x.NgayTao).ToList();
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
                    tin.LoaiTin = item.NEWS_LoaiTinTuc.Ten;
                    tin.NgayTao = item.NgayTao;
                    tin.NgayCapNhat = item.NgayCapNhat;
                    tin.HienThi = item.HienThi;
                    tin.HinhAnh = item.HinhAnh;
                    tin.TinNoiBat = item.TinNoiBat;
                    tin.CountTin = dsTin.Count;
                    tin.TemplateList = item.NEWS_LoaiTinTuc.TemplateList;
                    var dsTapTin = dbContext.NEWS_TinTucTapTin.Where(x => x.MaTinTuc == item.MaTinTuc).ToList();
                    List<TapTinModel> dsttmodel = new List<TapTinModel>();
                    if (dsTapTin.Count > 0)
                    {
                        foreach (var i in dsTapTin)
                        {
                            TapTinModel ttmodel = new TapTinModel();
                            ttmodel.MaTapTin = i.MaTapTin;
                            ttmodel.Ten = i.Ten;
                            ttmodel.Url = i.Url;
                            dsttmodel.Add(ttmodel);
                        }
                        tin.TapTinDinhKem = dsttmodel;
                    }
                    dsTinModel.Add(tin);
                }
                return Ok(dsTinModel.Skip(page).Take(pageLimit));
            }
            return Ok(dsTinModel);
        }

        //[HttpGet]
        //[Route("LayBinhLuan")]
        //public IHttpActionResult LayBinhLuan(int page, int pageLimit)
        //{
        //    var dsBL = dbContext.NEWS_BinhLuan.ToList().OrderByDescending(x => x.MaBinhLuan).ToList();
        //    List<BinhLuanViewModel> dsBinhLuanModel = new List<BinhLuanViewModel>();
        //    if (dsBL.Count > 0)
        //    {
        //        foreach (var item in dsBL)
        //        {
        //            BinhLuanViewModel bl = new BinhLuanViewModel();
        //            bl.MaTinTuc = item.MaTinTuc;
        //            bl.MaBinhLuan = item.MaBinhLuan;
        //            bl.TenBaiViet = item.NEWS_TinTuc.TieuDe;
        //            bl.NoiDung = item.NoiDung;
        //            bl.MaNguoiDung = item.MaNguoiDung;
        //            bl.HienThi = item.HienThi;
        //            bl.Ngay = item.Ngay;
        //            bl.CountTin = dsBL.Count;
        //            bl.Gio = item.Gio;
        //            bl.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
        //            bl.HinhNguoiDung = item.NEWS_NguoiSuDung.HinhAnh;
        //            dsBinhLuanModel.Add(bl);
        //        }
        //        return Ok(dsBinhLuanModel.Skip(page).Take(pageLimit));
        //    }
        //    return Ok(dsBinhLuanModel);
        //}

        //[HttpGet]
        //[Route("LayChiTietBinhLuan")]
        //public IHttpActionResult LayChiTietBinhLuan(int MaTinTuc)
        //{
        //    var tinTuc = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == MaTinTuc).FirstOrDefault();
        //    TinTucModel tin = new TinTucModel();
        //    if (tinTuc != null)
        //    {
        //        tin.MaTinTuc = tinTuc.MaTinTuc;
        //        tin.TieuDe = tinTuc.TieuDe;
        //        tin.NoiDung = tinTuc.NoiDung;
        //        tin.MoTa = tinTuc.MoTa;
        //        tin.MaLoaiTin = tinTuc.MaLoaiTin;
        //        tin.NgayTao = tinTuc.NgayTao;
        //        tin.NgayCapNhat = tinTuc.NgayCapNhat;
        //        tin.HienThi = tinTuc.HienThi;
        //        tin.HinhAnh = tinTuc.HinhAnh;
        //        tin.TinNoiBat = tinTuc.TinNoiBat;
        //        var dsBinhLuan = dbContext.NEWS_BinhLuan.Where(x => x.MaTinTuc == MaTinTuc).ToList();
        //        List<BinhLuanModel> dsBinhLuanModel = new List<BinhLuanModel>();
        //        if (dsBinhLuan.Count > 0)
        //        {
        //            foreach (var index in dsBinhLuan)
        //            {
        //                BinhLuanModel binhLuan = new BinhLuanModel();
        //                binhLuan.MaBinhLuan = index.MaBinhLuan;
        //                binhLuan.MaTinTuc = index.MaTinTuc;
        //                binhLuan.MaNguoiDung = index.MaNguoiDung;
        //                binhLuan.TenNguoiDung = index.NEWS_NguoiSuDung.Ten;
        //                binhLuan.HinhAnh = index.NEWS_NguoiSuDung.HinhAnh;
        //                binhLuan.DonVi = "Phòng ABCXYAZZ";
        //                binhLuan.NoiDung = index.NoiDung;
        //                binhLuan.HienThi = index.HienThi;
        //                binhLuan.Ngay = index.Ngay;
        //                binhLuan.Gio = index.Gio;
        //                dsBinhLuanModel.Add(binhLuan);
        //            }
        //        }
        //        tin.BinhLuan = dsBinhLuanModel;
        //        return Ok(tin);
        //    }
        //    return Ok(tin);
        //}
    }
}
