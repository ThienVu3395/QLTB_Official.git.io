﻿using System;
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
        [Route("PhanTrang_Tuong")]
        public IHttpActionResult PhanTrang_Tuong(int page, int pageLimit, int MaLoaiTin, bool HienThi)
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
