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
    
    public partial class tbFiledinhkem
    {
        public int ID { get; set; }
        public int LOAI { get; set; }
        public int VANBANID { get; set; }
        public string TENFILE { get; set; }
        public string MOTA { get; set; }
        public Nullable<System.DateTime> NGAYTAO { get; set; }
        public Nullable<bool> TRANGTHAI { get; set; }
        public string LOAIFILE { get; set; }
        public Nullable<int> SIZEFILE { get; set; }
        public Nullable<int> VITRIID { get; set; }
    }
}
