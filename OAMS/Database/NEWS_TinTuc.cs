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
            this.NEWS_BinhLuan = new HashSet<NEWS_BinhLuan>();
            this.NEWS_TinTucTapTin = new HashSet<NEWS_TinTucTapTin>();
        }
    
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
        public string HinhAnh { get; set; }
        public Nullable<System.DateTime> NgayHetHan { get; set; }
        public Nullable<System.DateTime> NgayHetHanTinMoi { get; set; }
        public Nullable<System.DateTime> NgayHetHanTrangChu { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NEWS_BinhLuan> NEWS_BinhLuan { get; set; }
        public virtual NEWS_LoaiTinTuc NEWS_LoaiTinTuc { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NEWS_TinTucTapTin> NEWS_TinTucTapTin { get; set; }
    }
}
