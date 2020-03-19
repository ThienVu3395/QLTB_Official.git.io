using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OAMS.Models;

namespace QuanLyThietBi.Controllers.APIs.QuanLyBangTin
{
    [RoutePrefix("API/QuanLyBangTin")]
    public class QuanLyBangTinController : ApiController
    {
        QuanLyTaiSanEntities dbContext = new QuanLyTaiSanEntities();
        [HttpGet]
        [Route("LayDanhSachLoaiTin")]
        public IHttpActionResult LayDanhSachLoaiTin()
        {
            var dsLoaiTin = dbContext.LoaiTinTuc.ToList();
            List<LoaiTinTucModel> dsLoaiModel = new List<LoaiTinTucModel>();
            if (dsLoaiTin.Count > 0)
            {
                foreach (var item in dsLoaiTin)
                {
                    LoaiTinTucModel loaiTinTuc = new LoaiTinTucModel();
                    loaiTinTuc.MaLoaiTin = item.MaLoaiTin;
                    loaiTinTuc.Ten = item.Ten;
                    loaiTinTuc.TrangThai = item.TrangThai;
                    dsLoaiModel.Add(loaiTinTuc);
                }
            }
            return Ok(dsLoaiModel);
        }

        [HttpGet]
        [Route("LayDanhSachTinTuc")]
        public IHttpActionResult LayDanhSachTinTuc()
        {
            var dsTin = dbContext.TinTuc.Where(x => x.MaLoaiTin == 1).ToList();
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
                    tin.TinNoiBat = item.TinNoiBat;
                    var dsBinhLuan = dbContext.BinhLuan.Where(x => x.MaTinTuc == item.MaTinTuc).ToList();
                    List<BinhLuanModel> dsBinhLuanModel = new List<BinhLuanModel>();
                    if (dsBinhLuan.Count > 0)
                    {
                        foreach (var index in dsBinhLuan)
                        {
                            BinhLuanModel binhLuan = new BinhLuanModel();
                            binhLuan.MaBinhLuan = index.MaBinhLuan;
                            binhLuan.MaTinTuc = index.MaTinTuc;
                            binhLuan.MaNguoiDung = index.MaNguoiDung;
                            binhLuan.TenNguoiDung = index.NguoiSuDung.Ten;
                            binhLuan.DonVi = index.NguoiSuDung.PhongBan.Ten;
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
            }
            return Ok(dsTinModel);
        }
    }
}
