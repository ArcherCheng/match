using MatchApi.Models;

namespace MatchApi.Dtos
{
    public class AutoMapperProfiles : AutoMapper.Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Member, DtoRegister>().ReverseMap();
            CreateMap<GroupKeyValue, DtoGroupKeyValue>();
            CreateMap<MemberCondition, DtoMemberCondition>().ReverseMap();
            
            CreateMap<Member,DtoMemberList>();
            CreateMap<Member,DtoMemberDetail>();
            CreateMap<Member,DtoMemberEdit>().ReverseMap();

            CreateMap<MemberPhoto,DtoPhotoList>();
            CreateMap<MemberPhoto,DtoPhotoCreate>().ReverseMap();

            CreateMap<Message, DtoMessageList>()
            .ForMember(dest => dest.SenderName, opt => opt.MapFrom(src => src.Sender.NickName))
            .ForMember(dest => dest.RecipientName, opt => opt.MapFrom(src => src.Recipient.NickName))
            .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => src.Sender.MainPhotoUrl))
            .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => src.Recipient.MainPhotoUrl));

            CreateMap<DtoMessageCreate, Message>();

        }
    }
}