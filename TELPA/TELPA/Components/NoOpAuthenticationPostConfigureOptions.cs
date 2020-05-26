using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Components
{
    public class NoOpAuthenticationPostConfigureOptions : IPostConfigureOptions<NoOpAuthenticationOptions>
    {
        public void PostConfigure(string name, NoOpAuthenticationOptions options)
        {

        }
    }
}
