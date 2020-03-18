using OAMS.Database;
using OAMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAuthBNLE.DataLogin
{
    public static class Nhatkyhethong
    {
        public static void insertLog(string username, string thaotac, int loai)
        {
            //AIMS.DataControl.dbAIMSEntities obj = new AIMS.DataControl.dbAIMSEntities();
            //AIMS.DataControl.tbNhatkyhethong log = new DataControl.tbNhatkyhethong();
            //log.LOAI = loai;
            //log.NGAYTHAOTHAC = DateTime.Now;
            //log.THAOTAC = thaotac;
            //log.USERNAME = username;
            //obj.tbNhatkyhethongs.Add(log);
            //obj.SaveChanges();
        }
        public static List<tbChucnangModel> getchucnang(string username)
        {
            dbOAMSEntities db = new dbOAMSEntities();
            if (username == "Administrator")
            {
                var i = db.Database.SqlQuery<tbChucnangModel>("select * from [adm].[tbChucnang] ").ToList();
                return i;
            }
            else
            {
                var i = db.Database.SqlQuery<tbChucnangModel>("select distinct c.* from [adm].[tbChucnang] c join [users].[tbNhom_Chucnang] g on g.CHUCNANGID = c.ID and g.ALLACTION = 1 " +
                " join [users].[tbNhom_Users] n on g.MANHOM = n.MANHOM join [users].[tbNguoidung] u on u.USERNAME = n.USERNAME " +
                " where u.USERNAME = @username",
                new System.Data.SqlClient.SqlParameter("@username", username)).ToList();
                return i;
            }

        }
        public static List<tbNhomChucnangModel> getnhomchucnang(string username)
        {
            dbOAMSEntities db = new dbOAMSEntities();
            var i = db.Database.SqlQuery<tbNhomChucnangModel>("select * from [adm].[tbNhomchucnang] order by THUTU ").ToList();
            return i;

        }
        public static bool checkfunctiongroup(System.Web.SessionState.HttpSessionState session, string username, int funname)
        {
            string sessname = username + "chucnang";
            List<tbChucnangModel> fun = new List<tbChucnangModel>();
            if (session[sessname] == null)
            {
                fun = Nhatkyhethong.getchucnang(username);
                session[sessname] = fun;
            }
            else
            {
                fun = (List<tbChucnangModel>)session[sessname];
            }
            var c = from i in fun where i.ID == funname select i;
            if (c.Count() > 0)
                return true;
            else return false;
        }
    }
}