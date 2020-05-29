using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAMS.Models
{
    public class VanBanViewModel
    {
        public int ID { get; set; }
        public string OrganId { get; set; }
        public int FileCatalog { get; set; }
        public string FileNotation { get; set; }
        public int DocOrdinal { get; set; }
        public string TypeName { get; set; }
        public string CodeNumber { get; set; }
        public string CodeNotation { get; set; }
        public Nullable<System.DateTime> IssuedDate { get; set; }
        public string OrganName { get; set; }
        public string Subject { get; set; }
        public string Language { get; set; }
        public int PageAmount { get; set; }
        public string Description { get; set; }
        public string Position { get; set; }
        public string Fullname { get; set; }
        public Nullable<int> Priority { get; set; }
        public Nullable<int> IssuedAmount { get; set; }
        public Nullable<System.DateTime> DueDate { get; set; }
        public int SoVanBanID { get; set; }
        public string MOREINFO1 { get; set; }
        public string MOREINFO2 { get; set; }
        public string MOREINFO3 { get; set; }
        public string MOREINFO4 { get; set; }
        public string MOREINFO5 { get; set; }
        public List<FileDinhKemViewModel> FileDinhKem { get; set; }
        public int Total { get; set; }
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

    public class NguoiDungViewModel
    {
        public string ID { get; set; }
        public string USERNAME { get; set; }
        public string EMAIL { get; set; }
        public string HOLOT { get; set; }
        public string TEN { get; set; }
        public string CHUCVU { get; set; }
        public string BOPHAN { get; set; }
    }

    public class PhanTrangModel
    {
        public int Start { get; set; }
        public int End { get; set; }
    }

    public class VanBanDenCanBoViewModel
    {
        public int ID { get; set; }
        public int IDVANBAN { get; set; }
        public string CANBO { get; set; }
        public Nullable<System.DateTime> NGAYMO { get; set; }
    }
}