﻿using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TELPA.Constants;

namespace TELPA.Models
{
    public class Employee : IVersionedEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public string Role { get; set; }
        [Required]
        public string Name { get; set; }
        public int? LeaderId { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        [JsonIgnore]
        public virtual Employee Leader { get; set; }
        [JsonIgnore]
        public virtual List<Employee> Subordinates { get; set; }
        [JsonIgnore]
        public virtual List<LearnedTopic> LearnedTopics { get; set; }
        [JsonIgnore]
        public virtual List<RecommendedTopic> RecommendedTopics { get; set; }
        [JsonIgnore]
        public virtual List<LearningDay> LearningDays { get; set; }
        [JsonIgnore]
        public virtual List<Limit> Limits { get; set; }
        [JsonIgnore]
        public virtual List<Invite> Invites { get; set; }

        public bool IsPassword(string password, string salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 1000,
                numBytesRequested: 256 / 8));
            return hashed == PasswordHash;
        }

        public void SetPasswordHash(string password, string salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 1000,
                numBytesRequested: 256 / 8));
            PasswordHash = hashed;
        }
    }
}
