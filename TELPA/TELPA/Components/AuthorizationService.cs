﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TELPA.Data;
using TELPA.Entities;
using TELPA.Exceptions;
using TELPA.Models;

namespace TELPA.Components
{
    public class AuthorizationService : IAuthorizationService
    {
        private ApplicationDbContext db;
        private ISessionService sessionService;

        public AuthorizationService(ApplicationDbContext db, ISessionService sessionService)
        {
            this.db = db;
            this.sessionService = sessionService;
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
            if (!employee.IsPassword(password))
            {
                throw new ValidationException("password", "The password is incorrect.");
            }
            return sessionService.CreateSession().Id;
        }

        public void LogOut(string id)
        {
            sessionService.RemoveSession(id);
        }
    }
}
