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
    
    public partial class tbLoaiDM
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbLoaiDM()
        {
            this.tbDanhmucs = new HashSet<tbDanhmuc>();
        }
    
        public string LOAIDM { get; set; }
        public string TENDM { get; set; }
        public bool DMHETHONG { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbDanhmuc> tbDanhmucs { get; set; }
    }
}
