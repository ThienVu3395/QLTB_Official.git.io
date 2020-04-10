using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAMS.Models
{
    public class LoaiTinTucModel
    {
        public int MaLoaiTin { get; set; }
        public string Ten { get; set; }
        public bool? TrangThai { get; set; }
        public int? ThuTuHienThi { get; set; }
        public string Icon { get; set; }
        public int? TemplateList { get;set;}
        public int? TemplateDetail { get; set; }
    }

    public class TinTucModel
    {
        public int MaTinTuc { get; set; }
        public string TieuDe { get; set; }
        public string NoiDung { get; set; }
        public string MoTa { get; set; }
        public Nullable<int> MaLoaiTin { get; set; }
        public string LoaiTin { get; set; }
        public string HinhNguoiDung { get; set; }
        public int NguoiTao { get; set; }
        public Nullable<System.DateTime> NgayTao { get; set; }
        public string NguoiCapNhat { get; set; }
        public Nullable<System.DateTime> NgayCapNhat { get; set; }
        public int? LuotXem { get; set; }
        public Nullable<bool> HienThi { get; set; }
        public Nullable<bool> TinNoiBat { get; set; }
        public List<BinhLuanModel> BinhLuan { get; set; }
        public string HinhAnh { get; set; }
        public int CountTin { get; set; }
        public List<TapTinModel> TapTinDinhKem { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public DateTime? NgayHetHanTinMoi { get; set; }
        public DateTime? NgayHetHanTrangChu { get; set; }
        public int? TemplateList { get; set; }
        public int? TemplateDetail { get; set; }
        public List<TinTucModel> TinLienQuan { get; set; }
        public List<TinTucModel> TinCuHon { get; set; }
    }

    public class NguoiDungModel
    {
        public int MaNguoiDung { get; set; }
        public string Ten { get; set; }
        public int MaPhongBan { get; set; }
        public string PhongBan { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ChucVu { get; set; }
        public Nullable<int> NgaySinh { get; set; }
        public Nullable<int> ThangSinh { get; set; }
        public Nullable<int> NamSinh { get; set; }
        public string HinhAnh { get; set; }
    }

    public class TapTinModel
    {
        public int MaTapTin { get; set; }
        public string Ten { get; set; }
        public string Url { get; set; }
    }

    public class BinhLuanModel
    {
        public int MaBinhLuan { get; set; }
        public int MaTinTuc { get; set; }
        public int MaNguoiDung { get; set; }
        public string TenNguoiDung { get; set; }
        public string HinhAnh { get; set; }
        public string DonVi { get; set; }
        public string NoiDung { get; set; }
        public Nullable<Boolean> HienThi { get; set; }
        public Nullable<System.DateTime> Ngay { get; set; }
        public Nullable<System.TimeSpan> Gio { get; set; }
    }
}