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
    
    public partial class NEWS_TinTucTapTin
    {
        public int MaTinTuc { get; set; }
        public int MaTapTin { get; set; }
        public string Ten { get; set; }
        public string Url { get; set; }
        public Nullable<System.DateTime> Ngay { get; set; }
    
        public virtual NEWS_TinTuc NEWS_TinTuc { get; set; }
    }
}
