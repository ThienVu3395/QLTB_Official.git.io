//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OAMS.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class BinhLuan
    {
        public int MaBinhLuan { get; set; }
        public int MaTinTuc { get; set; }
        public int MaNguoiDung { get; set; }
        public string NoiDung { get; set; }
        public Nullable<int> MaTrangThai { get; set; }
        public Nullable<System.DateTime> Ngay { get; set; }
        public Nullable<System.TimeSpan> Gio { get; set; }
    
        public virtual NguoiSuDung NguoiSuDung { get; set; }
        public virtual TinTuc TinTuc { get; set; }
        public virtual TrangThaiTinTuc TrangThaiTinTuc { get; set; }
    }
}
