﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class TopicLink : IVersionedEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int TopicId { get; set; }
        [Required]
        public string Link { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        [JsonIgnore]
        public virtual Topic Topic { get; set; }
    }
}
