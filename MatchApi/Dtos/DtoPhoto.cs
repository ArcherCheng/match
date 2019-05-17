using System;

namespace MatchApi.Dtos
{
   public class DtoPhotoList
    {
        public int id { get; set; }
        public string descriptions { get; set; }
        public string photoUrl { get; set; }
        public string publicId { get; set; }
        public bool isMain { get; set; }
        public DateTime dateAdded { get; set; }
      
    }
 
    public class DtoPhotoCreate
    {
        public string photoUrl { get; set; }
        public Microsoft.AspNetCore.Http.IFormFile File { get; set; }
        public string descriptions { get; set; }
        public DateTime dateAdded { get; set; }
        public string publicId { get; set; }

        public DtoPhotoCreate()
        {
            dateAdded = DateTime.Now;
        }
    }
}