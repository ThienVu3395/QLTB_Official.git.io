using Microsoft.Office.Interop.Word;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;

namespace OAMS
{
    public static class SYSTEM
    {

        public static void ConvertWordtoPDF(string sPath)
        {
            Microsoft.Office.Interop.Word.Application word = new Microsoft.Office.Interop.Word.Application();

            object oMissing = System.Reflection.Missing.Value;
            FileInfo wordFile = new FileInfo(sPath);
            word.Visible = false;
            word.ScreenUpdating = false;


            Object filename = (Object)wordFile.FullName;

            Document doc = word.Documents.Open(ref filename, ref oMissing,
                ref oMissing, ref oMissing, ref oMissing, ref oMissing, ref oMissing,
                ref oMissing, ref oMissing, ref oMissing, ref oMissing, ref oMissing,
                ref oMissing, ref oMissing, ref oMissing, ref oMissing);
            doc.Activate();

            object outputFileName = wordFile.FullName.Replace(".docx", ".pdf");
            object fileFormat = WdSaveFormat.wdFormatPDF;

            doc.SaveAs(ref outputFileName,
                ref fileFormat, ref oMissing, ref oMissing,
                ref oMissing, ref oMissing, ref oMissing, ref oMissing,
                ref oMissing, ref oMissing, ref oMissing, ref oMissing,
                ref oMissing, ref oMissing, ref oMissing, ref oMissing);

            object saveChanges = WdSaveOptions.wdDoNotSaveChanges;
            ((_Document)doc).Close(ref saveChanges, ref oMissing, ref oMissing);
            doc = null;
            ((_Application)word).Quit(ref oMissing, ref oMissing, ref oMissing);
            word = null;
        }
        /// <summary>
        /// conver string to int
        /// </summary>
        /// <param name="str">string </param>
        /// <returns> int </returns>
        public static int ToInt(this string str)
        {
            int number = 0;
            try
            {
                int.TryParse(str, out number);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return number;
        }

        public static int ToInt(this decimal str)
        {
            int number = 0;
            try
            {
                number = Convert.ToInt32(str);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return number;
        }

        /// <summary>
        ///  check for must is Number
        /// </summary>
        /// <param name="str">string</param>
        /// <returns>boll</returns>
        public static bool IsNumber(this string str)
        {
            int number = 0;
            try
            {
                return int.TryParse(str, out number);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        ///  Convert string to Datetime
        /// </summary>
        /// <param name="str"> - string </param>
        /// <param name="format"> - format </param>
        /// <returns> Datetime </returns>
        public static DateTime ToDateTime(this string str, string format)
        {
            try
            {
                return DateTime.ParseExact(str, format, null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Convert string to Datetime
        /// </summary>
        /// <param name="str"> - string </param>
        /// <returns></returns>
        public static DateTime ToDateTime(this string str)
        {
            try
            {
                DateTime Date;
                DateTime.TryParse(str, out Date);
                return Date;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Check for must is Number Datetime
        /// </summary>
        /// <param name="str"> string </param>
        /// <param name="format"> format</param>
        /// <returns>bool</returns>
        public static bool IsDate(this string str, string format)
        {
            try
            {
                DateTime Date;
                return DateTime.TryParseExact(str, format, new CultureInfo("en-US"), System.Globalization.DateTimeStyles.None, out Date);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Check for must is Number Datetime
        /// </summary>
        /// <param name="str">string</param>
        /// <returns> bool </returns>
        public static bool IsDate(this string str)
        {
            DateTime Date;
            return DateTime.TryParse(str, out Date);
        }

        public static bool ToBoll(this string str)
        {
            try
            {
                bool boll;
                bool.TryParse(str, out boll);
                return boll;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// check string is null or empty
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static bool IsNullorEmpty(this string str)
        {
            try
            {
                if (str == null || str == string.Empty)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string FomatDate(this string str, string format)
        {
            try
            {
                DateTime date = str.ToDateTime();
                return date.ToString(format);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public static string DateToString(DateTime? time, string format)
        {
            try
            {
                return time.HasValue ? time.Value.ToString(format) : "";
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static string TosArrtring(this List<string> list_int)
        {
            string str = "";
            list_int.ForEach(x => str += x + ",");
            return str;
        }

        public static string checkIsNull(this string str)
        {
            if (str == null || str == "null")
                return string.Empty;
            else
                return str;
        }

        public static bool checkBoolIsNull(this bool flg)
        {
            if (flg == null)
                return false;
            else
                return flg;
        }
        public static bool checkBoolIsNull(this bool? flg)
        {
            if (flg == null || !flg.HasValue)
                return false;
            else
                return flg.Value;
        }
        public static DateTime checkDateTimeIsNull(this DateTime date)
        {


            if (date == null || date == Convert.ToDateTime("01/01/0001") || date <= Convert.ToDateTime("01/01/1970 00:00:00"))
            {
                return Convert.ToDateTime("1/1/1990");
            }
            else
            {
                System.Globalization.CultureInfo viVN = new System.Globalization.CultureInfo("vi-VN");
                DateTime d1 = Convert.ToDateTime(date, viVN);
                return d1;
            }
        }

        public static DateTime checkDateTimeIsNull(this DateTime? date)
        {


            if (date == null || !date.HasValue)
            {
                return Convert.ToDateTime("1/1/1990");
            }
            else
            {
                System.Globalization.CultureInfo viVN = new System.Globalization.CultureInfo("vi-VN");
                DateTime d1 = Convert.ToDateTime(date.Value, viVN);
                return d1;
            }
        }

        public static int checkIsNumber(this int i)
        {
            if (i == null)
            {
                return 0;
            }
            return i;
        }
        public static int checkIsNumber(this int? i)
        {
            if (i == null || !i.HasValue)
            {
                return 0;
            }
            return i.Value;
        }
        public static string GetFileExtension(this string fileName)
        {
            string ext = string.Empty;
            int fileExtPos = fileName.LastIndexOf(".", StringComparison.Ordinal);
            if (fileExtPos >= 0)
                ext = fileName.Substring(fileExtPos, fileName.Length - fileExtPos);

            return ext;
        }
        //public static DataTable ToDataTable<T>(this IEnumerable<T> collection)
        //{
        //    DataTable newDataTable = new DataTable();
        //    Type impliedType = typeof(T);
        //    PropertyInfo[] _propInfo = impliedType.GetProperties();
        //    foreach (PropertyInfo pi in _propInfo)
        //        newDataTable.Columns.Add(pi.Name, pi.PropertyType);

        //    foreach (T item in collection)
        //    {
        //        DataRow newDataRow = newDataTable.NewRow();
        //        newDataRow.BeginEdit();
        //        foreach (PropertyInfo pi in _propInfo)
        //            newDataRow[pi.Name] = pi.GetValue(item, null);
        //        newDataRow.EndEdit();
        //        newDataTable.Rows.Add(newDataRow);
        //    }
        //    return newDataTable;
        //}

        #region VietnameseSigns
        private static readonly string[] VietnameseSigns = new string[]
            {

            "aAeEoOuUiIdDyY",

            "áàạảãâấầậẩẫăắằặẳẵ",

            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",

            "éèẹẻẽêếềệểễ",

            "ÉÈẸẺẼÊẾỀỆỂỄ",

            "óòọỏõôốồộổỗơớờợởỡ",

            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",

            "úùụủũưứừựửữ",

            "ÚÙỤỦŨƯỨỪỰỬỮ",

            "íìịỉĩ",

            "ÍÌỊỈĨ",

            "đ",

            "Đ",

            "ýỳỵỷỹ",

            "ÝỲỴỶỸ"

            };


        /// <summary>
        /// Remove Sign Vietnamese String
        /// </summary>
        /// <param name="str"> string</param>
        /// <returns> string </returns>
        public static string RemoveSignVietnameseString(this string str)
        {
            try
            {
                for (int i = 1; i < VietnameseSigns.Length; i++)
                {
                    for (int j = 0; j < VietnameseSigns[i].Length; j++)
                        str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
                }
                return str;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion

        //#region PASSWORD
        //public static string ENCRYPT(this string ClearText)
        //{
        //    byte[] clearData = Encoding.Unicode.GetBytes(ClearText);
        //    PasswordDeriveBytes bytes = new PasswordDeriveBytes("SUMISU", new byte[] { 0x49, 0x76, 0x61, 110, 0x20, 0x4d, 0x65, 100, 0x76, 0x65, 100, 0x65, 0x76 });
        //    return Convert.ToBase64String(Encrypt(clearData, bytes.GetBytes(0x20), bytes.GetBytes(0x10)));
        //}

        //public static byte[] Encrypt(byte[] ClearData, byte[] Key, byte[] IV)
        //{
        //    MemoryStream stream = new MemoryStream();
        //    Rijndael rijndael = Rijndael.Create();
        //    rijndael.Key = Key;
        //    rijndael.IV = IV;
        //    CryptoStream stream2 = new CryptoStream(stream, rijndael.CreateEncryptor(), CryptoStreamMode.Write);
        //    stream2.Write(ClearData, 0, ClearData.Length);
        //    stream2.Close();
        //    return stream.ToArray();
        //}

        //public static string EncryptDms(this string str)
        //{
        //    return FormsAuthentication.HashPasswordForStoringInConfigFile(str, "SHA1");
        //}
        //#endregion
    }
}