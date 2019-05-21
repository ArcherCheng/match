using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MatchApi.Dtos;
using MatchApi.Helpers;
using MatchApi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MatchApi.Models;
using System;

namespace MatchApi.Controllers
{
    [Authorize]
    [Route("api/[controller]/{userId}")]
    [ApiController]

    public class MemberController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRepoMember _repoMember;
        private readonly IRepoHome _repoHome;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public MemberController(IMapper mapper, IRepoMember repoMember, IRepoHome repoHome,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            this._repoHome = repoHome;
            this._repoMember = repoMember;
            this._mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);            
        }

        [HttpGet("editMember")]
        public async Task<IActionResult> editMember(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = await _repoMember.GetMemberEdit(userId);
            var dtoMember = _mapper.Map<DtoMemberEdit>(member);
            return Ok(dtoMember);
        }

        [HttpGet("getPhotos")]
        public async Task<IActionResult> GetPhotos(int userId)
        {
            var photos = await _repoHome.GetUserPhotos(userId);
            var dtoPhoto = _mapper.Map<IEnumerable<DtoPhotoList>>(photos);
            return Ok(dtoPhoto);
        }

        [HttpPost("uploadPhotos")]
        public async Task<IActionResult> uploadPhotos(int userId, [FromForm]DtoPhotoCreate dtoPhotoCreate)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = await _repoMember.GetMemberEdit(userId);
            if(member == null)
                return Unauthorized();
                
            member.ActiveDate = System.DateTime.Now;

            var file = dtoPhotoCreate.File;
            if (file == null || file.Length == 0)
                return BadRequest("未選取檔案,無法上傳");

            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(1024).Height(1024).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            dtoPhotoCreate.photoUrl = uploadResult.Uri.ToString();
            dtoPhotoCreate.publicId = uploadResult.PublicId;
            dtoPhotoCreate.descriptions = file.FileName;

            var photo = _mapper.Map<MemberPhoto>(dtoPhotoCreate);
            photo.UserId = userId;
            if (!_repoMember.HasMainPhoto(userId)) 
                photo.IsMain = true;

            _repoMember.Add<MemberPhoto>(photo);
            if (await _repoMember.SaveAllAsync()>0)
            {
                var dtoPhotoList = _mapper.Map<DtoPhotoList>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, dtoPhotoList);
            }
            return BadRequest("無法上傳新增相片");
        }

        [HttpPost("setMainPhoto/{id}")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = await _repoMember.GetMemberEdit(userId);
            if(member == null)
                return Unauthorized();
                
            var photo = await _repoMember.GetPhoto(id);
            if (photo == null)
                return Unauthorized();

            if (photo.IsMain)
                return BadRequest("這個相片已經是設為封面了");

            var mainPhotoUrl = photo.PhotoUrl;
            member.MainPhotoUrl = mainPhotoUrl;
            member.ActiveDate = System.DateTime.Now;

            var currentMainPhoto = await _repoMember.GetMainPhoto(userId);
            if (currentMainPhoto != null)
                currentMainPhoto.IsMain = false;

            photo.IsMain = true;
            if (_repoMember.SaveAll()>0)
                return NoContent();

            return BadRequest("無法設定相片封面,請洽服務人員");
        }

        [HttpDelete("deletePhoto/{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // var member = _repoMember.Get(userId);
            var photo = await _repoMember.GetPhoto(id);
            if (photo == null)
                return Unauthorized();

            if (photo.IsMain)
                return BadRequest("這個相片已經是設為封面了,不能刪除");

            if (photo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);
                if (result.Result == "ok")
                {
                    _repoMember.Delete(photo);
                }
            }
            else
            {
                _repoMember.Delete(photo);
            }

            if (_repoMember.SaveAll()>0)
                return NoContent();

            return BadRequest("無法刪除相片檔,請洽服務人員");
        }


        [HttpPost("updateMember")]
        public async Task<IActionResult> updateMember(int userId, DtoMemberEdit model)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = await _repoMember.GetMemberEdit(userId);
            _mapper.Map(model, member);
            member.ActiveDate = System.DateTime.Now;
            // member.LoginDate = System.DateTime.Now;

            _repoMember.Update(member);
            if (await _repoMember.SaveAllAsync() > 0)
                return NoContent();

            throw new System.Exception($"更新使用者資料失敗,ID = {userId}");
        }

        [HttpGet("myLikerPageList")]
        public async Task<IActionResult> GetMylikerPageLisk(int userId, [FromQuery]ParamsMember para)
        {
            var repoUserList = await _repoMember.GetMyLikerPageList(userId, para);

            Response.AddPagination(repoUserList.CurrentPage, repoUserList.PageSize,
                    repoUserList.TotalCount, repoUserList.TotalPages);

            var dtoUserList = _mapper.Map<IEnumerable<DtoMemberList>>(repoUserList);

            return Ok(dtoUserList);
        }

        [HttpGet("myLikerList")]
        public async Task<IActionResult> GetMylikerLisk(int userId)
        {
            var repoUserList = await _repoMember.GetMyLikerList(userId);

            var dtoUserList = _mapper.Map<IEnumerable<DtoMemberList>>(repoUserList);

            return Ok(dtoUserList);
        }

        [HttpGet("addLiker/{likeId}")]
        public async Task<IActionResult> AddMyliker(int userId, int likeId)
        {
            var success = await _repoMember.AddMyLiker(userId, likeId);

            if (!success)
                return BadRequest("加入失敗,請檢查您的已加入名單是否已經存在了");

            return Ok("成功加入我的最愛");
        }

        // [HttpGet("{msgId}", Name="GetMessage")]
        [HttpGet("getMessage/{msgId}")]
        public async Task<IActionResult> GetMessage(int userId, int msgId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMember = await _repoMember.GetMemberEdit(userId);
            if (repoMember == null)
                return NotFound(); 

            var messageRepo = await _repoMember.GetMessage(msgId);
            if(messageRepo == null)
                return NotFound();

            return Ok(messageRepo);
        }


        [HttpGet("getAllMessages")]
        public async Task<IActionResult> getAllMessages(int userId,[FromQuery]ParamsMember para)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMember = await _repoMember.GetMemberEdit(userId);
            if (repoMember == null)
                return NotFound(); 

            para.UserId = userId;
            var pageMessages = await _repoMember.GetMessagesForUser(para);
            Response.AddPagination(pageMessages.CurrentPage, pageMessages.PageSize, 
                pageMessages.TotalCount, pageMessages.TotalPages);
    
            var dtoMessages = _mapper.Map<IEnumerable<DtoMessageList>>(pageMessages);

            return Ok(dtoMessages);
        }

        [HttpGet("getUnreadMessages")]
        public async Task<IActionResult> GetUnreadMessages(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var messages = await _repoMember.GetUnreadMessages(userId);
            var dtoMessages = _mapper.Map<IEnumerable<DtoMessageList>>(messages);

            return Ok(dtoMessages);
        }

        [HttpGet("threadMessage/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var repoMessage = await _repoMember.GetMessageThread(userId, recipientId);
            var dotMesasage = _mapper.Map<IEnumerable<DtoMessageList>>(repoMessage);
            return Ok(dotMesasage);
        }

        [HttpPost("createMessage")]
        public async Task<IActionResult> CreateMessage(int userId, [FromBody]DtoMessageCreate dtoMessageCreate)
        {
            var sender = await _repoMember.GetMemberEdit(userId);
            if (sender.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var recipient = await _repoMember.GetMemberEdit(dtoMessageCreate.RecipientId);
            if(recipient == null)
                return BadRequest("查無此會員");

            dtoMessageCreate.SenderId = userId;
            dtoMessageCreate.SendDate = System.DateTime.Now;

            var message = _mapper.Map<Message>(dtoMessageCreate);

            _repoMember.Add(message); 
            if(await _repoMember.SaveAllAsync()>0) 
            {
                var  messageToReturn = _mapper.Map<DtoMessageList>(message);
                // return CreatedAtRoute("getMessage", new {Controller="Member",userId = userId, msgId = message.Id}, messageToReturn);
                return Ok(messageToReturn);
                //return NoContent();
            } 
            throw new Exception("留言存檔失敗");
        }

        [HttpPost("deleteMessage/{msgId}")]
        public async Task<IActionResult> DeleteMessage(int userId, int msgId)
        {
          if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMessage = await _repoMember.GetMessage(msgId);
            if(repoMessage.SenderId == userId)
                repoMessage.SenderDeleted = true;
            
            if(repoMessage.RecipientId == userId)
                repoMessage.RecipientDeleted = true;
            
            if(repoMessage.SenderDeleted && repoMessage.RecipientDeleted)
                _repoMember.Delete(repoMessage);

            if(_repoMember.SaveAll()>0)
                return NoContent();
            
            throw new Exception("刪除留言失敗");
        }

        [HttpPost("markRead/{msgId}")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int msgId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var repoMessage=await _repoMember.GetMessage(msgId);
            if(repoMessage.RecipientId != userId)
                return Unauthorized();
            
            repoMessage.IsRead =true;
            repoMessage.ReadDate = System.DateTime.Now;
            
            _repoMember.SaveAll();

            return NoContent();
        }

    }
}