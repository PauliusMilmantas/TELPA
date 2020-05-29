using System;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TELPA.Components;
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
        private IEmailService emailService;

        public AccountController(ApplicationDbContext db, IOptions<Config> config, IEmailService emailService)
        {
            this.db = db;
            this.config = config;
            this.emailService = emailService;
        }

        [HttpGet("ping")]
        public IActionResult ping()
        {
            return Json(Ok("AccountController online"));
        }

        [Logged]
        [Authenticated]
        [HttpPost("invite")]
        public IActionResult Invite([FromBody] Invite inviteReq)
        {
            var alphabet = "abcdefghifklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            if (inviteReq != null)
            {
                var invite = new Invite()
                {
                    Email = inviteReq.Email,
                    InviterId = inviteReq.InviterId
                };
                invite.ExpiryDate = DateTime.Now.AddDays(7);
                using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
                {
                    while (true)
                    {
                        byte[] randomData = new byte[32];
                        rng.GetBytes(randomData);
                        string id = string.Join("", Convert.ToBase64String(randomData).Where(c => alphabet.Contains(c)).ToList()).Substring(0, 16);
                        if (db.Invites.FirstOrDefault(e => e.Link == id) == null)
                        {
                            invite.Link = id;
                            break;
                        }
                    }
                }
                db.Invites.Add(invite);
                db.SaveChanges();
                this.emailService.SendEmail(
                    new EmailData()
                    {
                        ReceiverAddress = invite.Email,
                        Subject = "Invitation to TELPA",
                        Body = "You have been invited to TELPA. Register using this link:\n" + this.config.Value.ServerURL + "register?link=" + invite.Link
                    });
                return Ok();
            }
            else
            {
                return NotFound(Json("Invite failed"));
            }
        }

        [Logged]
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