using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAMS.Models
{
    public class VanBanViewModel
    {
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
}