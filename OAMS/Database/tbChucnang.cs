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
    
    public partial class tbChucnang
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbChucnang()
        {
            this.tbNhom_Chucnang = new HashSet<tbNhom_Chucnang>();
        }
    
        public int ID { get; set; }
        public Nullable<int> NHOMID { get; set; }
        public string TENCHUCNANG { get; set; }
        public string LINKS { get; set; }
        public Nullable<int> THUTU { get; set; }
    
        public virtual tbNhomchucnang tbNhomchucnang { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbNhom_Chucnang> tbNhom_Chucnang { get; set; }
    }
}
