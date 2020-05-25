using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using TELPA.Components;
using Microsoft.Extensions.Options;
using TELPA.Data;

namespace TELPA
{
    public class Startup
    {
        private string ContentRoot;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            ContentRoot = configuration.GetValue<string>(WebHostDefaults.ContentRootKey);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            if (connectionString.Contains("%CONTENT_ROOT%"))
            {
                connectionString = connectionString.Replace("%CONTENT_ROOT%", ContentRoot);
            }
            services.AddDbContext<ApplicationDbContext>(options => options.UseLazyLoadingProxies().UseSqlServer(connectionString));

            //services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
            //    .AddEntityFrameworkStores<ApplicationDbContext>();

            //services.AddIdentityServer()
            //    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            //services.AddAuthentication()
            //    .AddIdentityServerJwt();
            services.AddAuthentication("NoOpAuthentication")
                .AddScheme<NoOpAuthenticationOptions, NoOpAuthenticationHandler>("NoOpAuthentication", options => { });
            services.AddSingleton<IPostConfigureOptions<NoOpAuthenticationOptions>, NoOpAuthenticationPostConfigureOptions>();

            services.AddSingleton<ISessionService, SessionService>();
            services.AddScoped<IAuthorizationService, AuthorizationService>();

            //Assembly[] assemblies = new Assembly[] { Assembly.LoadFrom(AppDomain.CurrentDomain.BaseDirectory + "TELPA.Extensions.Logic.dll") };
            Assembly[] assemblies =
                Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory)
                .Where(s => s.Split(Path.DirectorySeparatorChar).Last().StartsWith("TELPA.Extensions."))
                .Where(s => s.Split(Path.DirectorySeparatorChar).Last().EndsWith(".dll"))
                .Select(path => Assembly.LoadFrom(path))
                .ToArray();
            System.Diagnostics.Debug.WriteLine("Extensions: " + string.Join<Assembly>(", ", assemblies));
            foreach (var assembly in assemblies)
            {
                services.AddControllers().AddApplicationPart(assembly).AddControllersAsServices();
                //services.AddControllers().PartManager.ApplicationParts.Add(new AssemblyPart(assembly));
            }
            //var t = typeof(TELPA.Extensions.Logic.Controllers.SimpleController);

            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddRazorPages();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                context.Database.EnsureCreated();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.Use((context, next) =>
            {
                if (context.Request.Headers.ContainsKey("X-SessionToken"))
                {
                    context.Response.Headers["X-SessionToken"] = context.Request.Headers["X-SessionToken"];
                }
                return next.Invoke();
            });

            app.UseAuthentication();
            //app.UseIdentityServer();
            //app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    //spa.UseAngularCliServer(npmScript: "start");
                    spa.UseAngularCliServer(npmScript: "hmr");
                }
            });
        }
    }
}
