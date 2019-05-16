using System;
using System.Collections.Generic;

namespace MatchApi.Models
{
    public partial class Liker
    {
        public int UserId { get; set; }
        public int LikerId { get; set; }
        public DateTime AddedDate { get; set; }
        public int? WriteType { get; set; }
        public DateTime? WriteTime { get; set; }
        public string WriteUser { get; set; }
        public string WriteIp { get; set; }

        public virtual Member LikerNavigation { get; set; }
        public virtual Member User { get; set; }
    }
}
