using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
