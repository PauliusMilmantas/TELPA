﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class Invite : IVersionedEntity
    {
        [Required]
        public int? Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Link { get; set; }
        [Required]
        public DateTime ExpiryDate { get; set; }
        [Required]
        public int InviterId { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        [JsonIgnore]
        public virtual Employee Inviter { get; set; }
    }
}
