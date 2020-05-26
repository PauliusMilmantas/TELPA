using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TELPA.Data;
using TELPA.Models;

namespace TELPA.Controllers
{
    [Route("api/invite")]
    public class InviteController : Controller
    {
        private ApplicationDbContext db;

        public InviteController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Json(Ok("InviteController online"));
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult GetInvite(int id)
        {
            Invite invite = db.Invites.Find(id);

            if (invite != null)
            {
                return Json(invite);
            }
            else
            {
                return NotFound("GET: Invite with ID = " + id + " was not found.");
            }
        }

        [HttpGet]
        [Route("get/link/{id}")]
        public IActionResult GetInviteByLink(string id)
        {
            Invite invite = db.Invites.FirstOrDefault(e => e.Link == id);

            if (invite != null)
            {
                return Json(invite);
            }
            else
            {
                return NotFound("GET: Invite with link = " + id + " was not found.");
            }
        }

        [HttpPost("create")]
        public IActionResult CreateInvite([FromBody] Invite invite)
        {
            if (invite != null)
            {
                db.Invites.Add(invite);
                db.SaveChanges();
                return Json(Ok("Invite created"));
            }
            else
            {
                return NotFound("CREATE: Invite was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult UpdateInvite([FromBody] Invite invite)
        {
            if (invite != null)
            {
                db.Invites.Update(invite);
                db.SaveChanges();
                return Json(Ok("Invite updated"));
            }
            else
            {
                return NotFound("UPDATE: Invite was not found");
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult DeleteInvite(int id)
        {
            try
            {
                Invite invite = db.Invites.Find(id);
                db.Invites.Remove(invite);
                db.SaveChanges();
                return Json(Ok("Invite deleted"));
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: Invite with ID = " + id + " was not found.");
            }
        }
    }
}