using MatchApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace MatchApi.Controllers
{
    [AllowAnonymous]
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogUserActivity))]
    public class BaseController : ControllerBase
    {
        // protected readonly IMemoryCache memoryCache;

        // public BaseController(IMemoryCache memoryCache)
        // {
        //     this.memoryCache = memoryCache;
        // }
    }
}