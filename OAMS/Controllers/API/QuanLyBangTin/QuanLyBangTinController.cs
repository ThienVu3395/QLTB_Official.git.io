using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OAMS.Models;
using OAMS.Database;

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
                    int dsTin = dbContext.NEWS_TinTuc.Where(x => x.MaLoaiTin == loaiTinTuc.MaLoaiTin && x.HienThi == true).Count();
                    loaiTinTuc.Ten = item.Ten;
                    loaiTinTuc.TrangThai = item.TrangThai;
                    loaiTinTuc.Icon = item.Icon;
                    loaiTinTuc.Count = dsTin;
                    dsLoaiModel.Add(loaiTinTuc);
                }
            }
            return Ok(dsLoaiModel);
        }

        [HttpPost]
        [Route("LayDanhSachBaiViet_PhanTrang")]
        public IHttpActionResult LayDanhSachBaiViet_PhanTrang(PageModel pm)
        {
            if(pm.MaLoaiTin == 5)
            {
                var dsUser = dbContext.NEWS_NguoiSuDung.Where(x => x.ThangSinh == pm.Month).ToList();
                if(dsUser.Count > 0)
                {
                    List<NguoiDungModel> dsUserModel = new List<NguoiDungModel>();
                    foreach(var item in dsUser)
                    {
                        NguoiDungModel user = new NguoiDungModel();
                        user.MaNguoiDung = item.MaNguoiDung;
                        user.Ten = item.Ten;
                        user.NgaySinh = item.NgaySinh;
                        user.ThangSinh = item.ThangSinh;
                        user.NamSinh = item.NamSinh;
                        dsUserModel.Add(user);
                    }
                    return Ok(dsUserModel);
                }
                return Ok("Không Có Người Dùng Nào Có Sinh Nhật Vào Tháng Này");
            }
            else
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
                        tin.TinNoiBat = item.TinNoiBat;
                        tin.CountTin = dsTin.Count;
                        if (item.NEWS_LoaiTinTuc.Icon == "book")
                        {
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
                                    binhLuan.TenNguoiDung = index.tbNguoidung.TEN;
                                    binhLuan.DonVi = index.tbNguoidung.tbBophan.TENPHONG;
                                    binhLuan.NoiDung = index.NoiDung;
                                    binhLuan.MaTrangThai = index.MaTrangThai;
                                    binhLuan.Ngay = index.Ngay;
                                    binhLuan.Gio = index.Gio;
                                    dsBinhLuanModel.Add(binhLuan);
                                }
                            }
                            tin.BinhLuan = dsBinhLuanModel;
                        }
                        dsTinModel.Add(tin);
                    }
                }
                return Ok(dsTinModel.Skip(pm.Limit).Take(pm.itemPerPage));
            }
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
                tinTuc.TacGia = dsTin.TacGia;
                return Ok(tinTuc);
            }
            return Ok("sai rồi");
        }
    }
}
