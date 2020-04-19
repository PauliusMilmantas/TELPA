using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TELPA.Startup))]
namespace TELPA
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
