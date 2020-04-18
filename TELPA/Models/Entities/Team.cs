using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TELPA.Models.Entities
{
    public class Team
    {
        [Key]
        public int team_id { get; set; }
        public string team_name { get; set; }
        public string team_description { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}