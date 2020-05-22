using OAMS.Database;
using OAMS.Models;
using OAMS.Models.vanbanModel;
using System;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dapper;
using System.Data;

namespace OAMS.Controllers.API
{
    [RoutePrefix("api/QLVanBan")]
    public class QLVanBanAPIController : ApiController
    {
        private readonly string _cnn;
        public QLVanBanAPIController()
        {
            _cnn = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnectionString"].ConnectionString;
        }
        //[HttpGet]
        //[Route("getLoaiVanBan")]
        //public IHttpActionResult getLoaiVanBan(ParamModel par)
        //{
        //    //dbOAMSEntities db = new dbOAMSEntities();
        //    //try
        //    //{
        //    //    var vrs = db.Database.SqlQuery<tbLoaivanban>("SELECT * FROM [dbVanPhongDienTuFull].[doc].[tbLoaivanban]").ToList();

        //    //    return Ok(vrs);
        //    //}
        //    //catch
        //    //{
        //    //    return BadRequest();
        //    //}
        //    using (IDbConnection db = new SqlConnection(_cnn))
        //    {
        //        //var aa = db.Query<TaiLieuModel>(sql);
        //        //return Ok(aa);

        //        var aa = db.Query<TaiLieuModel>("DOC_Get", new { ID = id }, null, true, null, commandType: CommandType.StoredProcedure);

        //        return Ok(aa);
        //    }
        //}

        [HttpGet]
        [Route("getSoVanBan")]
        public IHttpActionResult getSoVanBan()
        {
            string query = "select * from doc.tbSovanban";
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var aa = db.Query<SoVanBanViewModel>(query);
                return Ok(aa);
            }
        }

