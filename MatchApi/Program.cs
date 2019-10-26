using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MatchApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
            // Output("Application - Build");
            // var webHost = CreateWebHostBuilder(args).Build();
            // Output("Application - Run webHost");
            // webHost.Run();
            // Output("Application - End");
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
                // .ConfigureServices(services =>{
                //     // ...
                // })
                // .Configure(app => {
                //     app.Run(async (context)=>{
                //         await context.Response.WriteAsync("Hello world");
                //     });
                // })
                // .UseStartup<Startup>();

        public static void Output(string message)
        {
            Console.WriteLine($"[{DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss")}] {message}");
        }
    }
}
