using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TELPA.Entities;
using TELPA.Models;

namespace TELPA.Components
{
    public interface ISessionService
    {
        public Session CreateSession();
        public Session GetSession(string id);
        public Session GetSession(Employee employee);
        public void RemoveSession(string id);
        public void RemoveExpired();
    }
}
