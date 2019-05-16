using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using AutoMapper;
using MatchApi.Dtos;
using MatchApi.Models;
using MatchApi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MatchApi.Helpers;

namespace MatchApi.Controllers
{
    [AllowAnonymous]
    // [ServiceFilter(typeof(LogUserActivity))]
    public class HomeController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRepoHome _repoHome;
        public HomeController(IMapper mapper, IRepoHome repoHome)
        {
            this._repoHome = repoHome;
            this._mapper = mapper;
        }

        [HttpGet("userList")]
        public async Task<IActionResult> GetUserList([FromQuery]ParamsMember para) 
        {
            var repoUserList = await _repoHome.GetUserList(para);

            Response.AddPagination(repoUserList.CurrentPage, repoUserList.PageSize, 
                    repoUserList.TotalCount, repoUserList.TotalPages);

            var dtoUserList = _mapper.Map<IEnumerable<DtoMemberList>>(repoUserList);

            return Ok(dtoUserList);
        }

        [HttpGet("userDetail/{userId}")]
        public async Task<IActionResult> GetUserDetail(int userId)
        {
            var member = await _repoHome.GetUserDetail(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        [HttpGet("userPhotos/{userId}")]
        public async Task<IActionResult> GetUserPhotos(int userId)
        {
            var photos = await _repoHome.GetUserPhotos(userId);
            var dtoPhoto = _mapper.Map<IEnumerable<DtoPhotoList>>(photos);
            return Ok(dtoPhoto);
        }

        //[ServiceFilter(typeof(LogUserActivity))]
        [HttpGet("userCondition/{userId}")]
        public async Task<IActionResult> GetUserCondition(int userId)
        {
           var memberCondition = await _repoHome.GetUserCondition(userId);
            if (memberCondition == null) 
            {
                memberCondition = new MemberCondition();
                memberCondition.UserId = userId;
                memberCondition.BloodInclude = "";
                memberCondition.StarInclude = "";
                memberCondition.CityInclude = "";
                memberCondition.JobTypeInclude = "";
                memberCondition.ReligionInclude = "";
            }
            var dtoMemberCondition = _mapper.Map<DtoMemberCondition>(memberCondition);
            return Ok(dtoMemberCondition);
        }

        [HttpPost("userMatchList")]
        public async Task<IActionResult> GetMatchList([FromBody]MemberCondition condition , [FromQuery]ParamsMember param)
        {
            param.Condition = condition;
            param.UserId = 0;

            // para.UserId = userId;
            var repoMember = await _repoHome.GetMatchList(param);
            Response.AddPagination(repoMember.CurrentPage, repoMember.PageSize, repoMember.TotalCount, repoMember.TotalPages);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(repoMember);
            return Ok(dtoMemberList);
        }        

        //已經登入者用
        [HttpGet("userMatchList/{userId}")]
        public async Task<IActionResult> GetMyMatchList(int userId, [FromQuery]ParamsMember param)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            param.UserId = userId;
            var repoMember = await _repoHome.GetMatchList(param);
            Response.AddPagination(repoMember.CurrentPage, repoMember.PageSize, repoMember.TotalCount, repoMember.TotalPages);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(repoMember);
            return Ok(dtoMemberList);
        }        


        //已經登入者用
        [HttpPost("userCondition/update/{userId}")]
        public async Task<IActionResult> UserConditionUpdate(int userId, [FromBody]DtoMemberCondition model)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var repoMember = await _repoHome.GetUserDetail(userId);
            repoMember.ActiveDate = System.DateTime.Now;
            _repoHome.Update(repoMember);

            var repoMemberCondition = await _repoHome.GetUserCondition(userId);
            if (repoMemberCondition == null)
            {
                repoMemberCondition = new MemberCondition();
                _mapper.Map(model, repoMemberCondition);
                repoMemberCondition.UserId= userId;
                repoMemberCondition.Sex = repoMember.Sex;
                _repoHome.Add(repoMemberCondition);
            }
            else
            {
                _mapper.Map(model, repoMemberCondition);
                _repoHome.Update(repoMemberCondition);
            }
            if (await _repoHome.SaveAllAsync() > 0)
                return Ok(repoMemberCondition);

            return BadRequest("配對條件存檔失敗");
        }
    }
}