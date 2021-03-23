using BusinessLayer;
using BusinessLayer.Implements;
using BusinessLayer.Interfaces;
using DataLayer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace WebApp
{
    public class Startup
    {
        private readonly string _clientAppLocation;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            string appLoacation = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)
                                  ?? throw new ArgumentNullException(nameof(appLoacation));

            _clientAppLocation = Path.Combine(appLoacation, "../WebClient/wwwroot");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = _clientAppLocation; });

            var connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<RepositoryTodoContext>(options =>
                options.UseSqlServer(connection)
            );

            services.AddTransient<IUsersRepo, EFUsersRepository>();
            services.AddTransient<ITodosRepo, EFTodosRepository>();

            services.AddScoped<DataManager>();

            services.AddControllersWithViews();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    "default",
                    "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa => { spa.Options.SourcePath = _clientAppLocation; });
        }
    }
}
