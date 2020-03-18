using Microsoft.AspNet.SignalR;
using OAMS.Database;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;

namespace OAMS.MyHub
{
    public class EventUser
    {
        public int inttype { get; set; }
        public int intkey { get; set; }
        public int intkey1 { get; set; }
        public string thoigian { get; set; }
        public string soyeucau { get; set; }
        public string strname { get; set; }
    }
    public class UserChat
    {
        public string Name { get; set; }
        public HashSet<string> ConnectionIds { get; set; }
        public string FullName { get; set; }
        public string Fileimage { get; set; }
        public string ID { get; set; }
    }
    public class EventUserModel
    {
        public int ID { get; set; }
        public string SOYC { get; set; }
        public DateTime NGAYYC { get; set; }
        public int IDCT { get; set; }
        public string HOTEN { get; set; }
        public int TypeYC { get; set; }

    }
    public class UserInfo
    {
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Fileimage { get; set; }
    }
    public class DataChatInnit
    {
        public List<EventUser> Notifications { get; set; }
        public List<UserInfo> dataUserOnline { get; set; }
    }
    public class Conversation
    {
        public string Name { get; set; }
        public string content { get; set; }
        public bool status { get; set; }
    }
    public class Conversations
    {
        public string Name { get; set; }
        public List<Conversation> data { get; set; }
    }
    //var bytes = System.Text.Encoding.UTF8.GetBytes(someString);
    //var originalString = System.Text.Encoding.UTF8.GetString(bytes);
    //[Authorize]
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<string, UserChat> Users
        = new ConcurrentDictionary<string, UserChat>();

