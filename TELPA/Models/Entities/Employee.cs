using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using TELPA.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace TELPA.Models
{
    public class Employee
    {
        [Key]
        public int emp_id { get; set; }

        [ForeignKey("team")]
        public int? emp_tem_id { get; set; }
        public virtual Team team { get; set; }

        public string emp_usr_id { get; set; }  // string laukas pagal AspNetUsers generuojama lentele

        public string display_name { get; set; }
        public string last_name { get; set; }
        public string work_no { get; set; }
        public string leader_flg { get; set; }
        public string objective { get; set; }
    }
}