using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MatchApi.Dtos;
using MatchApi.Models;
using MatchApi.Repository;

namespace MatchApi.Controllers
{
    public class AuthController : BaseController
    {
        private readonly Microsoft.Extensions.Configuration.IConfiguration _config;
        private readonly AutoMapper.IMapper _mapper;
        private readonly IRepoAuth _repoAuth;
        public AuthController(Microsoft.Extensions.Configuration.IConfiguration config,
            AutoMapper.IMapper mapper, IRepoAuth repoAuth)
        {
            _repoAuth = repoAuth;
            _mapper = mapper;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(DtoRegister model)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            if(await _repoAuth.UserIsExists(model.Email,model.Phone))
                return BadRequest("此電話或電子郵件已經是會員了");

            //寫入註冊資料到資料庫中
            var mapMember  = _mapper.Map<Member>(model);
            var member = await _repoAuth.Register(mapMember, model.password);
            return Ok(); 

            //返回簡單使用者資料
            // var user = _mapper.Map<DtoLoginToReturn>(member);
            // return Ok(user);
            
            //重新導向使用者資料編輯
            //return CreatedAtRoute("GetAccountr", new {controller = "account", id = userToReturn.USERID}, userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(DtoLogin model)
        {
            var member = await _repoAuth.Login(model.Username, model.Password);
            if(member == null)
                return Unauthorized();

            member.LoginDate = System.DateTime.Now;
            member.ActiveDate = System.DateTime.Now;
            _repoAuth.SaveAll();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, member.UserId.ToString()),
                new Claim(ClaimTypes.Name, member.NickName),
                new Claim(ClaimTypes.Role, member.UserRole == null ? "users": member.UserRole )
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = creds
            };

            var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            //返回簡單使用者資料
            var user = _mapper.Map<DtoLoginToReturn>(member);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

        [HttpGet("GetCheckboxItemList/{keyGroup}")]
        public async Task<IActionResult> GetCheckboxItemList(string keyGroup) 
        {
            var checkboxdItemList = await _repoAuth.GetCheckBoxItemList(keyGroup);
            if (checkboxdItemList == null) 
            {
                return NotFound();
            }

            var dtoCheckboxItemList = _mapper.Map<IEnumerable<DtoCheckboxItem>>(checkboxdItemList);

            return Ok(dtoCheckboxItemList);
        }        

    }
}