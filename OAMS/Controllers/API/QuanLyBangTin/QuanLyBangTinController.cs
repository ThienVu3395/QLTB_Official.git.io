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

        [HttpGet]
        [Route("LayDanhSachBaiViet_TheoDanhMuc_PhanTrang")]
        public IHttpActionResult LayDanhSachBaiViet_PhanTrang(int page, int pageLimit, int MaLoaiTin)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == MaLoaiTin && x.HienThi == true).ToList().OrderByDescending(x => x.NgayTao).ToList();
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                    tin.LuotXem = item.LuotXem;
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
                tinTuc.HinhAnh = dsTin.HinhAnh;
                tinTuc.MoTa = dsTin.MoTa;
                tinTuc.NgayTao = dsTin.NgayTao;
                tinTuc.TenNguoiDung = dsTin.NEWS_NguoiSuDung.Ten;
                tinTuc.MaLoaiTin = dsTin.MaLoaiTin;
                tinTuc.LoaiTin = dsTin.NEWS_LoaiTinTuc.Ten;
                tinTuc.LuotXem = dsTin.LuotXem;
                var dsTapTin = dbContext.NEWS_TinTucTapTin.Where(x => x.MaTinTuc == MaTinTuc).ToList();
                List<TapTinModel> dsttmodel = new List<TapTinModel>();
                if (dsTapTin.Count > 0)
                {
                    foreach (var item in dsTapTin)
                    {
                        TapTinModel ttmodel = new TapTinModel();
                        ttmodel.MaTapTin = item.MaTapTin;
                        ttmodel.Ten = item.Ten;
                        ttmodel.Url = item.Url;
                        dsttmodel.Add(ttmodel);
                    }
                    tinTuc.TapTinDinhKem = dsttmodel;
                }
                var tinLQ = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == dsTin.NEWS_LoaiTinTuc.MaLoaiTin && x.MaTinTuc != MaTinTuc && x.HienThi == true).OrderByDescending(x => x.NgayTao).Take(5).ToList();
                List<TinTucModel> dsTinLQ = new List<TinTucModel>();
                if (tinLQ.Count > 0)
                {
                    foreach (var item in tinLQ)
                    {
                        TinTucModel tin = new TinTucModel();
                        tin.MaTinTuc = item.MaTinTuc;
                        tin.TieuDe = item.TieuDe;
                        tin.NoiDung = item.NoiDung;
                        tin.MoTa = item.MoTa;
                        tin.MaLoaiTin = item.MaLoaiTin;
                        tin.NgayTao = item.NgayTao;
                        tin.NgayCapNhat = item.NgayCapNhat;
                        tin.HienThi = item.HienThi;
                        tin.HinhAnh = item.HinhAnh;
                        tin.LuotXem = item.LuotXem;
                        tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                        tin.TinNoiBat = item.TinNoiBat;
                        tin.TemplateList = item.NEWS_LoaiTinTuc.TemplateList;
                        dsTinLQ.Add(tin);
                    }
                    tinTuc.TinLienQuan = dsTinLQ;
                }

                var dsBinhLuan = dbContext.NEWS_BinhLuan.Where(x => x.MaTinTuc == MaTinTuc).ToList();
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
                        binhLuan.HienThi = index.HienThi;
                        binhLuan.Ngay = index.Ngay;
                        binhLuan.Gio = index.Gio;
                        dsBinhLuanModel.Add(binhLuan);
                    }
                    tinTuc.BinhLuan = dsBinhLuanModel;
                }
                return Ok(tinTuc);
            }
            return Ok("sai rồi");
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
                    tin.NgayTao = item.NgayTao;
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                    tin.NgayCapNhat = item.NgayCapNhat;
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
                            binhLuan.HienThi = index.HienThi;
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
                    user.PhongBan = item.NEWS_PhongBan.Ten;
                    user.NgaySinh = item.NgaySinh;
                    user.ThangSinh = item.ThangSinh;
                    user.NamSinh = item.NamSinh;
                    user.HinhAnh = item.HinhAnh;
                    dsUserModel.Add(user);
                }
                return Ok(dsUserModel);
            }
            return Ok(dsUserModel);
        }
    }
}
