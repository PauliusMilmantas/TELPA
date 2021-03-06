﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class LearnedTopic : IVersionedEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int TopicId { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        [JsonIgnore]
        public virtual Topic Topic { get; set; }
        [JsonIgnore]
        public virtual Employee Employee { get; set; }
    }
}
