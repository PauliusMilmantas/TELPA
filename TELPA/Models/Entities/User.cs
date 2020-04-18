using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using TELPA.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace TELPA.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }

        [ForeignKey("team")]
        public int? user_team_id { get; set; }
        public virtual Team team { get; set; }

        public string username { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string work_no { get; set; }
        public string leader_flg { get; set; }
        public string objective { get; set; }

    }
}