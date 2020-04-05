using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAMS.Models
{
    public class TinTucViewModel
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
        public string HinhAnh { get; set; }
        public int CountTin { get; set; }
        public List<TapTinModel> TapTinDinhKem { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public DateTime? NgayHetHanTinMoi { get; set; }
        public DateTime? NgayHetHanTrangChu { get; set; }
        public int? TemplateList { get; set; }
        public int? TemplateDetail { get; set; }
        public List<TinTucModel> TinLienQuan { get; set; }
    }
}