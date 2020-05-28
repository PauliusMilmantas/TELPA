using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Constants
{
    public class Config
    {
        //Pereinant ant serverio, reikės šitą pakeisti.
        public string LocalApiAddress { get; set; }
        //Druska slaptažodžio maišai
        public string PasswordSalt { get; set; }
        public List<ServiceConfig> Services { get; set; }
    }
}
