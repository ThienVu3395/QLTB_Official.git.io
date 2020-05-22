using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAMS.Models.vanbanModel
{
    public class vanbanModel
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
    }
}