using OAMS.Database;
using OAMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OAMS.Controllers.API.QuanLyBangTin
{
    [RoutePrefix("API/QuanLyBangTin")]
    public class TrangChu01Controller : ApiController
    {
        dbOAMSEntities dbContext = new dbOAMSEntities();
        [HttpGet]
        [Route("LayTinNoiBat")]
        public IHttpActionResult LayTinNoiBat()
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == true).ToList().OrderByDescending(x => x.NgayTao).Take(3).ToList();
            List<TinTucModel> dsTinModel = new List<TinTucModel>();
            if (dsTin.Count > 0)
            {
                foreach (var item in dsTin)
                {
                    TinTucModel tin = new TinTucModel();
                    tin.MaTinTuc = item.MaTinTuc;
                    tin.TieuDe = item.TieuDe;
                    tin.NoiDung = item.NoiDung;
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                    tin.MoTa = item.MoTa;
                    tin.NgayTao = item.NgayTao;
                    tin.MaLoaiTin = item.MaLoaiTin;
                    tin.LoaiTin = item.NEWS_LoaiTinTuc.Ten;
                    tin.LuotXem = item.LuotXem;
                    tin.HinhAnh = item.HinhAnh;
                    dsTinModel.Add(tin);
                }
                return Ok(dsTinModel);
            }
            return Ok(dsTinModel);
        }

        [HttpGet]
        [Route("LayTinXemNhieu")]
        public IHttpActionResult LayTinXemNhieu()
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == true).ToList().OrderByDescending(x => x.LuotXem).Take(3).ToList();
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
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                    tin.NgayTao = item.NgayTao;
                    tin.MaLoaiTin = item.MaLoaiTin;
                    tin.LoaiTin = item.NEWS_LoaiTinTuc.Ten;
                    tin.LuotXem = item.LuotXem;
                    tin.HinhAnh = item.HinhAnh;
                    dsTinModel.Add(tin);
                }
                return Ok(dsTinModel);
            }
            return Ok(dsTinModel);
        }

        [HttpGet]
        [Route("LayTinThongBao")]
        public IHttpActionResult LayTinThongBao()
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == true && x.MaLoaiTin == 2).ToList().OrderByDescending(x => x.LuotXem).Take(3).ToList();
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
                    tin.NgayTao = item.NgayTao;
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                    tin.MaLoaiTin = item.MaLoaiTin;
                    tin.LoaiTin = item.NEWS_LoaiTinTuc.Ten;
                    tin.LuotXem = item.LuotXem;
                    tin.HinhAnh = item.HinhAnh;
                    dsTinModel.Add(tin);
                }
                return Ok(dsTinModel);
            }
            return Ok(dsTinModel);
        }

        [HttpGet]
        [Route("LayTinSuKien")]
        public IHttpActionResult LayTinSuKien()
        {
            var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == true && x.MaLoaiTin == 4).ToList().OrderByDescending(x => x.LuotXem).Take(3).ToList();
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
                    tin.NgayTao = item.NgayTao;
                    tin.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                    tin.MaLoaiTin = item.MaLoaiTin;
                    tin.LoaiTin = item.NEWS_LoaiTinTuc.Ten;
                    tin.LuotXem = item.LuotXem;
                    tin.HinhAnh = item.HinhAnh;
                    dsTinModel.Add(tin);
                }
                return Ok(dsTinModel);
            }
            return Ok(dsTinModel);
        }

        [HttpGet]
        [Route("LayTinSawaco")]
        public IHttpActionResult LayTinSawaco()
        {
            var tt = dbContext.NEWS_TinTuc.Where(x => x.HienThi == true && x.MaLoaiTin == 1).OrderByDescending(x => x.NgayTao).FirstOrDefault();
            TinTucModel tin = new TinTucModel();
            if (tt != null)
            {
                tin.MaTinTuc = tt.MaTinTuc;
                tin.TieuDe = tt.TieuDe;
                tin.NoiDung = tt.NoiDung;
                tin.MoTa = tt.MoTa;
                tin.NgayTao = tt.NgayTao;
                tin.TenNguoiDung = tt.NEWS_NguoiSuDung.Ten;
                tin.MaLoaiTin = tt.MaLoaiTin;
                tin.LoaiTin = tt.NEWS_LoaiTinTuc.Ten;
                tin.LuotXem = tt.LuotXem;
                tin.HinhAnh = tt.HinhAnh;
                List<TinTucModel> tinLQ = new List<TinTucModel>();
                var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == true && x.MaLoaiTin == 1).ToList().OrderByDescending(x => x.NgayTao).Skip(1).Take(2).ToList();
                if (dsTin.Count != 0)
                {
                    foreach (var item in dsTin)
                    {
                        TinTucModel tinlq = new TinTucModel();
                        tinlq.MaTinTuc = item.MaTinTuc;
                        tinlq.TieuDe = item.TieuDe;
                        tinlq.NoiDung = item.NoiDung;
                        tinlq.MoTa = item.MoTa;
                        tinlq.NgayTao = item.NgayTao;
                        tinlq.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                        tinlq.MaLoaiTin = item.MaLoaiTin;
                        tinlq.LoaiTin = item.NEWS_LoaiTinTuc.Ten;
                        tinlq.LuotXem = item.LuotXem;
                        tinlq.HinhAnh = item.HinhAnh;
                        tinLQ.Add(tinlq);
                    }
                    tin.TinLienQuan = tinLQ;
                }
                return Ok(tin);
            }
            return Ok(tin);
        }

        [HttpGet]
        [Route("LayTinTuong")]
        public IHttpActionResult LayTinTuong()
        {
            var tt = dbContext.NEWS_TinTuc.Where(x => x.HienThi == true && x.MaLoaiTin == 3).OrderByDescending(x => x.NgayTao).FirstOrDefault();
            TinTucModel tin = new TinTucModel();
            if (tt != null)
            {
                tin.MaTinTuc = tt.MaTinTuc;
                tin.TieuDe = tt.TieuDe;
                tin.NoiDung = tt.NoiDung;
                tin.MoTa = tt.MoTa;
                tin.NgayTao = tt.NgayTao;
                tin.TenNguoiDung = tt.NEWS_NguoiSuDung.Ten;
                tin.MaLoaiTin = tt.MaLoaiTin;
                tin.LoaiTin = tt.NEWS_LoaiTinTuc.Ten;
                tin.LuotXem = tt.LuotXem;
                tin.HinhAnh = tt.HinhAnh;
                List<TinTucModel> tinLQ = new List<TinTucModel>();
                var dsTin = dbContext.NEWS_TinTuc.Where(x => x.HienThi == true && x.MaLoaiTin == 3).ToList().OrderByDescending(x => x.NgayTao).Skip(1).Take(2).ToList();
                if(dsTin.Count != 0)
                {
                    foreach (var item in dsTin)
                    {
                        TinTucModel tinlq = new TinTucModel();
                        tinlq.MaTinTuc = item.MaTinTuc;
                        tinlq.TieuDe = item.TieuDe;
                        tinlq.NoiDung = item.NoiDung;
                        tinlq.MoTa = item.MoTa;
                        tinlq.NgayTao = item.NgayTao;
                        tinlq.TenNguoiDung = item.NEWS_NguoiSuDung.Ten;
                        tinlq.MaLoaiTin = item.MaLoaiTin;
                        tinlq.LoaiTin = item.NEWS_LoaiTinTuc.Ten;
                        tinlq.LuotXem = item.LuotXem;
                        tinlq.HinhAnh = item.HinhAnh;
                        tinLQ.Add(tinlq);
                    }
                    tin.TinLienQuan = tinLQ;
                }
                return Ok(tin);
            }
            return Ok(tin);
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
