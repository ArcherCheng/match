using System;
using System.Collections.Generic;

namespace MatchApi.Models
{
    public partial class Aa9log10
    {
        public long Id { get; set; }
        public string TableName { get; set; }
        public string InsertData { get; set; }
        public string DeleteData { get; set; }
        public byte? IsType { get; set; }
        public DateTime? UpdateTime { get; set; }
    }
}
