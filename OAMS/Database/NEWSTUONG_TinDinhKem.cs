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
    
    public partial class NEWSTUONG_TinDinhKem
    {
        public int FileId { get; set; }
        public string FileName { get; set; }
        public string FileSize { get; set; }
        public string OriginalFilename { get; set; }
        public Nullable<int> GroupId { get; set; }
        public Nullable<int> PostId { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
    
        public virtual NEWS_NguoiSuDung NEWS_NguoiSuDung { get; set; }
        public virtual NEWSTUONG_NhomTinTuong NEWSTUONG_NhomTinTuong { get; set; }
        public virtual NEWSTUONG_BaiViet NEWSTUONG_BaiViet { get; set; }
    }
}
