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
    [RoutePrefix("api/userinfo")]
    public class GetUserInfoController : ApiController
    {
        dbOAMSEntities dbContext = new dbOAMSEntities();

        [HttpPost]
        [Route("getInfoUser")]
        public IHttpActionResult getInfoUser(UserExtension userInfo)
        {
            if (userInfo.username != null)
            {
                var tin = dbContext.tbNguoidungs.Where(x => x.USERNAME == userInfo.username).FirstOrDefault();
                if (tin != null)
                {
                    UserExtension user = new UserExtension();
                    user.HOTEN = tin.HOLOT + " " + tin.TEN;
                    user.FILEHINH = tin.FILEANH;
                    return Ok(user);
                }
            }
            return BadRequest("Có lỗi phát sinh,xin vui lòng thử lại");
        }
    }
}
