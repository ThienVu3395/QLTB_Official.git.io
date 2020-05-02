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
    
    public partial class NEWSTUONG_BaiViet
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NEWSTUONG_BaiViet()
        {
            this.NEWS_BinhLuan = new HashSet<NEWS_BinhLuan>();
            this.NEWSTUONG_TinDinhKem = new HashSet<NEWSTUONG_TinDinhKem>();
        }
    
        public int PostId { get; set; }
        public Nullable<int> ParentId { get; set; }
        public Nullable<int> GroupId { get; set; }
        public Nullable<int> ReplyToId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public Nullable<int> TotalReplies { get; set; }
        public Nullable<int> TotalView { get; set; }
        public Nullable<int> CreatedUserId { get; set; }
        public string CreatedUser { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string LastPost { get; set; }
        public Nullable<int> LastPostId { get; set; }
        public Nullable<System.DateTime> LastUpdated { get; set; }
        public Nullable<int> LastUpdatedUserId { get; set; }
        public string LastUpdatedUser { get; set; }
        public string Status { get; set; }
        public Nullable<bool> IsApproved { get; set; }
        public Nullable<bool> IsFavorit { get; set; }
        public Nullable<int> ShareID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NEWS_BinhLuan> NEWS_BinhLuan { get; set; }
        public virtual NEWS_NguoiSuDung NEWS_NguoiSuDung { get; set; }
        public virtual NEWS_NguoiSuDung NEWS_NguoiSuDung1 { get; set; }
        public virtual NEWSTUONG_NhomTinTuong NEWSTUONG_NhomTinTuong { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NEWSTUONG_TinDinhKem> NEWSTUONG_TinDinhKem { get; set; }
    }
}
