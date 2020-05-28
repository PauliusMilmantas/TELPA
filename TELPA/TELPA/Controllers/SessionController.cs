using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Components;
using TELPA.Data;
using TELPA.Entities;
using TELPA.Exceptions;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/session")]
    public class SessionController : Controller
    {
        private ApplicationDbContext db;
        private IAuthorizationService authorization;
        private ISessionService session;

        public SessionController(ApplicationDbContext db, IAuthorizationService authorization, ISessionService session)
        {
            this.db = db;
            this.authorization = authorization;
            this.session = session;
        }

        [Authenticated]
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Json(Ok("SessionController online"));
        }

        [Authenticated]
        [HttpGet]
        [Route("me")]
        public IActionResult Me()
        {
            string token = Request.Headers["X-SessionToken"];
            Employee me = db.Employees.Find(session.GetSession(token).EmployeeId);
            if(me != null)
            {
                return Json(me);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("logIn")]
        public IActionResult LogIn([FromBody] LoginData loginData)
        {
            try
            {
                string token = authorization.LogIn(loginData.Email, loginData.Password);
                Response.Headers["X-SessionToken"] = token;
                return Ok();
            }
            catch (ValidationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        [Route("logOut")]
        public IActionResult LogOut()
        {
            if (Request.Headers.ContainsKey("X-SessionToken"))
            {
                string token = Request.Headers["X-SessionToken"];
                authorization.LogOut(token);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}