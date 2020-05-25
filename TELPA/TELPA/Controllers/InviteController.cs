using System;
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
        public IActionResult ping()
        {
            return Ok("InviteController online");
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult getInvite(int id)
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

        [HttpPost("create")]
        public IActionResult createInvite([FromBody] Invite invite)
        {
            if (invite != null)
            {
                db.Invites.Add(invite);
                db.SaveChanges();
                return Ok("Invite created");
            }
            else
            {
                return NotFound("CREATE: Invite was not found");
            }
        }

        [HttpPut("update")]
        public IActionResult updateInvite([FromBody] Invite invite)
        {
            if (invite != null)
            {
                db.Invites.Update(invite);
                db.SaveChanges();
                return Ok("Invite updated");
            }
            else
            {
                return NotFound("UPDATE: Invite was not found");
            }
        }

        [HttpGet]
        [Route("delete/{id}")]
        public IActionResult deleteInvite(int id)
        {
            try
            {
                Invite invite = db.Invites.Find(id);
                db.Invites.Remove(invite);
                db.SaveChanges();
                return Ok("Invite deleted");
            }
            catch (ArgumentNullException)
            {
                return NotFound("DELETE: Invite with ID = " + id + " was not found.");
            }
        }
    }
}