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
    
    public partial class tbNhom_Chucnang
    {
        public int ID { get; set; }
        public string MANHOM { get; set; }
        public int CHUCNANGID { get; set; }
        public bool ALLACTION { get; set; }
        public bool XEM { get; set; }
        public bool THEM { get; set; }
        public bool XOA { get; set; }
        public bool SUA { get; set; }
    
        public virtual tbChucnang tbChucnang { get; set; }
        public virtual tbNhom tbNhom { get; set; }
    }
}
