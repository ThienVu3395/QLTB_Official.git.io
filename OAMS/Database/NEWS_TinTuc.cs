//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OAMS.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class NEWS_TinTuc
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NEWS_TinTuc()
        {
            this.NEWS_TinTucTapTin = new HashSet<NEWS_TinTucTapTin>();
        }
    
        public int MaTinTuc { get; set; }
        public string TieuDe { get; set; }
        public string NoiDung { get; set; }
        public string MoTa { get; set; }
        public Nullable<int> MaLoaiTin { get; set; }
        public Nullable<int> NguoiTao { get; set; }
        public Nullable<System.DateTime> NgayTao { get; set; }
        public Nullable<System.DateTime> NgayCapNhat { get; set; }
        public Nullable<int> NguoiCapNhat { get; set; }
        public Nullable<int> NguoiDuyet { get; set; }
        public Nullable<System.DateTime> NgayDuyet { get; set; }
        public Nullable<bool> HienThi { get; set; }
        public Nullable<int> LuotXem { get; set; }
        public Nullable<bool> TinNoiBat { get; set; }
        public string HinhAnh { get; set; }
        public Nullable<System.DateTime> NgayHetHan { get; set; }
        public Nullable<System.DateTime> NgayHetHanTinMoi { get; set; }
        public Nullable<System.DateTime> NgayHetHanTrangChu { get; set; }
        public Nullable<bool> Khoa { get; set; }
        public Nullable<int> NguoiKhoa { get; set; }
        public Nullable<System.DateTime> NgayKhoa { get; set; }
        public string DuongDan { get; set; }
        public Nullable<int> NgayDang { get; set; }
        public Nullable<int> ThangDang { get; set; }
        public Nullable<int> NamDang { get; set; }
        public string GhiChu { get; set; }
        public Nullable<bool> ChiaSe { get; set; }
    
        public virtual NEWS_LoaiTinTuc NEWS_LoaiTinTuc { get; set; }
        public virtual NEWS_NguoiSuDung NEWS_NguoiSuDung { get; set; }
        public virtual NEWS_NguoiSuDung NEWS_NguoiSuDung1 { get; set; }
        public virtual NEWS_NguoiSuDung NEWS_NguoiSuDung2 { get; set; }
        public virtual NEWS_NguoiSuDung NEWS_NguoiSuDung3 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NEWS_TinTucTapTin> NEWS_TinTucTapTin { get; set; }
    }
}
