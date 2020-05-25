using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAMS.Models
{
    public class VanBanViewModel
    {
        public int ID { get; set; }
        public string DOCCODE { get; set; }
        public string FILECODE { get; set; }
        public Nullable<short> DOCORDINAL { get; set; }
        public string TYPENAME { get; set; }
        public string CODENUMBER { get; set; }
        public string CODENOTATION { get; set; }
        public Nullable<System.DateTime> ISSUEDDATE { get; set; }
        public string ORGANNAME { get; set; }
        public string SUBJECT { get; set; }
        public string LANGUAGE { get; set; }
        public Nullable<short> PAGEMOUNT { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<System.DateTime> ARRIVALDATE { get; set; }
        public string ARRIVALNUMBER { get; set; }
        public string POSITIONSIGNER { get; set; }
        public string FULLNAMESIGNER { get; set; }
        public Nullable<int> PRIORITY { get; set; }
        public string TOPLACES { get; set; }
        public string TRACEHEADER { get; set; }
        public Nullable<System.DateTime> DUEDATE { get; set; }
        public int SOVANBANID { get; set; }
        public string MOREINFO1 { get; set; }
        public string MOREINFO2 { get; set; }
        public string MOREINFO3 { get; set; }
        public string MOREINFO4 { get; set; }
        public string MOREINFO5 { get; set; }
        public List<FileDinhKemViewModel> FileDinhKem { get; set; }
    }

    public class SoVanBanViewModel
    {
        public int ID { get; set; }
        public string TENSO { get; set; }
        public string KYHIEU { get; set; }
        public string DONVIID { get; set; }
        public string LOAIVB { get; set; }
        public string GHICHU { get; set; }
        public Nullable<int> LOAI { get; set; }
        public Nullable<int> VITRILUU { get; set; }
    }

    public class LoaiVanBanViewModel
    {
        public string MALOAI { get; set; }
        public string TENLOAI { get; set; }
        public string GHICHU { get; set; }
    }

    public class FileDinhKemViewModel
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