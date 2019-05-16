using System;
using System.Collections.Generic;

namespace MatchApi.Models
{
    public partial class CheckboxItem
    {
        public int Id { get; set; }
        public string KeyGroup { get; set; }
        public int KeySeq { get; set; }
        public string KeyValue { get; set; }
        public string KeyLabel { get; set; }
        public bool IsChecked { get; set; }
        public int? WriteType { get; set; }
        public DateTime? WriteTime { get; set; }
        public string WriteUser { get; set; }
        public string WriteIp { get; set; }
    }
}
