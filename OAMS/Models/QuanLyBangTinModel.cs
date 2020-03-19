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
    }

    public class TinTucModel
    {
        public int MaTinTuc { get; set; }
        public string TieuDe { get; set; }
        public string NoiDung { get; set; }
        public string MoTa { get; set; }
        public Nullable<int> MaLoaiTin { get; set; }
        public string TacGia { get; set; }
        public Nullable<System.DateTime> NgayTao { get; set; }
        public Nullable<System.DateTime> NgayCapNhat { get; set; }
        public string NguoiCapNhat { get; set; }
        public Nullable<bool> HienThi { get; set; }
        public Nullable<bool> TinNoiBat { get; set; }
        public List<BinhLuanModel> BinhLuan { get; set; }
    }

    public class BinhLuanModel
    {
        public int MaBinhLuan { get; set; }
        public int MaTinTuc { get; set; }
        public int MaNguoiDung { get; set; }
        public string TenNguoiDung { get; set; }
        public string DonVi { get; set; }
        public string NoiDung { get; set; }
        public Nullable<int> MaTrangThai { get; set; }
        public Nullable<System.DateTime> Ngay { get; set; }
        public Nullable<System.TimeSpan> Gio { get; set; }
    }
}