using System;
using System.Collections.Generic;

namespace MatchApi.Models
{
    public partial class Aa9log20
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Refer { get; set; }
        public string Destination { get; set; }
        public string QueryString { get; set; }
        public string Method { get; set; }
        public string IpAddress { get; set; }
        public DateTime? RequestTime { get; set; }
    }
}
