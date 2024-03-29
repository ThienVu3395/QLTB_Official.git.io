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
    
    public partial class tbVanbanden
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbVanbanden()
        {
            this.tbVBdenCanboes = new HashSet<tbVBdenCanbo>();
            this.tbVBdenWorkflows = new HashSet<tbVBdenWorkflow>();
        }
    
        public int ID { get; set; }
        public string OrganId { get; set; }
        public Nullable<int> FileCatalog { get; set; }
        public string FileNotation { get; set; }
        public Nullable<short> DocOrdinal { get; set; }
        public string TypeName { get; set; }
        public string CodeNumber { get; set; }
        public string CodeNotation { get; set; }
        public Nullable<System.DateTime> IssuedDate { get; set; }
        public string OrganName { get; set; }
        public string Subject { get; set; }
        public string Language { get; set; }
        public Nullable<short> PageAmount { get; set; }
        public string Description { get; set; }
        public string Position { get; set; }
        public string Fullname { get; set; }
        public Nullable<int> Priority { get; set; }
        public Nullable<int> IssuedAmount { get; set; }
        public Nullable<System.DateTime> DueDate { get; set; }
        public Nullable<int> SoVanBanID { get; set; }
        public string MOREINFO1 { get; set; }
        public string MOREINFO2 { get; set; }
        public string MOREINFO3 { get; set; }
        public string MOREINFO4 { get; set; }
        public string MOREINFO5 { get; set; }
    
        public virtual tbSovanban tbSovanban { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbVBdenCanbo> tbVBdenCanboes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbVBdenWorkflow> tbVBdenWorkflows { get; set; }
    }
}
