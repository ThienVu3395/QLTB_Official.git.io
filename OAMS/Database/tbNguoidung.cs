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
    
    public partial class tbNguoidung
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbNguoidung()
        {
            this.NEWS_BinhLuan = new HashSet<NEWS_BinhLuan>();
        }
    
        public string ID { get; set; }
        public string USERNAME { get; set; }
        public string EMAIL { get; set; }
        public string HOLOT { get; set; }
        public string TEN { get; set; }
        public System.DateTime NGAYTAO { get; set; }
        public bool KHOA { get; set; }
        public string CHUCVU { get; set; }
        public string BOPHAN { get; set; }
        public string UYQUYEN { get; set; }
        public Nullable<System.DateTime> NGAYUQ { get; set; }
        public Nullable<System.DateTime> KETTHUCUQ { get; set; }
        public bool HANCHE { get; set; }
        public string FILEANH { get; set; }
    
        public virtual tbBophan tbBophan { get; set; }
        public virtual tbChucvu tbChucvu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NEWS_BinhLuan> NEWS_BinhLuan { get; set; }
    }
}
