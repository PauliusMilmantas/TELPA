using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TELPA.Constants;
using TELPA.Data;
using TELPA.Entities;
using TELPA.Exceptions;
using TELPA.Models;

namespace TELPA.Components
{
    public class AuthorizationService : IAuthorizationService
    {
        private ApplicationDbContext db;
        private IHttpContextAccessor httpContextAccessor;
        private ISessionService sessionService;
        private IOptions<Config> config;

        public AuthorizationService(ApplicationDbContext db, IHttpContextAccessor httpContextAccessor, ISessionService sessionService, IOptions<Config> config)
        {
            this.db = db;
            this.httpContextAccessor = httpContextAccessor;
            this.sessionService = sessionService;
            this.config = config;
        }


        public Employee Me
        {
            get
            {
                string id = httpContextAccessor.HttpContext.Request.Headers["X-SessionToken"];

                if (!IsLoggedIn(id))
                {
                    return null;
                }
                Employee me = db.Employees.Find(sessionService.GetSession(id).EmployeeId);
                return me;
            }
        }

        public bool IsLeader(Employee potentialSubordinate)
        {
            string id = httpContextAccessor.HttpContext.Request.Headers["X-SessionToken"];

            if (!IsLoggedIn(id))
            {
                return false;
            }
            Employee potentialLeader = db.Employees.Find(sessionService.GetSession(id).EmployeeId);
            Employee current = potentialSubordinate;
            while (true)
            {
                if (current.Id == potentialLeader.Id)
                {
                    return true;
                }
                if (current.LeaderId != null)
                {
                    current = current.Leader;
                }
                else
                {
                    return false;
                }
            }
        }

        public bool IsLoggedIn()
        {
            string id = httpContextAccessor.HttpContext.Request.Headers["X-SessionToken"];
            if (id == null)
            {
                return false;
            }
            Session session = sessionService.GetSession(id);
            return session != null && session.EmployeeId != null;
        }

        public void LogOut()
        {
            string id = httpContextAccessor.HttpContext.Request.Headers["X-SessionToken"];
            sessionService.RemoveSession(id);
        }

        public bool IsLeader(string id, Employee potentialSubordinate)
        {
            if (!IsLoggedIn(id))
            {
                return false;
            }
            Employee potentialLeader = db.Employees.Find(sessionService.GetSession(id).EmployeeId);
            Employee current = potentialSubordinate;
            while (true)
            {
                if (current.Id == potentialLeader.Id)
                {
                    return true;
                }
                if (current.LeaderId != null)
                {
                    current = current.Leader;
                }
                else
                {
                    return false;
                }
            }
        }

        public bool IsLoggedIn(string id)
        {
            if (id == null)
            {
                return false;
            }
            Session session = sessionService.GetSession(id);
            return session != null && session.EmployeeId != null;
        }

        public string LogIn(string email, string password)
        {
            Employee employee = db.Employees.FirstOrDefault(e => e.Email == email);
            if (employee == null)
            {
                throw new ValidationException("email", "The email is not registered.");
            }
            if (!employee.IsPassword(password, config.Value.PasswordSalt))
            {
                throw new ValidationException("password", "The password is incorrect.");
            }
            Session session = sessionService.CreateSession();
            session.EmployeeId = employee.Id;
            return session.Id;
        }

        public void LogOut(string id)
        {
            sessionService.RemoveSession(id);
        }
    }
}
