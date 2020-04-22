using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TELPA.Models.Entities
{
    public class Topic
    {
        [Key]
        public int topic_id { get; set; }

        public string name { get; set; }
    }
}