        public void Hello()
        {
            Clients.All.hello();
        }
        public override System.Threading.Tasks.Task OnConnected()
        {
            string userName = "NoName";
            if (Context.User.Identity.IsAuthenticated)
                userName = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;

            var user = Users.GetOrAdd(userName, _ => new UserChat
            {
                Name = userName,
                ConnectionIds = new HashSet<string>(),
                FullName = "",
                Fileimage = "",
                ID = ""
            });
            dbOAMSEntities db = new dbOAMSEntities();
            lock (user.ConnectionIds)
            {
                if (user.ConnectionIds.Count == 0)
                {

                    var us = (from i in db.tbNguoidungs where i.USERNAME.Equals(userName) && i.KHOA == false select i).FirstOrDefault();
                    if (us != null)
                    {
                        UserInfo result = new UserInfo();
                        result.Name = us.USERNAME;
                        result.FullName = us.HOLOT + " " + us.TEN;
                        result.Fileimage = us.FILEANH;
                        user.Fileimage = us.FILEANH;
                        user.FullName = us.HOLOT + " " + us.TEN;
                        user.ID = us.ID;
                        Clients.Others.userNewconnected(result);
                    }
                }
                user.ConnectionIds.Add(connectionId);
                // TODO: Broadcast the connected user
            }
            //dbAIMSEntities obj = new dbAIMSEntities();
            //int s = 0;
            //int e = CommonAIMS._itemsofpage;
            //var re = obj.Database.SqlQuery<EventUserModel>("proc_getallEvent @username",
            //    new SqlParameter("@username", userName)).ToList();
            DataChatInnit dataUser = new DataChatInnit();
            dataUser.Notifications = new List<EventUser>();
            dataUser.dataUserOnline = new List<UserInfo>();
            foreach (var j in Users)
            {
                string item = j.Value.Name;
                if (userName != item)
                {
                    dataUser.dataUserOnline.Add(new UserInfo()
                    {
                        Name = j.Value.Name,
                        Fileimage = j.Value.Fileimage,
                        FullName = j.Value.FullName
                    });
                }
            }
            //foreach (var d in re)
            //{
            //    ls.Add(new EventUser()
            //    {
            //        intkey = d.ID,
            //        thoigian = d.NGAYYC.ToString("dd/MM/yyyy"),
            //        inttype = d.TypeYC,
            //        soyeucau = d.SOYC,
            //        strname = d.HOTEN,
            //        intkey1 = d.IDCT
            //    });
            //}
            //----------------------------
            //ls.Add(new EventUser() { intkey = 1, inttype = 1, strname = "Aloo" });
            //ls.Add(new EventUser() { intkey = 2, inttype = 2, strname = "Aloo111" });
            return Clients.Caller.onConnected(connectionId, userName, 0, dataUser);
        }
        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {

            string userName = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;
            UserChat user;
            Users.TryGetValue(userName, out user);
            if (user != null)
            {
                lock (user.ConnectionIds)
                {
                    user.ConnectionIds.RemoveWhere(cid => cid.Equals(connectionId));
                    if (!user.ConnectionIds.Any())
                    {
                        UserChat removedUser;
                        Users.TryRemove(userName, out removedUser);
                        Clients.Others.userDisconnected(userName);
                    }
                }
            }
            return base.OnDisconnected(stopCalled);
        }
        public static void checkLogin(string username)
        {
            UserChat receiver;
            if (Users.TryGetValue(username, out receiver))
            {
                lock (receiver.ConnectionIds)
                {
                    var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
                    IEnumerable<string> allReceivers;
                    allReceivers = receiver.ConnectionIds;
                    foreach (var cid in allReceivers)
                    {
                        hubContext.Clients.Client(cid).otherloginOntime(new
                        {
                            message = username,
                            isPrivate = true
                        });
                    }
                }
            }
        }
        public static Conversations ReadXMLData(string username, string useSend){
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/App_Data/DataConversation/" + useSend);
            if (Directory.Exists(sPath))
            {
                string idfile = "";
                foreach (var j in Users)
                {
                    if (username != j.Value.Name)
                    {
                        idfile = j.Value.ID;
                        break;
                    }
                }
                if (idfile != "")
                {
                    try
                    {
                        Conversations userdataConver = new Conversations();
                        string filename = Path.Combine(sPath, idfile + ".dat");
                        if (File.Exists(filename))
                        {
                            System.Xml.Serialization.XmlSerializer reader =
                                    new System.Xml.Serialization.XmlSerializer(typeof(Conversations));
                            System.IO.StreamReader file = new System.IO.StreamReader(
                                filename);
                            userdataConver = (Conversations)reader.Deserialize(file);
                            file.Close();
                            return userdataConver;
                        }
                    }
                    catch
                    {
                    }

                }
            }
            return new Conversations();
        }
        public Conversations ReadXML(string username)
        {
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/App_Data/DataConversation/" + Context.User.Identity.Name);
            if (Directory.Exists(sPath))
            {
                string idfile = "";
                foreach (var j in Users)
                {
                    if (username != j.Value.Name)
                    {
                        idfile = j.Value.ID;
                        break;
                    }
                }
                if (idfile != "")
                {
                    try
                    {
                        Conversations userdataConver = new Conversations();
                        string filename = Path.Combine(sPath, idfile + ".dat");
                        if (File.Exists(filename))
                        {
                            System.Xml.Serialization.XmlSerializer reader =
                                    new System.Xml.Serialization.XmlSerializer(typeof(Conversations));
                            System.IO.StreamReader file = new System.IO.StreamReader(
                                filename);
                            userdataConver = (Conversations)reader.Deserialize(file);
                            file.Close();
                            return userdataConver;
                        }
                    }
                    catch { 
                    }

                }
            }
            return new Conversations();
        }
        private void WriteXMLSend(string username, string message, bool online)
        {
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/App_Data/DataConversation/" + Context.User.Identity.Name);
            if (!Directory.Exists(sPath))
            {
                Directory.CreateDirectory(sPath);
            }
            if (Directory.Exists(sPath))
            {
                string idfile = "";
                foreach (var j in Users)
                {
                    if (username != j.Value.Name) {
                        idfile = j.Value.ID;
                        break;
                    }
                }
                if (idfile != "")
                {
                    try
                    {
                        Conversations userdataConver = new Conversations();
                        userdataConver.data = new List<Conversation>();
                        string filename = Path.Combine(sPath, idfile + ".dat");
                        if (File.Exists(filename))
                        {
                            System.Xml.Serialization.XmlSerializer reader =
                                    new System.Xml.Serialization.XmlSerializer(typeof(Conversations));
                            System.IO.StreamReader file = new System.IO.StreamReader(
                                filename);
                            userdataConver = (Conversations)reader.Deserialize(file);
                            file.Close();
                        }
                        userdataConver.Name = Context.User.Identity.Name;
                        userdataConver.data.Add(new Conversation() { content = message, Name = "_Me", status = online });
                        var writer = new System.Xml.Serialization.XmlSerializer(typeof(Conversations));
                        var wfile = new System.IO.StreamWriter(filename);
                        writer.Serialize(wfile, userdataConver);
                        wfile.Close();
                    }
                    catch { }
                }
            }
        }

