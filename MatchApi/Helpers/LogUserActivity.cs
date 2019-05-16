using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

using MatchApi.Models;
using MatchApi.Repository;
using Microsoft.AspNetCore.Http;

namespace MatchApi.Helpers
{
    public class LogUserActivity : Microsoft.AspNetCore.Mvc.Filters.IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            string currentUserId = "0";
            var temp = context.HttpContext.Request.Path;
            var resultContext = await next();
            if (resultContext.HttpContext.User.Identity.IsAuthenticated)
            {
                currentUserId = resultContext.HttpContext.User
                .FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;

            }

            Aa9log20 log = new Aa9log20()
            {
                UserId = currentUserId,
                Refer = resultContext.ActionDescriptor.AttributeRouteInfo.ToString(),
                Destination = resultContext.HttpContext.Request.Path,
                QueryString = resultContext.HttpContext.Request.QueryString.ToString(),
                Method = resultContext.HttpContext.Request.Method,
                IpAddress = resultContext.HttpContext.Request.Host.Value,
                RequestTime = System.DateTime.Now
            };

            var repo = resultContext.HttpContext.RequestServices.GetService<IRepoUserLog>();
            await repo.AddLogAsync(log, currentUserId);
        }
    }

    // public class ActionFilterLog : ActionFilterAttribute
    // {
    //     public override void OnActionExecuting(ActionExecutingContext context)
    //     {
    //         base.OnActionExecuting(context);
    //     }
    //     public override void OnActionExecuted(ActionExecutedContext context)
    //     {
    //         base.OnActionExecuted(context);
    //     }
    //     public override void OnResultExecuting(ResultExecutingContext context)
    //     {
    //        base.OnResultExecuting(context);
    //     }
    //     public override void OnResultExecuted(ResultExecutedContext context)
    //     {
    //         base.OnResultExecuted(context);
    //     }
    // }

    public static class context
    {
        private static Microsoft.AspNetCore.Http.IHttpContextAccessor HttpContextAccessor;
        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextAccessor = httpContextAccessor;
        }

        private static System.Uri GetAbsoluteUri()
        {
            var request = HttpContextAccessor.HttpContext.Request;
            System.UriBuilder uriBuilder = new System.UriBuilder();
            uriBuilder.Scheme = request.Scheme;
            uriBuilder.Host = request.Host.Host;
            uriBuilder.Path = request.Path.ToString();
            uriBuilder.Query = request.QueryString.ToString();
            return uriBuilder.Uri;
        }

        public static string GetAbsoluteUrl()
        {
            return GetAbsoluteUri().ToString();
        }

        public static string GetAbsolutePath()
        {
            return GetAbsoluteUri().AbsolutePath;
        }

    }    
}


// public class ActionLogAttribute : System.Web.Mvc.ActionFilterAttribute
// {
//     //private AppDbModel2 db = new AppDbModel2();
//     //private AA9LOG20 log = new AA9LOG20();

//     //public override void OnActionExecuting(ActionExecutingContext filterContext)
//     //{
//     //    base.OnActionExecuting(filterContext);
//     //}

//     //public override void OnActionExecuted(ActionExecutedContext filterContext)
//     //{
//     //    base.OnActionExecuted(filterContext);
//     //}

//     //public override void OnResultExecuting(ResultExecutingContext filterContext)
//     //{
//     //    base.OnResultExecuting(filterContext);
//     //}

//     public override void OnResultExecuted(ResultExecutedContext filterContext)
//     {
//         base.OnResultExecuted(filterContext);

//         if (HttpContext.Current.User.Identity.IsAuthenticated)
//         {
//             using (AppDbModel2 db = new AppDbModel2())
//             {
//                 try
//                 {
//                     AA9LOG20 log = new AA9LOG20()
//                     {
//                         USERID = (HttpContext.Current.User.Identity.IsAuthenticated ? filterContext.HttpContext.User.Identity.Name : "Anonymous"),
//                         REFER = (filterContext.HttpContext.Request.UrlReferrer == null ? filterContext.HttpContext.Request.Url.AbsolutePath : filterContext.HttpContext.Request.UrlReferrer.AbsolutePath),
//                         //DESTINATION = filterContext.RouteData.Values["controller"] + "." + filterContext.RouteData.Values["action"],
//                         DESTINATION = filterContext.HttpContext.Request.Url.AbsolutePath,
//                         QUERYSTRING = filterContext.HttpContext.Request.QueryString.ToString(),
//                         METHOD = filterContext.HttpContext.Request.HttpMethod,
//                         IPADDRESS = filterContext.HttpContext.Request.UserHostAddress,
//                         REQUESTTIME = System.DateTime.Now
//                     };
//                     db.AA9LOG20.Add(log);
//                     db.SaveChanges();
//                 }
//                 catch(Exception e)
//                 {
//                     var msg=e.Message;
//                     //Console.WriteLine(msg);
//                 }
//             }
//         }

//         //https://dotblogs.com.tw/sean_liao/2017/03/17/item15
//         //上面的區域變數不斷的創建以及釋放,建議不要用上面的那一種方式,將可重覆使用的區域變數提升至類別成員
//         //if (HttpContext.Current.User.Identity.IsAuthenticated)
//         //{
//         //    log.USERID = filterContext.HttpContext.User.Identity.Name;
//         //    log.REFER = (filterContext.HttpContext.Request.UrlReferrer == null ? filterContext.HttpContext.Request.Url.AbsolutePath : filterContext.HttpContext.Request.UrlReferrer.AbsolutePath);
//         //    log.DESTINATION = filterContext.HttpContext.Request.Url.AbsolutePath;
//         //    log.QUERYSTRING = filterContext.HttpContext.Request.QueryString.ToString();
//         //    log.METHOD = filterContext.HttpContext.Request.HttpMethod;
//         //    log.IPADDRESS = filterContext.HttpContext.Request.UserHostAddress;
//         //    log.REQUESTTIME = System.DateTime.Now;
//         //    db.AA9LOG20.Add(log);
//         //    db.SaveChanges();
//         //}
//     }
// }

//public class ValidateAjaxAttribute : ActionFilterAttribute
//{
//    public override void OnActionExecuting(ActionExecutingContext filterContext)
//    {
//        if (!filterContext.HttpContext.Request.IsAjaxRequest())
//            return;

//        var modelState = filterContext.Controller.ViewData.ModelState;
//        if (!modelState.IsValid)
//        {
//            var errorModel =
//                    from x in modelState.Keys
//                    where modelState[x].Errors.Count > 0
//                    select new
//                    {
//                        key = x,
//                        errors = modelState[x].Errors.Select(y => y.ErrorMessage).ToArray()
//                    };
//            filterContext.Result = new JsonResult()
//            {
//                Data = errorModel
//            };
//            filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
//        }
//    }
//}
