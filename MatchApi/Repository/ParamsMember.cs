using MatchApi.Models;

namespace MatchApi.Repository
{
    public class ParamsMember : BaseParameters
    {
       public int UserId { get; set; } //= 0;
       public MemberCondition Condition {get; set;} 
       public string MessageContainer{ get; set; }
        
    }
}