        [HttpGet]
        [Route("getLoaiVanBan")]
        public IHttpActionResult getLoaiVanBan()
        {
            string query = "select * from doc.tbLoaivanban";
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var aa = db.Query<LoaiVanBanViewModel>(query);
                return Ok(aa);
            }
        }

        [HttpPost]
        [Route("ThemMoiVanBanDen")]
        public IHttpActionResult ThemMoiVanBanDen(vanbanModel par)
        {
            dbOAMSEntities db = new dbOAMSEntities();
            try
            {
                string username = User.Identity.Name;
                var id = db.Database.SqlQuery<decimal>("INSERT INTO doc.tbVanbanden( DOCCODE ,FILECODE,TYPENAME,CODENUMBER,ISSUEDDATE ,LANGUAGE,ORGANNAME,SUBJECT,DESCRIPTION,ARRIVALDATE,PRIORITY,MOREINFO1,ARRIVALNUMBER,FULLNAMESIGNER,POSITIONSIGNER,TOPLACES,MOREINFO2,SOVANBANID)" +
                    "values(@DOCCODE ,@FILECODE,@TYPENAME, @CODENUMBER,@ISSUEDDATE,@LANGUAGE,@ORGANNAME, @SUBJECT,@DESCRIPTION ,@ARRIVALDATE,@PRIORITY,@MOREINFO1,@ARRIVALNUMBER ,@FULLNAMESIGNER,@POSITIONSIGNER  ,@TOPLACES ,@MOREINFO2,1) ; SELECT IDENT_CURRENT('doc.tbVanbanden') AS Current_Identity;",

                   new SqlParameter("@DOCCODE", par.DOCCODE),
                   new SqlParameter("@FILECODE", par.FILECODE.checkIsNull()),
                   new SqlParameter("@TYPENAME", par.TYPENAME.checkIsNull()),
                   new SqlParameter("@CODENUMBER", par.CODENUMBER.checkIsNull()),
                   new SqlParameter("@ISSUEDDATE", par.ISSUEDDATE.checkDateTimeIsNull()),
                   new SqlParameter("@LANGUAGE", par.LANGUAGE.checkIsNull()),
                   new SqlParameter("@ORGANNAME", par.ORGANNAME.checkIsNull()),
                   new SqlParameter("@SUBJECT", par.SUBJECT.checkIsNull()),
                   new SqlParameter("@DESCRIPTION", par.DESCRIPTION.checkIsNull()),
                   new SqlParameter("@ARRIVALDATE", par.ARRIVALDATE.checkDateTimeIsNull()),
                   new SqlParameter("@PRIORITY", par.PRIORITY.checkIsNumber()),
                   new SqlParameter("@MOREINFO1", par.MOREINFO1.checkIsNull()),
                   new SqlParameter("@ARRIVALNUMBER", par.ARRIVALNUMBER.checkIsNull()),
                   new SqlParameter("@FULLNAMESIGNER", par.FULLNAMESIGNER.checkIsNull()),
                   new SqlParameter("@POSITIONSIGNER", par.POSITIONSIGNER.checkIsNull()),
                   new SqlParameter("@TOPLACES", par.TOPLACES.checkIsNull()),

                   new SqlParameter("@MOREINFO2", username)).First();

                return Ok(id);
            }
            catch (Exception ee)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("UploadFiles")]
        public string UploadFiles()
        {
            int iUploadedCnt = 0;

            string sPath = "";

            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/DataFile/");

            //string date = DateTime.Now.Year.ToString();

            //sPath = Path.Combine(sPath, date);

            if (!Directory.Exists(sPath))

            {
                Directory.CreateDirectory(sPath);
            }

            //date = DateTime.Now.Month.ToString();

            //sPath = Path.Combine(sPath, date);

            if (!Directory.Exists(sPath))

            {
                Directory.CreateDirectory(sPath);
            }

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];

                if (hpf.ContentLength > 0)
                {
                    if (!System.IO.File.Exists(sPath + Path.GetFileName(hpf.FileName)))

                    {
                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));

                        iUploadedCnt = iUploadedCnt + 1;

                    }

                    else

                    {
                        FileInfo f = new FileInfo(sPath + Path.GetFileName(hpf.FileName));

                        f.Delete();

                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));

                        iUploadedCnt = iUploadedCnt + 1;
                    }
                }
            }

            if (iUploadedCnt > 0)
            {
                return iUploadedCnt + " Files Uploaded Successfully";
            }
            else

            {
                return "Upload Failed";
            }
        }

        [HttpGet]
        [Route("getviewpdf")]
        public HttpResponseMessage getviewpdf(string fileName)
        {
            //if (id > 0)
            //{
            //    dbFSMEntities db = new dbFSMEntities();
            //    dsFilescanModel result = new dsFilescanModel();
            //    var spath = db.Database.SqlQuery<FilescanPath>("proc_getPathfilescan @idfile",
            //        new SqlParameter("@idfile", id)).First();
            //    if (spath != null)
            //    {
            //        string sDes = "";
            //        string sPath = "";
            //        if (spath.VITRILUUTRU != "")
            //        {
            //            sDes = spath.VITRILUUTRU;
            //            if (!Directory.Exists(sDes))
            //            {
            //                sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/DataFileScan/");
            //            }
            //            else
            //            {
            //                sPath = spath.VITRILUUTRU;
            //            }
            //        }
            //        else
            //        {
            //            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/DataFileScan/");
            //        }
            //        if (spath.MADUAN.IndexOf("~PAT") > 0)
            //        {
            //            sPath = Path.Combine(sPath, spath.GHICHU.Substring(1));
            //        }
            //        else
            //        {
            //            sPath = Path.Combine(sPath, spath.MADUAN, spath.MAPHONG, spath.MUCLUC.ToString(), spath.MAHOSO, spath.GHICHU);
            //        }
            //        var response = new HttpResponseMessage(HttpStatusCode.OK);
            //        var stream = new System.IO.FileStream(sPath, System.IO.FileMode.Open);
            //        response.Content = new StreamContent(stream);
            //        response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
            //        return response;
            //    }
            //}

            //return response;
            string sPath1 = System.Web.Hosting.HostingEnvironment.MapPath("~/DataFile/" + fileName);

            var response1 = new HttpResponseMessage(HttpStatusCode.OK);
            var stream1 = new System.IO.FileStream(sPath1, System.IO.FileMode.Open);
            response1.Content = new StreamContent(stream1);
            response1.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
            return response1;
        }
    }
}