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
        public IHttpActionResult LayDanhSachBaiViet(int page,int pageLimit)
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
                return Ok(dsTinModel.Skip(page).Take(pageLimit));
            }
            return Ok(dsTinModel);
        }

        [HttpGet]
        [Route("LayBinhLuan")]
        public IHttpActionResult LayBinhLuan(int page, int pageLimit)
        {
            var dsBL = dbContext.NEWS_BinhLuan.ToList().OrderByDescending(x => x.MaBinhLuan).ToList();
            List<BinhLuanViewModel> dsBinhLuanModel = new List<BinhLuanViewModel>();
            if (dsBL.Count > 0)
            {
                foreach (var item in dsBL)
                {
                    BinhLuanViewModel bl = new BinhLuanViewModel();
                    bl.MaTinTuc = item.MaTinTuc;
                    bl.MaBinhLuan = item.MaBinhLuan;
                    bl.TenBaiViet = item.NEWS_TinTuc.TieuDe;
                    bl.NoiDung = item.NoiDung;
                    bl.MaNguoiDung = item.MaNguoiDung;
                    bl.HienThi = item.HienThi;
                    bl.Ngay = item.Ngay;
                    bl.CountTin = dsBL.Count;
                    bl.Gio = item.Gio;
                    bl.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                    dsBinhLuanModel.Add(bl);
                }
                return Ok(dsBinhLuanModel.Skip(page).Take(pageLimit));
            }
            return Ok(dsBinhLuanModel);
        }
    }
}
