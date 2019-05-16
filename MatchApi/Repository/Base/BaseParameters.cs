using System;

namespace MatchApi.Repository
{
    public class BaseParameters
    {
        private const int MaxPageSize = 100;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 20;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        public int Id;
        public string Key { get; set; }
        public int BeginId { get; set; }
        public int EndId { get; set; }
        public string BeginKey { get; set; }
        public string EndKey { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool  IsTrue { get; set; } = true;        
    }
}