        private void WriteXMLReceived(string username, string message, bool online)
        {
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/App_Data/DataConversation/" + username);
            if (!Directory.Exists(sPath))
            {
                Directory.CreateDirectory(sPath);
            }
            if (Directory.Exists(sPath))
            {
                string idfile = "";
                foreach (var j in Users)
                {
                    if (Context.User.Identity.Name != j.Value.Name)
                    {
                        idfile = j.Value.ID;
                        break;
                    }
                }
                if (idfile != "")
                {
                    try
                    {
                        Conversations userdataConver = new Conversations();
                        userdataConver.data = new List<Conversation>();
                        string filename = Path.Combine(sPath, idfile + ".dat");
                        if (File.Exists(filename))
                        {
                            System.Xml.Serialization.XmlSerializer reader =
                                    new System.Xml.Serialization.XmlSerializer(typeof(Conversations));
                            System.IO.StreamReader file = new System.IO.StreamReader(
                                filename);
                            userdataConver = (Conversations)reader.Deserialize(file);
                            file.Close();
                        }
                        userdataConver.Name = username;
                        userdataConver.data.Add(new Conversation() { content = message, Name = Context.User.Identity.Name, status = online });
                        var writer = new System.Xml.Serialization.XmlSerializer(typeof(Conversations));
                        var wfile = new System.IO.StreamWriter(filename);
                        writer.Serialize(wfile, userdataConver);
                        wfile.Close();
                    }
                    catch { }
                }
            }
        }
        public void Send(string message, string to)
        {

            UserChat receiver;
            if (Users.TryGetValue(to, out receiver))
            {
                UserChat sender = GetUser(Context.User.Identity.Name);

                IEnumerable<string> allReceivers;
                lock (receiver.ConnectionIds)
                {
                    allReceivers = receiver.ConnectionIds;
                    foreach (var cid in allReceivers)
                    {
                        Clients.Client(cid).received(new
                        {
                            sender = sender.Name,
                            message = message,
                            isPrivate = true
                        });
                    }
                    WriteXMLReceived(to, message, true);
                }
                string connectionId = Context.ConnectionId;
                lock (sender.ConnectionIds)
                {
                    allReceivers = sender.ConnectionIds;
                    foreach (var cid in allReceivers)
                    {
                        if (connectionId != cid)
                            Clients.Client(cid).updatesend(new
                            {
                                sendto = to,
                                message = message,
                                isPrivate = true
                            });
                    }
                    WriteXMLSend(to, message, true);
                }
            }
            else
            {
                WriteXMLReceived(to, message, false);
                WriteXMLSend(to, message, true);
            }
        }
        private UserChat GetUser(string username)
        {
            UserChat user;
            Users.TryGetValue(username, out user);
            return user;
        }

        protected object GetAuthInfo()
        {
            var user = Context.User;
            return new
            {
                IsAuthenticated = user.Identity.IsAuthenticated,
                IsAdmin = true,
                UserName = user.Identity.Name
            };
        }
        public void SendNotifications(string message)
        {
            Clients.All.receiveNotification(message);
        }
        public static void SendMessage(string msg)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            hubContext.Clients.All.receiveNotification(msg);
        }
        public static void SendMessage(string message, string to)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            UserChat receiver;
            if (Users.TryGetValue(to, out receiver))
            {
                IEnumerable<string> allReceivers;
                allReceivers = receiver.ConnectionIds;

                foreach (var cid in allReceivers)
                {
                    hubContext.Clients.Client(cid).received(new
                    {
                        sender = "System",
                        message = message,
                        isPrivate = true
                    });
                }
            }
        }
        public static void SendNotifications()
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            foreach (var i in Users)
            {
                string to = i.Value.Name;
                //dbAIMSEntities obj = new dbAIMSEntities();
                //int s = 0;
                //int e = CommonAIMS._itemsofpage;
                //var re = obj.Database.SqlQuery<EventUserModel>("proc_getallEvent @username",
                //new SqlParameter("@username", to)).ToList();
                List<EventUser> ls = new List<EventUser>();
                //foreach (var d in re)
                //{
                //    ls.Add(new EventUser()
                //    {
                //        intkey = d.ID,
                //        thoigian = d.NGAYYC.ToString("dd/MM/yyyy"),
                //        inttype = d.TypeYC,
                //        soyeucau = d.SOYC,
                //        strname = d.HOTEN,
                //        intkey1 = d.IDCT
                //    });
                //}
                if (ls.Count > 0)
                {
                    UserChat receiver;
                    if (Users.TryGetValue(to, out receiver))
                    {
                        IEnumerable<string> allReceivers;
                        allReceivers = receiver.ConnectionIds;

                        foreach (var cid in allReceivers)
                        {
                            hubContext.Clients.Client(cid).onreceivedNotifications(ls);
                        }
                    }
                }

            }

        }
    }
}