//using OAMS.Database;
using Dapper;
using OAMS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

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

        //[HttpPost]
        //[Route("ThemMoiVanBanDen")]
        //public IHttpActionResult ThemMoiVanBanDen(vanbanModel par)
        //{
        //    dbOAMSEntities db = new dbOAMSEntities();
        //    try
        //    {
        //        string username = User.Identity.Name;
        //        var id = db.Database.SqlQuery<decimal>("INSERT INTO doc.tbVanbanden( DOCCODE ,FILECODE,TYPENAME,CODENUMBER,ISSUEDDATE ,LANGUAGE,ORGANNAME,SUBJECT,DESCRIPTION,ARRIVALDATE,PRIORITY,MOREINFO1,ARRIVALNUMBER,FULLNAMESIGNER,POSITIONSIGNER,TOPLACES,MOREINFO2,SOVANBANID)" +
        //            "values(@DOCCODE ,@FILECODE,@TYPENAME, @CODENUMBER,@ISSUEDDATE,@LANGUAGE,@ORGANNAME, @SUBJECT,@DESCRIPTION ,@ARRIVALDATE,@PRIORITY,@MOREINFO1,@ARRIVALNUMBER ,@FULLNAMESIGNER,@POSITIONSIGNER  ,@TOPLACES ,@MOREINFO2,1) ; SELECT IDENT_CURRENT('doc.tbVanbanden') AS Current_Identity;",

        //           new SqlParameter("@DOCCODE", par.DOCCODE),
        //           new SqlParameter("@FILECODE", par.FILECODE.checkIsNull()),
        //           new SqlParameter("@TYPENAME", par.TYPENAME.checkIsNull()),
        //           new SqlParameter("@CODENUMBER", par.CODENUMBER.checkIsNull()),
        //           new SqlParameter("@ISSUEDDATE", par.ISSUEDDATE.checkDateTimeIsNull()),
        //           new SqlParameter("@LANGUAGE", par.LANGUAGE.checkIsNull()),
        //           new SqlParameter("@ORGANNAME", par.ORGANNAME.checkIsNull()),
        //           new SqlParameter("@SUBJECT", par.SUBJECT.checkIsNull()),
        //           new SqlParameter("@DESCRIPTION", par.DESCRIPTION.checkIsNull()),
        //           new SqlParameter("@ARRIVALDATE", par.ARRIVALDATE.checkDateTimeIsNull()),
        //           new SqlParameter("@PRIORITY", par.PRIORITY.checkIsNumber()),
        //           new SqlParameter("@MOREINFO1", par.MOREINFO1.checkIsNull()),
        //           new SqlParameter("@ARRIVALNUMBER", par.ARRIVALNUMBER.checkIsNull()),
        //           new SqlParameter("@FULLNAMESIGNER", par.FULLNAMESIGNER.checkIsNull()),
        //           new SqlParameter("@POSITIONSIGNER", par.POSITIONSIGNER.checkIsNull()),
        //           new SqlParameter("@TOPLACES", par.TOPLACES.checkIsNull()),

        //           new SqlParameter("@MOREINFO2", username)).First();

        //        return Ok(id);
        //    }
        //    catch (Exception ee)
        //    {
        //        return BadRequest();
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

        [HttpGet]
        [Route("getVanBanDen_CanBo")]
        public IHttpActionResult getVanBanDen_CanBo(string CANBO)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@CANBO", CANBO);
            string query = "select t1.*,t2.CANBO,t2.NGAYMO from doc.tbVanbanden t1 inner join doc.tbVBdenCanbo t2 on t1.ID = t2.IDVANBAN and t2.CANBO = @CANBO";
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var aa = db.Query<VanBanViewModel>(query, parameters).ToList();
                if (aa.Count > 0)
                {
                    foreach (var item in aa)
                    {
                        var pr = new DynamicParameters();
                        pr.Add("@ID", item.ID);
                        string qr = "select * from doc.tbFiledinhkem where VANBANID = @ID";
                        var bb = db.Query<FileDinhKemViewModel>(qr, pr).ToList();
                        item.FileDinhKem = bb;

                        var pr2 = new DynamicParameters();
                        pr2.Add("@ID", item.ID);
                        string qr2 = "select * from doc.tbVBdenCanbo where IDVANBAN = @ID";
                        var cc = db.Query<VanBanDenCanBoViewModel>(qr2, pr2).ToList();
                        List<NguoiDungViewModel> ds = new List<NguoiDungViewModel>();
                        if (cc.Count > 0)
                        {
                            foreach (var i in cc)
                            {
                                var pr3 = new DynamicParameters();
                                pr3.Add("@CANBO", i.CANBO);
                                string qr3 = "select * from users.tbNguoidung where USERNAME = @CANBO";
                                var dd = db.Query<NguoiDungViewModel>(qr3, pr3).SingleOrDefault();
                                ds.Add(dd);
                            }
                        }
                        item.NguoiThamGia = ds;

                        var pr4 = new DynamicParameters();
                        pr4.Add("@ID", item.SoVanBanID);
                        string qr4 = "select * from doc.tbSovanban where ID = @ID";
                        var ee = db.Query<SoVanBanViewModel>(qr4, pr4).SingleOrDefault();
                        item.TENSO = ee.TENSO;
                        item.DaXem = item.NGAYMO != null ? 1 : 0;
                    }
                }
                return Ok(aa);
            }
        }

        [HttpPost]
        [Route("getVanBanDen_Admin")]
        public IHttpActionResult getVanBanDen_Admin(PhanTrangModel phanTrang)
        {
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Start", phanTrang.Start);
                parameters.Add("@End", phanTrang.End);
                var aa = db.Query<VanBanViewModel>("procPhanTrang_Loc", parameters, null, true, null, System.Data.CommandType.StoredProcedure).ToList();
                if (aa.Count > 0)
                {
                    foreach (var item in aa)
                    {
                        var pr = new DynamicParameters();
                        pr.Add("@ID", item.ID);
                        string qr = "select * from doc.tbFiledinhkem where VANBANID = @ID";
                        var bb = db.Query<FileDinhKemViewModel>(qr, pr).ToList();
                        item.FileDinhKem = bb;

                        var pr2 = new DynamicParameters();
                        pr2.Add("@ID", item.ID);
                        string qr2 = "select * from doc.tbVBdenCanbo where IDVANBAN = @ID";
                        var cc = db.Query<VanBanDenCanBoViewModel>(qr2, pr2).ToList();
                        List<NguoiDungViewModel> ds = new List<NguoiDungViewModel>();
                        if (cc.Count > 0)
                        {
                            foreach (var i in cc)
                            {
                                var pr3 = new DynamicParameters();
                                pr3.Add("@CANBO", i.CANBO);
                                string qr3 = "select * from users.tbNguoidung where USERNAME = @CANBO";
                                var dd = db.Query<NguoiDungViewModel>(qr3, pr3).SingleOrDefault();
                                ds.Add(dd);
                            }
                        }
                        item.NguoiThamGia = ds;

                        var pr4 = new DynamicParameters();
                        pr4.Add("@ID", item.SoVanBanID);
                        string qr4 = "select * from doc.tbSovanban where ID = @ID";
                        var ee = db.Query<SoVanBanViewModel>(qr4, pr4).SingleOrDefault();
                        item.TENSO = ee.TENSO;
                        item.DaXem = 0;
                    }
                }
                return Ok(aa);
            }
        }

        [HttpGet]
        [Route("getNguoiDung")]
        public IHttpActionResult getNguoiDung()
        {
            string query = "select * from users.tbNguoidung";
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var listVanBan = db.Query<NguoiDungViewModel>(query);
                return Ok(listVanBan);
            }
        }

        [HttpGet]
        [Route("getVanBanDi")]
        public IHttpActionResult getVanBanDi()
        {
            string query = "select * from doc.tbVanbandi";
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var aa = db.Query<LoaiVanBanViewModel>(query);
                return Ok(aa);
            }
        }

        [HttpGet]
        [Route("getListVB")]
        public IHttpActionResult getListVB(string CANBO)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@CANBO", CANBO);
            string query = "select COUNT(ID) as SoLuong from doc.tbVBdenCanbo where CANBO = @CANBO";
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var aa = db.Query<ThongBaoViewModel>(query, parameters);
                return Ok(aa);
            }
        }

        [HttpGet]
        [Route("getDanhMuc")]
        public IHttpActionResult getDanhMuc()
        {
            string query = "select * from adm.tbDanhmuc";
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var aa = db.Query<DanhMucViewModel>(query);
                return Ok(aa);
            }
        }

        [HttpPost]
        [Route("ThemVanBanDen")]
        public IHttpActionResult ThemVanBanDen(VanBanViewModel par)
        {
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@OrganId", par.OrganId);
                parameters.Add("@FileCatalog", par.FileCatalog);
                parameters.Add("@FileNotation", par.FileNotation);
                parameters.Add("@DocOrdinal", par.DocOrdinal);
                parameters.Add("@TypeName", par.TypeName);
                parameters.Add("@CodeNumber", par.CodeNumber);
                parameters.Add("@CodeNotation", par.CodeNotation);
                parameters.Add("@IssuedDate", par.IssuedDate);
                parameters.Add("@OrganName", par.OrganName);
                parameters.Add("@Subject", par.Subject);
                parameters.Add("@Language", par.Language);
                parameters.Add("@PageAmount", 1);
                parameters.Add("@Description", par.Description);
                parameters.Add("@Position", par.Position);
                parameters.Add("@Fullname", par.Fullname);
                parameters.Add("@Priority", par.Priority);
                parameters.Add("@IssuedAmount", par.IssuedAmount);
                parameters.Add("@DueDate", par.DueDate);
                parameters.Add("@SoVanBanID", par.SoVanBanID);
                parameters.Add("@MOREINFO1", par.MOREINFO1);
                parameters.Add("@MOREINFO2", par.MOREINFO2);
                parameters.Add("@MOREINFO3", par.MOREINFO3);
                parameters.Add("@MOREINFO4", par.MOREINFO4);
                parameters.Add("@MOREINFO5", par.MOREINFO5);

                if (db.State == System.Data.ConnectionState.Closed)
                {
                    db.Open();
                }

                var returnV = db.Query<VanBanViewModel>("procThemVanBanDen", parameters, null, true, null, System.Data.CommandType.StoredProcedure).SingleOrDefault();
                if (par.FileDinhKem.Count > 0)
                {
                    foreach (var item in par.FileDinhKem)
                    {
                        var param = new DynamicParameters();
                        param.Add("@LOAI", item.LOAI);
                        param.Add("@VANBANID", returnV.ID);
                        param.Add("@TENFILE", item.TENFILE);
                        param.Add("@MOTA", item.MOTA);
                        param.Add("@NGAYTAO", DateTime.Now);
                        param.Add("@TRANGTHAI", true);
                        param.Add("@LOAIFILE", item.LOAIFILE);
                        param.Add("@SIZEFILE", item.SIZEFILE);
                        param.Add("@VITRIID", item.VITRIID);

                        if (db.State == System.Data.ConnectionState.Closed)
                        {
                            db.Open();
                        }

                        db.Execute("procThemFileDinhKem", param, null, null, System.Data.CommandType.StoredProcedure);
                    }
                }
                return Ok("Thêm Văn Bản Thành Công");
            }
        }

        [HttpPost]
        [Route("PhanTrang")]
        public IHttpActionResult PhanTrang(PhanTrangModel par)
        {
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Start", par.Start);
                parameters.Add("@End", par.End);

                if (db.State == System.Data.ConnectionState.Closed)
                {
                    db.Open();
                }

                var returnV = db.Query<VanBanViewModel>("procPhanTrang_Loc", parameters, null, true, null, System.Data.CommandType.StoredProcedure);
                return Ok(returnV);
            }
        }

        [HttpPost]
        [Route("UploadFiles")]
        public string UploadFiles()
        {
            int iUploadedCnt = 0;

            string sPath = "";

            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/DataFile/");

            if (!Directory.Exists(sPath))

            {
                Directory.CreateDirectory(sPath);
            }

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

                        if (Path.GetExtension(sPath + hpf.FileName) == ".docx")
                        {
                            SYSTEM.ConvertWordtoPDF(sPath + Path.GetFileName(hpf.FileName));
                        }

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
        [Route("RemoveFile")]
        public string RemoveFile(string fileName)
        {
            string sPath = "";

            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/DataFile/" + fileName);

            string subPatch = System.Web.Hosting.HostingEnvironment.MapPath("~/DataFile/");

            if (System.IO.File.Exists(sPath))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@TENFILE", fileName);

                string query = "select * from doc.tbFiledinhkem where TENFILE = @TENFILE";

                using (IDbConnection db = new SqlConnection(_cnn))
                {
                    var listVanBan = db.Query<FileDinhKemViewModel>(query, parameters).ToList();
                    if (listVanBan.Count == 0)
                    {
                        FileInfo f = new FileInfo(sPath);

                        f.Delete();

                        if (Path.GetExtension(subPatch + fileName) == ".docx")
                        {
                            fileName = fileName.Replace(".docx", ".pdf");

                            FileInfo sf = new FileInfo(subPatch + fileName);

                            sf.Delete();
                        }
                    }
                }
            }
            else

            {
                return "Failed";
            }
            return "Remove Success";
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
            if (Path.GetExtension(fileName) == ".docx")
            {
                fileName = Path.ChangeExtension(fileName, "pdf");
            }
            string sPath1 = System.Web.Hosting.HostingEnvironment.MapPath("~/DataFile/" + fileName);
            var response1 = new HttpResponseMessage(HttpStatusCode.OK);
            var stream1 = new System.IO.FileStream(sPath1, System.IO.FileMode.Open);
            response1.Content = new StreamContent(stream1);
            response1.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
            return response1;
        }

        [HttpPost]
        [Route("GuiVanBanDen")]
        public IHttpActionResult GuiVanBanDen(List<VanBanDenCanBoViewModel> model)
        {
            using (IDbConnection db = new SqlConnection(_cnn))
            {
                if (db.State == System.Data.ConnectionState.Closed)
                {
                    db.Open();
                }
                if (model.Count > 0)
                {
                    foreach (var item in model)
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("@IDVANBAN", item.IDVANBAN);
                        parameters.Add("@CANBO", item.CANBO);
                        parameters.Add("@NGAYMO", item.NGAYMO);
                        string qr = "select * from doc.tbVBdenCanbo where IDVANBAN = @IDVANBAN and CANBO = @CANBO";
                        var aa = db.Query<VanBanDenCanBoViewModel>(qr, parameters).FirstOrDefault();
                        if (aa == null)
                        {
                            db.Execute("procThemVB_CanBo", parameters, null, null, System.Data.CommandType.StoredProcedure);
                        }
                    }
                    return Ok("Gửi Văn Bản Thành Công");
                }
                return BadRequest("Có lỗi,xin vui lòng thử lại");
            }
        }

        [HttpGet]
        [Route("getVB_TheoSo")]
        public IHttpActionResult getVB_TheoSo(int SoVanBanID, int LoaiVB)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(_cnn))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@SOVANBANID", SoVanBanID);
                    parameters.Add("@LoaiVB", LoaiVB);
                    var dsVB = db.Query<VanBanViewModel>("procGetVanBan_TheoSoVB", parameters, null, true, null, System.Data.CommandType.StoredProcedure).ToList();
                    if (dsVB.Count > 0)
                    {
                        foreach (var item in dsVB)
                        {
                            var pr = new DynamicParameters();
                            pr.Add("@ID", item.ID);
                            string qr = "select * from doc.tbFiledinhkem where VANBANID = @ID";
                            var bb = db.Query<FileDinhKemViewModel>(qr, pr).ToList();
                            item.FileDinhKem = bb;

                            var pr2 = new DynamicParameters();
                            pr2.Add("@ID", item.ID);
                            string qr2 = "select * from doc.tbVBdenCanbo where IDVANBAN = @ID";
                            var cc = db.Query<VanBanDenCanBoViewModel>(qr2, pr2).ToList();
                            List<NguoiDungViewModel> ds = new List<NguoiDungViewModel>();
                            if (cc.Count > 0)
                            {
                                foreach (var i in cc)
                                {
                                    var pr3 = new DynamicParameters();
                                    pr3.Add("@CANBO", i.CANBO);
                                    string qr3 = "select * from users.tbNguoidung where USERNAME = @CANBO";
                                    var dd = db.Query<NguoiDungViewModel>(qr3, pr3).SingleOrDefault();
                                    ds.Add(dd);
                                }
                            }
                            item.NguoiThamGia = ds;

                            var pr4 = new DynamicParameters();
                            pr4.Add("@ID", item.SoVanBanID);
                            string qr4 = "select * from doc.tbSovanban where ID = @ID";
                            var ee = db.Query<SoVanBanViewModel>(qr4, pr4).SingleOrDefault();
                            item.TENSO = ee.TENSO;
                        }
                    }
                    return Ok(dsVB);
                }
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                //throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                return BadRequest(exceptionMessage + " " + ex.EntityValidationErrors);
            }
        }

        [HttpPost]
        [Route("getVB_TimKiem")]
        public IHttpActionResult getVB_TimKiem(TimKiemVanBanModel model)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(_cnn))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@FileNotation", model.FileNotation);
                    parameters.Add("@CodeNumber", model.CodeNumber);
                    parameters.Add("@CodeNotation", model.CodeNotation);
                    parameters.Add("@Subject", model.Subject);
                    parameters.Add("@SearchString", model.SearchString);
                    parameters.Add("@LoaiVB", model.LoaiVanBan);
                    var dsVB = db.Query<VanBanViewModel>("procGetVanBan_TimKiem", parameters, null, true, null, System.Data.CommandType.StoredProcedure).ToList();
                    if (dsVB.Count > 0)
                    {
                        foreach (var item in dsVB)
                        {
                            var pr = new DynamicParameters();
                            pr.Add("@ID", item.ID);
                            string qr = "select * from doc.tbFiledinhkem where VANBANID = @ID";
                            var bb = db.Query<FileDinhKemViewModel>(qr, pr).ToList();
                            item.FileDinhKem = bb;

                            var pr2 = new DynamicParameters();
                            pr2.Add("@ID", item.ID);
                            string qr2 = "select * from doc.tbVBdenCanbo where IDVANBAN = @ID";
                            var cc = db.Query<VanBanDenCanBoViewModel>(qr2, pr2).ToList();
                            List<NguoiDungViewModel> ds = new List<NguoiDungViewModel>();
                            if (cc.Count > 0)
                            {
                                foreach (var i in cc)
                                {
                                    var pr3 = new DynamicParameters();
                                    pr3.Add("@CANBO", i.CANBO);
                                    string qr3 = "select * from users.tbNguoidung where USERNAME = @CANBO";
                                    var dd = db.Query<NguoiDungViewModel>(qr3, pr3).SingleOrDefault();
                                    ds.Add(dd);
                                }
                            }
                            item.NguoiThamGia = ds;

                            var pr4 = new DynamicParameters();
                            pr4.Add("@ID", item.SoVanBanID);
                            string qr4 = "select * from doc.tbSovanban where ID = @ID";
                            var ee = db.Query<SoVanBanViewModel>(qr4, pr4).SingleOrDefault();
                            item.TENSO = ee.TENSO;
                        }
                    }
                    return Ok(dsVB);
                }
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                //throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                return BadRequest(exceptionMessage + " " + ex.EntityValidationErrors);
            }
        }

        [HttpPost]
        [Route("getVB_TheoTrangThai")]
        public IHttpActionResult getVB_TheoTrangThai(TimKiemVanBanModel model)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(_cnn))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@LoaiVB", model.LoaiVanBan);
                    parameters.Add("@TrangThai", model.TrangThai);
                    var dsVB = db.Query<VanBanViewModel>("procGetVanBan_TheoTrangThaiXem", parameters, null, true, null, System.Data.CommandType.StoredProcedure).ToList();
                    if (dsVB.Count > 0)
                    {
                        foreach (var item in dsVB)
                        {
                            var pr = new DynamicParameters();
                            pr.Add("@ID", item.ID);
                            string qr = "select * from doc.tbFiledinhkem where VANBANID = @ID";
                            var bb = db.Query<FileDinhKemViewModel>(qr, pr).ToList();
                            item.FileDinhKem = bb;

                            var pr2 = new DynamicParameters();
                            pr2.Add("@ID", item.ID);
                            string qr2 = "select * from doc.tbVBdenCanbo where IDVANBAN = @ID";
                            var cc = db.Query<VanBanDenCanBoViewModel>(qr2, pr2).ToList();
                            List<NguoiDungViewModel> ds = new List<NguoiDungViewModel>();
                            if (cc.Count > 0)
                            {
                                foreach (var i in cc)
                                {
                                    var pr3 = new DynamicParameters();
                                    pr3.Add("@CANBO", i.CANBO);
                                    string qr3 = "select * from users.tbNguoidung where USERNAME = @CANBO";
                                    var dd = db.Query<NguoiDungViewModel>(qr3, pr3).SingleOrDefault();
                                    ds.Add(dd);
                                }
                            }
                            item.NguoiThamGia = ds;

                            var pr4 = new DynamicParameters();
                            pr4.Add("@ID", item.SoVanBanID);
                            string qr4 = "select * from doc.tbSovanban where ID = @ID";
                            var ee = db.Query<SoVanBanViewModel>(qr4, pr4).SingleOrDefault();
                            item.TENSO = ee.TENSO;
                        }
                    }
                    return Ok(dsVB);
                }
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                //throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                return BadRequest(exceptionMessage + " " + ex.EntityValidationErrors);
            }
        }

        [HttpPost]
        [Route("XoaCanBo")]
        public IHttpActionResult XoaCanBo(CommonModel model)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(_cnn))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@USERNAME", model.valstring1);
                    parameters.Add("@ID", model.valint1);
                    string query = "delete from doc.tbVBdenCanbo where IDVANBAN = @ID and CANBO = @USERNAME";
                    db.Execute(query, parameters);
                    return Ok();
                }
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                //throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                return BadRequest(exceptionMessage + " " + ex.EntityValidationErrors);
            }
        }

        [HttpPost]
        [Route("ChuyenVB_SangThongBao")]
        public IHttpActionResult ChuyenVB_SangThongBao(VanBanViewModel model)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(_cnn))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@OrganId", model.OrganId);
                    parameters.Add("@FileCatalog", model.FileCatalog);
                    parameters.Add("@FileNotation", model.FileNotation);
                    parameters.Add("@DocOrdinal", model.DocOrdinal);
                    parameters.Add("@TypeName", model.TypeName);
                    parameters.Add("@CodeNumber", model.CodeNumber);
                    parameters.Add("@CodeNotation", model.CodeNotation);
                    parameters.Add("@IssuedDate", model.IssuedDate);
                    parameters.Add("@OrganName", model.OrganName);
                    parameters.Add("@Subject", model.Subject);
                    parameters.Add("@Language", model.Language);
                    parameters.Add("@PageAmount", model.PageAmount);
                    parameters.Add("@Description", model.Description);
                    parameters.Add("@Position", model.Position);
                    parameters.Add("@Fullname", model.Fullname);
                    parameters.Add("@Priority", model.Priority);
                    parameters.Add("@IssuedAmount", model.IssuedAmount);
                    parameters.Add("@DueDate", model.DueDate);
                    parameters.Add("@SoVanBanID", model.SoVanBanID);
                    parameters.Add("@MOREINFO1", model.MOREINFO1);
                    parameters.Add("@MOREINFO2", model.MOREINFO2);
                    parameters.Add("@MOREINFO3", model.MOREINFO3);
                    parameters.Add("@MOREINFO4", model.MOREINFO4);
                    parameters.Add("@MOREINFO5", model.MOREINFO5);

                    var returnV = db.Query<CommonReturnValueModel>("procChuyenVanBanSangThongBao", parameters, null, true, null, System.Data.CommandType.StoredProcedure).SingleOrDefault();

                    if (model.FileDinhKem.Count > 0)
                    {
                        foreach (var item in model.FileDinhKem)
                        {
                            DynamicParameters param = new DynamicParameters();
                            param.Add("@MaTinTuc", returnV.ID);
                            param.Add("@Ten", item.TENFILE);
                            param.Add("@Url", null);
                            param.Add("@Ngay", DateTime.Now);
                            db.Execute("procThemFileDinhKem_TinTuc", param, null, null, System.Data.CommandType.StoredProcedure);
                        }
                    }
                    DynamicParameters pr = new DynamicParameters();
                    pr.Add("@ID", model.ID);
                    pr.Add("@ReturnV", returnV.ID);
                    string qr = "update doc.tbVanbanden set MOREINFO1 = @ReturnV where ID = @ID";
                    db.Execute(qr,pr);
                    return Ok(returnV.ID);
                }
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                //throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                return BadRequest(exceptionMessage + " " + ex.EntityValidationErrors);
            }
        }
    }
}