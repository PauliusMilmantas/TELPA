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
using TELPA.Constants;
using System.Collections.Generic;

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
            services.Configure<Config>(Configuration.GetSection("TELPAConfig"));
            var config = Configuration.GetSection("TELPAConfig").Get<Config>();

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
            services.AddHttpContextAccessor();

            //System.Diagnostics.Debug.WriteLine(Configuration.);

            //services.AddSingleton<ISessionService, SessionService>();
            //services.AddScoped<IAuthorizationService, AuthorizationService>();

            List<Type> superTypes = config.Services.Select<ServiceConfig, Type>(s => null).ToList();
            List<Type> subTypes = config.Services.Select<ServiceConfig, Type>(s => null).ToList();

            for (var i = 0; i < config.Services.Count;++i)
            {
                var serviceConfig = config.Services[i];
                Type superType = Type.GetType(serviceConfig.Interface);
                Type subType = Type.GetType(serviceConfig.Implementation);
                if (superType != null)
                {
                    superTypes[i] = superType;
                    System.Diagnostics.Debug.WriteLine("Found " + serviceConfig.Interface);
                }
                if (subType != null)
                {
                    subTypes[i] = subType;
                    System.Diagnostics.Debug.WriteLine("Found " + serviceConfig.Implementation);
                }
            }

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
                for (var i = 0; i < config.Services.Count; ++i)
                {
                    var serviceConfig = config.Services[i];
                    Type superType = assembly.GetType(serviceConfig.Interface);
                    Type subType = assembly.GetType(serviceConfig.Implementation);
                    if (superType != null)
                    {
                        superTypes[i] = superType;
                        System.Diagnostics.Debug.WriteLine("Found " + serviceConfig.Interface);
                    }
                    if (subType != null)
                    {
                        subTypes[i] = subType;
                        System.Diagnostics.Debug.WriteLine("Found " + serviceConfig.Implementation);
                    }
                }


                services.AddControllers().AddApplicationPart(assembly).AddControllersAsServices();
                //services.AddControllers().PartManager.ApplicationParts.Add(new AssemblyPart(assembly));
            }

            for (var i = 0; i < config.Services.Count; ++i)
            {
                var serviceConfig = config.Services[i];
                Type superType = superTypes[i];
                Type subType = subTypes[i];
                if (superType == null || subType == null)
                {
                    System.Diagnostics.Debug.WriteLine("Service pair of " + serviceConfig.Interface + " and " + serviceConfig.Implementation + " not found.");
                    continue;
                }
                if (serviceConfig.Scope == "Singleton")
                {
                    services.AddSingleton(superType, subType);
                }
                else if (serviceConfig.Scope == "Scoped")
                {
                    services.AddScoped(superType, subType);
                }
                else if (serviceConfig.Scope == "Transient")
                {
                    services.AddTransient(superType, subType);
                }
            }

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

            app.UseMiddleware<ConcurrencyExceptionHandler>();
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                //app.UseDatabaseErrorPage();
            }
            else
            {
                //app.UseExceptionHandler("/Error");
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
