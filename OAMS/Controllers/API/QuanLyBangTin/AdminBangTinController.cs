using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OAMS.Models;
using OAMS.Database;
using System.IO;
using System.Data.Entity;
using System.Globalization;
using System.Web;


namespace OAMS.Controllers.API.QuanLyBangTin
{
    [RoutePrefix("API/AdminBangTin/")]
    public class AdminBangTinController : ApiController
    {
        dbOAMSEntities dbContext = new dbOAMSEntities();
    }
}
