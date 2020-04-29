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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
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
        [Route("LayChiTietBaiViet_Tuong")]
        public IHttpActionResult LayChiTietBaiViet_Tuong(int MaTinTuc)
        {
            var dsTin = dbContext.NEWSTUONG_BaiViet.Where(x => x.PostId == MaTinTuc).FirstOrDefault();
            if (dsTin != null)
            {
                TinTucModel tin = new TinTucModel();
                tin.MaTinTuc = dsTin.PostId;
                tin.TieuDe = dsTin.Title;
                tin.NoiDung = dsTin.Content;
                tin.MaLoaiTin = dsTin.GroupId;
                tin.NgayTao = dsTin.CreatedDate;
                tin.HienThi = dsTin.IsApproved;
                tin.TenNguoiDung = dsTin.CreatedUser;
                tin.NgayCapNhat = dsTin.LastUpdated;
                var dsTapTin = dbContext.NEWSTUONG_TinDinhKem.Where(x => x.PostId == dsTin.PostId).ToList();
                List<TapTinModel> dsttmodel = new List<TapTinModel>();
                if (dsTapTin.Count > 0)
                {
                    foreach (var i in dsTapTin)
                    {
                        TapTinModel ttmodel = new TapTinModel();
                        ttmodel.MaTapTin = i.FileId;
                        ttmodel.Ten = i.FileName;
                        ttmodel.Size = i.FileSize;
                        ttmodel.Url = i.OriginalFilename;
                        dsttmodel.Add(ttmodel);
                    }
                    tin.TapTinDinhKem = dsttmodel;
                }
                var dsBinhLuan = dbContext.NEWS_BinhLuan.Where(x => x.MaBaiViet == dsTin.PostId).ToList();
                List<BinhLuanModel> dsBinhLuanModel = new List<BinhLuanModel>();
                if (dsBinhLuan.Count > 0)
                {
                    foreach (var index in dsBinhLuan)
                    {
                        BinhLuanModel binhLuan = new BinhLuanModel();
                        binhLuan.MaBinhLuan = index.MaBinhLuan;
                        binhLuan.MaTinTuc = index.MaBaiViet;
                        binhLuan.MaNguoiDung = index.MaNguoiDung;
                        binhLuan.TenNguoiDung = index.NEWS_NguoiSuDung.Ten;
                        binhLuan.DonVi = index.NEWS_NguoiSuDung.NEWS_PhongBan.Ten;
                        binhLuan.HinhAnh = index.NEWS_NguoiSuDung.HinhAnh;
                        binhLuan.NoiDung = index.NoiDung;
                        binhLuan.HienThi = index.HienThi;
                        binhLuan.Ngay = index.Ngay;
                        binhLuan.Gio = index.Gio;
                        dsBinhLuanModel.Add(binhLuan);
                    }
                    tin.BinhLuan = dsBinhLuanModel;
                }
                return Ok(tin);
            }
            return Ok("Có lỗi,xin vui lòng thử lại");
        }

        [HttpGet]
        [Route("LayDanhSachBaiViet_TheoDanhMuc")]
        public IHttpActionResult LayDanhSachBaiViet_Loc(int page, int pageLimit, int MaLoaiTin)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == MaLoaiTin).ToList().OrderByDescending(x => x.NgayTao).ToList();
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
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
        [Route("LayDanhSachBaiViet_TheoHienThi")]
        public IHttpActionResult LayDanhSachBaiViet_TheoHienThi(int page, int pageLimit, bool HienThi)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == HienThi).ToList().OrderByDescending(x => x.NgayTao).ToList();
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
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
        [Route("LayDanhSachBaiViet_TheoDieuKien")]
        public IHttpActionResult LayDanhSachBaiViet_TheoDieuKien(int page, int pageLimit, int MaLoaiTin, bool HienThi)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == HienThi && x.MaLoaiTin == MaLoaiTin).ToList().OrderByDescending(x => x.NgayTao).ToList();
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
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
        [Route("PhanTrang_TatCa")]
        public IHttpActionResult PhanTrang_TatCa(int page, int pageLimit)
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
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
        [Route("PhanTrangTuong_TatCa")]
        public IHttpActionResult PhanTrangTuong_TatCa(int page, int pageLimit)
        {
            var dsTin = dbContext.NEWSTUONG_BaiViet.ToList().OrderByDescending(x => x.CreatedDate).ToList();
            List<TinTucModel> dsTinModel = new List<TinTucModel>();
            if (dsTin.Count > 0)
            {
                foreach (var item in dsTin)
                {
                    TinTucModel tin = new TinTucModel();
                    tin.MaTinTuc = item.PostId;
                    tin.TieuDe = item.Title;
                    tin.NoiDung = item.Content;
                    tin.MaLoaiTin = item.GroupId;
                    tin.NgayTao = item.CreatedDate;
                    tin.TenNguoiDung = item.CreatedUser;
                    tin.NgayCapNhat = item.LastUpdated;
                    tin.HienThi = item.IsApproved;
                    tin.TinNoiBat = item.IsFavorit;
                    tin.CountTin = dsTin.Count;
                    var dsTapTin = dbContext.NEWSTUONG_TinDinhKem.Where(x => x.PostId == item.PostId).ToList();
                    List<TapTinModel> dsttmodel = new List<TapTinModel>();
                    if (dsTapTin.Count > 0)
                    {
                        foreach (var i in dsTapTin)
                        {
                            TapTinModel ttmodel = new TapTinModel();
                            ttmodel.MaTapTin = i.FileId;
                            ttmodel.Ten = i.FileName;
                            ttmodel.Url = i.OriginalFilename;
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
        [Route("PhanTrang_TheoDanhMuc")]
        public IHttpActionResult PhanTrang_TheoDanhMuc(int page, int pageLimit, int MaLoaiTin)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == MaLoaiTin).ToList().OrderByDescending(x => x.NgayTao).ToList();
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
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
        [Route("PhanTrang_TheoHienThi")]
        public IHttpActionResult PhanTrang_TheoHienThi(int page, int pageLimit, bool HienThi)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == HienThi).ToList().OrderByDescending(x => x.NgayTao).ToList();
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
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
        [Route("PhanTrang_TheoDieuKien")]
        public IHttpActionResult PhanTrang_TheoDieuKien(int page, int pageLimit, int MaLoaiTin, bool HienThi)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == HienThi && x.MaLoaiTin == MaLoaiTin).ToList().OrderByDescending(x => x.NgayTao).ToList();
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
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
        [Route("PhanTrangTuong_TheoDieuKien")]
        public IHttpActionResult PhanTrangTuong_TheoDieuKien(int page, int pageLimit, bool approved)
        {
            var dsTin = dbContext.NEWSTUONG_BaiViet.Where(x => x.IsApproved == approved).ToList().OrderByDescending(x => x.CreatedDate).ToList();
            List<TinTucModel> dsTinModel = new List<TinTucModel>();
            if (dsTin.Count > 0)
            {
                foreach (var item in dsTin)
                {
                    TinTucModel tin = new TinTucModel();
                    tin.MaTinTuc = item.PostId;
                    tin.TieuDe = item.Title;
                    tin.NoiDung = item.Content;
                    tin.MaLoaiTin = item.GroupId;
                    tin.NgayTao = item.CreatedDate;
                    tin.TenNguoiDung = item.CreatedUser;
                    tin.NgayCapNhat = item.LastUpdated;
                    tin.HienThi = item.IsApproved;
                    tin.TinNoiBat = item.IsFavorit;
                    tin.CountTin = dsTin.Count;
                    var dsTapTin = dbContext.NEWSTUONG_TinDinhKem.Where(x => x.PostId == item.PostId).ToList();
                    List<TapTinModel> dsttmodel = new List<TapTinModel>();
                    if (dsTapTin.Count > 0)
                    {
                        foreach (var i in dsTapTin)
                        {
                            TapTinModel ttmodel = new TapTinModel();
                            ttmodel.MaTapTin = i.FileId;
                            ttmodel.Ten = i.FileName;
                            ttmodel.Url = i.OriginalFilename;
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
        [Route("DuyetTin")]
        public IHttpActionResult DuyetTin(int MaTinTuc)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == MaTinTuc).FirstOrDefault();
            dsTin.HienThi = true;
            dbContext.SaveChanges();
            return Ok("Duyệt Tin Thành Công");
        }

        [HttpGet]
        [Route("HuyDuyetTin")]
        public IHttpActionResult HuyDuyetTin(int MaTinTuc)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == MaTinTuc).FirstOrDefault();
            dsTin.HienThi = false;
            dbContext.SaveChanges();
            return Ok("Tin Đã Được Hủy Duyệt");
        }

        [HttpDelete]
        [Route("XoaTin")]
        public IHttpActionResult XoaTin(int MaTinTuc)
        {
            var baiViet = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == MaTinTuc).FirstOrDefault();
            if (baiViet != null)
            {
                string imgPath = "";

                imgPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/image/" + baiViet.HinhAnh);

                if (System.IO.File.Exists(imgPath))

                {
                    FileInfo f = new FileInfo(imgPath);

                    f.Delete();
                }
                var dsTin = dbContext.NEWS_TinTucTapTin.Where(x => x.MaTinTuc == MaTinTuc).ToList();
                if(dsTin.Count > 0)
                {
                    foreach(var item in dsTin)
                    {
                        string filePath = "";

                        filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/attachment/" + item.Ten);

                        if (System.IO.File.Exists(filePath))

                        {
                            FileInfo f = new FileInfo(filePath);

                            f.Delete();

                            dbContext.NEWS_TinTucTapTin.Remove(item);

                            dbContext.SaveChanges();
                        }
                    }
                }
                dbContext.NEWS_TinTuc.Remove(baiViet);
                dbContext.SaveChanges();
                return Ok("Bài Viết Đã Được Xóa");
            }
            return BadRequest("Có lỗi phát sinh,xin vui lòng thử lại");
        }

        [HttpPost]
        [Route("XuLyBinhLuan")]
        public IHttpActionResult XuLyBinhLuan(BinhLuanModel binhLuan)
        {
            var bl = dbContext.NEWS_BinhLuan.Where(x => x.MaBinhLuan == binhLuan.MaBinhLuan && x.MaBaiViet == binhLuan.MaTinTuc).FirstOrDefault();
            if (bl != null)
            {
                bl.HienThi = binhLuan.HienThi;
                dbContext.SaveChanges();
                if (binhLuan.HienThi == true)
                {
                    return Ok("Bình Luận Đã Được Duyệt");
                }
                else if(binhLuan.HienThi == false)
                {
                    return Ok("Bình Luận Đã Được Hủy Duyệt");
                }
            }
            return BadRequest("Có lỗi phát sinh,xin vui lòng thử lại");
        }

        [HttpGet]
        [Route("XuLyTinTuong")]
        public IHttpActionResult XuLyTinTuong(int MaTinTuc , bool IsApproved)
        {
            var tin = dbContext.NEWSTUONG_BaiViet.Where(x => x.PostId == MaTinTuc).FirstOrDefault();
            if (tin != null)
            {
                tin.IsApproved = IsApproved;
                dbContext.SaveChanges();
                if (IsApproved == true)
                {
                    return Ok("Bài Viết Đã Được Duyệt");
                }
                else if (IsApproved == false)
                {
                    return Ok("Bài Viết Đã Được Hủy Duyệt");
                }
            }
            return BadRequest("Có lỗi phát sinh,xin vui lòng thử lại");
        }

        [HttpDelete]
        [Route("XoaHinh")]
        public IHttpActionResult XoaHinh(int MaTinTuc)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == MaTinTuc).FirstOrDefault();
            if (dsTin != null)
            {
                string imgPath = "";

                imgPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/image/" + dsTin.HinhAnh);

                if (System.IO.File.Exists(imgPath))

                {
                    FileInfo f = new FileInfo(imgPath);

                    f.Delete();
                }
                dsTin.HinhAnh = null;
                dbContext.SaveChanges();
                return Ok("Hình Đã Được Xóa");
            }
            return BadRequest("Có lỗi phát sinh,xin vui lòng thử lại");
        }

        [HttpPost]
        [Route("CapNhatHinh")]
        public IHttpActionResult CapNhatHinh(TinTucModel tinTuc)
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == tinTuc.MaTinTuc).FirstOrDefault();
            if (dsTin != null)
            {
                string imgPath = "";

                imgPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/image/" + tinTuc.HinhCu);

                if (System.IO.File.Exists(imgPath))

                {
                    FileInfo f = new FileInfo(imgPath);

                    f.Delete();
                }
                dsTin.HinhAnh = tinTuc.HinhAnh;
                dbContext.SaveChanges();
                return Ok("Hình Đại Diện Đã Được Cập Nhật");
            }
            return BadRequest("Có lỗi phát sinh,xin vui lòng thử lại");
        }

        [HttpDelete]
        [Route("XoaFile")]
        public IHttpActionResult XoaFile(int MaTapTin)
        {
            var dsTin = dbContext.NEWS_TinTucTapTin.Where(x => x.MaTapTin == MaTapTin).FirstOrDefault();
            if (dsTin != null)
            {
                string imgPath = "";

                imgPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/attachment/" + dsTin.Ten);

                if (System.IO.File.Exists(imgPath))

                {
                    FileInfo f = new FileInfo(imgPath);

                    f.Delete();
                }
                dbContext.NEWS_TinTucTapTin.Remove(dsTin);
                dbContext.SaveChanges();
                return Ok("Tập Tin Đã Được Xóa");
            }
            return BadRequest("Có lỗi phát sinh,xin vui lòng thử lại");
        }

        [HttpPost]
        [Route("CapNhatFile")]
        public IHttpActionResult CapNhatFile(TapTinModel taptin)
        {
            NEWS_TinTucTapTin tapTinDinhKem = new NEWS_TinTucTapTin();
            tapTinDinhKem.MaTinTuc = taptin.MaTinTuc;
            tapTinDinhKem.Ten = taptin.Ten;
            tapTinDinhKem.Url = null;
            tapTinDinhKem.Ngay = DateTime.Now;
            dbContext.NEWS_TinTucTapTin.Add(tapTinDinhKem);
            dbContext.SaveChanges();
            return Ok(tapTinDinhKem.MaTapTin);
        }

        [HttpPost]
        [Route("CapNhatThongTin")]
        public IHttpActionResult CapNhatThongTin(TinTucModel tinTuc)
        {
            var tin = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == tinTuc.MaTinTuc).FirstOrDefault();
            if (tin != null) {
                tin.TieuDe = tinTuc.TieuDe;
                tin.NoiDung = tinTuc.NoiDung;
                tin.MoTa = tinTuc.MoTa;
                tin.MaLoaiTin = tinTuc.MaLoaiTin;
                tin.TinNoiBat = tinTuc.TinNoiBat;
                tin.HienThi = tinTuc.HienThi;
                tin.NgayCapNhat = DateTime.Now;
                tin.NguoiCapNhat = 56;
                tin.NgayHetHan = tinTuc.NgayHetHan;
                tin.NgayHetHanTinMoi = tinTuc.NgayHetHanTinMoi;
                tin.NgayHetHanTrangChu = tinTuc.NgayHetHanTrangChu;
                dbContext.SaveChanges();
                return Ok("Cập Nhật Thông Tin Bài Viết Thành Công");
            }
            return BadRequest("Có lỗi,xin vui lòng thử lại sau");
        }
    }
}
