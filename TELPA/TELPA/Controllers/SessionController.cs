﻿using System;
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

        public SessionController(ApplicationDbContext db, IAuthorizationService authorization)
        {
            this.db = db;
            this.authorization = authorization;
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("SessionController online");
        }

        [HttpPost]
        [Route("login")]
        public IActionResult LogIn(LoginData loginData)
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
        [Route("logout")]
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