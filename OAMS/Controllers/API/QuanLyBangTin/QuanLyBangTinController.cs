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
using System.Data.Entity.Validation;

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
                    loaiTinTuc.HinhAnhDuPhong = item.HinhAnhDuPhong;
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
                    tin.LuotXem = item.LuotXem;
                    tin.LoaiTin = item.NEWS_LoaiTinTuc.Ten;
                    tin.TenNguoiTao = item.TenNguoiTao;
                    tin.NgayTao = item.NgayTao;
                    tin.NgayCapNhat = item.NgayCapNhat;
                    tin.HienThi = item.HienThi;
                    tin.ChiaSe = item.ChiaSe;
                    tin.HinhAnh = item.HinhAnh == null ? item.NEWS_LoaiTinTuc.HinhAnhDuPhong : item.HinhAnh;
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
                    }
                    tin.TapTinDinhKem = dsttmodel;
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
                tinTuc.NgayCapNhat = dsTin.NgayCapNhat;
                tinTuc.TenNguoiTao = dsTin.TenNguoiTao;
                tinTuc.TenNguoiDuyet = dsTin.TenNguoiDuyet;
                tinTuc.NgayDuyet = dsTin.NgayDuyet;
                tinTuc.NgayHetHan = dsTin.NgayHetHan;
                tinTuc.NgayHetHanTinMoi = dsTin.NgayHetHanTinMoi;
                tinTuc.NgayHetHanTrangChu = dsTin.NgayHetHanTrangChu;
                tinTuc.HienThi = dsTin.HienThi;
                tinTuc.ChiaSe = dsTin.ChiaSe;
                tinTuc.TenNguoiDung = dsTin.NEWS_NguoiSuDung.Ten;
                tinTuc.TemplateList = dsTin.NEWS_LoaiTinTuc.TemplateList;
                tinTuc.MaLoaiTin = dsTin.MaLoaiTin;
                tinTuc.LoaiTin = dsTin.NEWS_LoaiTinTuc.Ten;
                tinTuc.LuotXem = dsTin.LuotXem;
                tinTuc.TinNoiBat = dsTin.TinNoiBat;
                var dsTapTin = dbContext.NEWS_TinTucTapTin.Where(x => x.MaTinTuc == MaTinTuc).ToList();
                List<TapTinModel> dsttmodel = new List<TapTinModel>();
                if (dsTapTin.Count > 0)
                {
                    foreach (var item in dsTapTin)
                    {
                        TapTinModel ttmodel = new TapTinModel();
                        ttmodel.MaTinTuc = item.MaTinTuc;
                        ttmodel.MaTapTin = item.MaTapTin;
                        ttmodel.Ten = item.Ten;
                        ttmodel.Url = item.Url;
                        dsttmodel.Add(ttmodel);
                    }
                }
                tinTuc.TapTinDinhKem = dsttmodel;
                var tinLQ = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == dsTin.NEWS_LoaiTinTuc.MaLoaiTin && x.MaTinTuc != MaTinTuc && x.HienThi == true).OrderByDescending(x => x.NgayTao).Take(10).ToList();
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
                        tin.ChiaSe = item.ChiaSe;
                        tin.HinhAnh = item.HinhAnh == null ? item.NEWS_LoaiTinTuc.HinhAnhDuPhong : item.HinhAnh;
                        tin.LuotXem = item.LuotXem;
                        tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                        tin.TinNoiBat = item.TinNoiBat;
                        tin.TemplateList = item.NEWS_LoaiTinTuc.TemplateList;
                        dsTinLQ.Add(tin);
                    }
                    tinTuc.TinLienQuan = dsTinLQ;
                }
                dsTin.LuotXem += 1;
                dbContext.SaveChanges();
                return Ok(tinTuc);
            }
            return Ok("sai rồi");
        }

        [HttpPost]
        [Route("ChiaSeBaiViet")]
        public IHttpActionResult ChiaSeBaiViet(TinTucModel tinTuc)
        {
            var bv = dbContext.NEWS_TinTuc.Where(x => x.MaTinTuc == tinTuc.MaTinTuc).FirstOrDefault();
            if (bv != null)
            {
                bv.ChiaSe = false;
                dbContext.SaveChanges();
                NEWSTUONG_BaiViet bvt = new NEWSTUONG_BaiViet();
                bvt.ParentId = 0;
                bvt.GroupId = 13;
                bvt.ReplyToId = 0;
                bvt.Title = tinTuc.TieuDe;
                bvt.Content = tinTuc.NoiDung;
                bvt.TotalReplies = 0;
                bvt.TotalView = 13;
                bvt.ShareID = tinTuc.MaTinTuc;
                bvt.CreatedUserId = 56;
                bvt.CreatedUser = "Thienvu.lh";
                bvt.CreatedDate = DateTime.Now;
                bvt.LastPost = null;
                bvt.LastPostId = null;
                bvt.LastUpdated = null;
                bvt.LastUpdatedUser = null;
                bvt.LastUpdatedUserId = null;
                bvt.IsApproved = false;
                bvt.IsFavorit = false;
                dbContext.NEWSTUONG_BaiViet.Add(bvt);
                dbContext.SaveChanges();
                if (tinTuc.TapTinDinhKem.Count > 0)
                {
                    try
                    {
                        foreach (var item in tinTuc.TapTinDinhKem)
                        {
                            NEWSTUONG_TinDinhKem ttdk = new NEWSTUONG_TinDinhKem();
                            ttdk.FileName = item.Ten.Trim();
                            ttdk.OriginalFilename = item.Ten.Trim();
                            ttdk.FileSize = "256";
                            ttdk.GroupId = bvt.GroupId;
                            ttdk.UserId = bvt.CreatedUserId;
                            ttdk.PostId = bvt.PostId;
                            ttdk.CreatedDate = bvt.CreatedDate;
                            dbContext.NEWSTUONG_TinDinhKem.Add(ttdk);
                            dbContext.SaveChanges();
                        }
                    }
                    catch (DbEntityValidationException ex)
                    {
                        // Retrieve the error messages as a list of strings.
                        var errorMessages = ex.EntityValidationErrors
                                .SelectMany(x => x.ValidationErrors)
                                .Select(x => x.ErrorMessage);

                        // Join the list to a single string.
                        var fullErrorMessage = string.Join("; ", errorMessages);

                        // Combine the original exception message with the new one.
                        var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                        // Throw a new DbEntityValidationException with the improved exception message.
                        throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                    }
                }
                return Ok("Bài Viết Đang Chờ Duyệt Để Được Chia Sẻ Lên Tường");
            }
            return BadRequest("Có Lỗi Phát Sinh,Xin Vui Lòng Thử Lại");
        }

        [HttpGet]
        [Route("LayBaiVietTuong_DieuKien")]
        public IHttpActionResult LayBaiVietTuong_DieuKien(int page, int pageLimit, bool approved)
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
                    tin.HienThi = item.IsApproved;
                    tin.NgayTao = item.CreatedDate;
                    tin.TenNguoiTao = item.CreatedUser;
                    tin.NgayCapNhat = item.LastUpdated;
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
                            ttmodel.Size = i.FileSize;
                            ttmodel.Url = i.OriginalFilename;
                            dsttmodel.Add(ttmodel);
                        }
                    }
                    tin.TapTinDinhKem = dsttmodel;
                    var dsBinhLuan = dbContext.NEWS_BinhLuan.Where(x => x.MaBaiViet == item.PostId).ToList();
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
                return Ok(dsTinModel.Skip(page).Take(pageLimit));
            }
            return Ok(dsTinModel);
        }

        [HttpGet]
        [Route("LayBaiVietTuong")]
        public IHttpActionResult LayBaiVietTuong(int page, int pageLimit)
        {
            var dsTin = dbContext.NEWSTUONG_BaiViet.Where(x => x.IsApproved == true).ToList().OrderByDescending(x => x.CreatedDate).Skip(page).Take(pageLimit).ToList();
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
                    tin.HienThi = item.IsApproved;
                    tin.TenNguoiTao = item.CreatedUser;
                    tin.NgayCapNhat = item.LastUpdated;
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
                            ttmodel.Size = i.FileSize;
                            ttmodel.Url = i.OriginalFilename;
                            dsttmodel.Add(ttmodel);
                        }
                    }
                    tin.TapTinDinhKem = dsttmodel;
                    var dsBinhLuan = dbContext.NEWS_BinhLuan.Where(x => x.MaBaiViet == item.PostId && x.HienThi == true).ToList();
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
        [Route("LayBaiVietTuong_TatCa")]
        public IHttpActionResult LayBaiVietTuong_TatCa(int page, int pageLimit)
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
                    tin.MaLoaiTin = -1;
                    tin.HienThi = item.IsApproved;
                    tin.NgayTao = item.CreatedDate;
                    tin.TenNguoiTao = item.CreatedUser;
                    tin.NgayCapNhat = item.LastUpdated;
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
                            ttmodel.Size = i.FileSize;
                            ttmodel.Url = i.OriginalFilename;
                            dsttmodel.Add(ttmodel);
                        }
                        tin.TapTinDinhKem = dsttmodel;
                    }
                    var dsBinhLuan = dbContext.NEWS_BinhLuan.Where(x => x.MaBaiViet == item.PostId).ToList();
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
                return Ok(dsTinModel.Skip(page).Take(pageLimit));
            }
            return Ok(dsTinModel);
        }

        [HttpPost]
        [Route("GuiBinhLuan")]
        public IHttpActionResult GuiBinhLuan(BinhLuanModel binhLuan)
        {
            NEWS_BinhLuan bl = new NEWS_BinhLuan();
            bl.MaBaiViet = binhLuan.MaTinTuc;
            bl.MaNguoiDung = 56;
            bl.NoiDung = binhLuan.NoiDung;
            bl.HienThi = false;
            bl.Ngay = DateTime.Now;
            dbContext.NEWS_BinhLuan.Add(bl);
            dbContext.SaveChanges();
            return Ok("Bình luận của bạn đã được gửi thành công , xin vui lòng chờ để được duyệt");
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
