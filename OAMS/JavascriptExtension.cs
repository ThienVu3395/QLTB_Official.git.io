using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;

namespace OAMS
{
    public static class JavascriptExtension
    {
        public static MvcHtmlString IncludeVersionedJs(this HtmlHelper helper, string filename)
        {
            string version = GetVersion(helper, filename);
            return MvcHtmlString.Create("<script type='text/javascript' src='" + version + "'></script>");
        }
        private static string GetVersion(this HtmlHelper helper, string filename)
        {
            var context = helper.ViewContext.RequestContext.HttpContext;
            if (context.Cache[filename] == null)
            {
                var physicalPath = context.Server.MapPath(filename);
                var version = string.Format("{1}?v={0}", new System.IO.FileInfo(physicalPath).LastWriteTime.ToString("MMddHHmmss"), System.Web.VirtualPathUtility.ToAbsolute(filename));
                context.Cache.Add(filename, version, null,
                  DateTime.Now.AddMinutes(5), TimeSpan.Zero,
                  CacheItemPriority.Normal, null);
                return version;
            }
            else
            {
                return context.Cache[filename] as string;
            }
        }
    }
}