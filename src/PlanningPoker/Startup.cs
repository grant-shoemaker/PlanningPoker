using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Cors.Core;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.SignalR;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Logging;


namespace PlanningPoker
{
    public class Startup
    {

        private CorsPolicy corsPolicy()
        {
            var policy = new CorsPolicy();
            policy.Headers.Add("*");
            policy.Methods.Add("*");
            policy.Origins.Add("*");
            policy.SupportsCredentials = true;
            return policy;
        }

        // This method gets called by a runtime.
        // Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            
            services.AddCors();
            services.ConfigureCors(x => x.AddPolicy("corsPolicy", corsPolicy()));

            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            // Configure the HTTP request pipeline.
            app.UseStaticFiles();

            app.UseCors("corsPolicy");

            // Add MVC to the request pipeline.
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                        name: "default",
                        template: "{controller}/{action}/{id?}",
                        defaults: new { controller = "Poker", action = "Index" });
            });
            
            app.UseSignalR();
        }
    }
}
