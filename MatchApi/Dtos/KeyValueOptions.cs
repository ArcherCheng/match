namespace MatchApi.Dtos
{
    public class DtoKeyValueOptions
    {
        public int KeySeq { get; set; }
        public string KeyValue { get; set; }        
        public bool IsChecked { get; set; }      
        public string KeyLabel { get; set; }        
    }

    public class DtoGroupKeyValue
    {
        public int KeySeq { get; set; }
        public string KeyValue { get; set; }        
        public bool IsChecked { get; set; }      
        public string KeyLabel { get; set; }        
    }

}