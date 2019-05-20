using System.ComponentModel.DataAnnotations;

namespace MatchApi.Dtos
{

    public class DtoRegister
    {
        [Required]
        public string NickName { get; set; }
        
        [Required]
        public string Phone { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public int  BirthYear { get; set; }
        
        [Required]
        public int Sex { get; set; }
        
        [Required]
        public int Marry { get; set; }
        
        [Required]
        public int Education { get; set; }

        [Required]
        public int Heights { get; set; }
        
        [Required]
        public int Weights { get; set; }

        [Required]
        public int Salary { get; set; }
       
        [Required]
        public string Blood { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Star { get; set; }

        [Required]
        public string JobType { get; set; }

        [Required]
        public string Religion { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "密碼最少要4個字,最多12個字")]
        public string password { get; set; }
    }

    public class DtoLogin
    {
       public string Username { get; set; }
       public string Password { get; set; }
    }

    public class DtoLoginToReturn
    {
        public int UserId { get; set; }
        public string NickName { get; set; }
        public string UserRole { get; set; }
        public string MainPhotoUrl { get; set; }
    }

    public class DtoForgetPassword
    {
        public string Phone { get; set; }
        public string Email { get; set; }
        public int BirthYear { get; set; }
    }

    public class DtoChangePassword
    {
        public string Phone { get; set; }
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }

 
    
}