using System;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TELPA.Constants;
using TELPA.Data;
using TELPA.Entities;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private ApplicationDbContext db;
        private IOptions<Config> config;

        public AccountController(ApplicationDbContext db, IOptions<Config> config)
        {
            this.db = db;
            this.config = config;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Json(Ok("AccountController online"));
        }

        [HttpPost("invite")]
        public IActionResult Invite([FromBody] Invite invite)
        {
            if (invite != null)
            {
                invite.ExpiryDate = DateTime.Now.AddDays(7);
                using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
                {
                    while (true)
                    {
                        byte[] randomData = new byte[32];
                        rng.GetBytes(randomData);
                        string id = Convert.ToBase64String(randomData).Substring(0, 16);
                        if (db.Invites.FirstOrDefault(e => e.Link == id) == null)
                        {
                            invite.Link = id;
                            break;
                        }
                    }
                }
                db.Invites.Add(invite);
                db.SaveChanges();
                return Ok();
            }
            else
            {
                return Json(NotFound("Invite failed"));
            }
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterData registerData)
        {
            if (registerData != null && registerData.Link != null && registerData.Name != null && registerData.Password != null)
            {
                Invite invite = db.Invites.FirstOrDefault(e => e.Link == registerData.Link);
                if (invite != null && DateTime.Compare(DateTime.Now, invite.ExpiryDate) <= 0)
                {
                    Employee employee = new Employee
                    {
                        Email = invite.Email,
                        Name = registerData.Name,
                        LeaderId = invite.InviterId
                    };
                    employee.SetPasswordHash(registerData.Password, config.Value.PasswordSalt);

                    db.Employees.Add(employee);
                    db.Invites.Remove(invite);
                    db.SaveChanges();
                    return Ok();
                }
                else
                {
                    return NotFound("Invalid invite");
                }
            }
            else
            {
                return NotFound("Register failed");
            }
        }
    }
}