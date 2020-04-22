using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using TELPA.Models.Entities;

namespace TELPA.Models
{
    public class Event
    {
        [Key]
        public int event_id { get; set; }

        [ForeignKey("employee")]
        public int? emp_id { get; set; }
        public virtual Employee employee { get; set; }

        [ForeignKey("topic")]
        public int? topic_id { get; set; }
        public virtual Topic topic {get;set;}

        public string objective { get; set; }

        public string date { get; set; }

        public string description { get; set; }
    }
}