using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TELPA.Models;

namespace TELPA.Components
{
    public interface IAuthorizationService
    {
        public string LogIn(string email, string password);
        public void LogOut(string id);
        public bool IsLoggedIn(string id);
        public bool IsLeader(string id, Employee potentialSubordinate);
    }
}
