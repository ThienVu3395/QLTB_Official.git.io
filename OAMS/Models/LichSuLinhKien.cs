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
    
    public partial class LichSuLinhKien
    {
        public int MaLinhKien { get; set; }
        public int MaTinhTrang { get; set; }
        public Nullable<System.DateTime> Ngay { get; set; }
        public Nullable<decimal> ChiPhi { get; set; }
    
        public virtual LinhKien LinhKien { get; set; }
        public virtual TinhTrang TinhTrang { get; set; }
    }
}
