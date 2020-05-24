using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
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
        [JsonIgnore]
        [ConcurrencyCheck]
        public long Version { get; set; }

        public virtual Employee Leader { get; set; }
        public virtual List<Employee> Subordinates { get; set; }
        public virtual List<LearnedTopic> LearnedTopics { get; set; }
        public virtual List<RecommendedTopic> RecommendedTopics { get; set; }
        public virtual List<LearningDay> LearningDays { get; set; }
        public virtual List<Limit> Limits { get; set; }
        public virtual List<Invite> Invites { get; set; }

        public bool IsPassword(string password)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Convert.FromBase64String(Config.salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 1000,
                numBytesRequested: 256 / 8));
            return hashed == PasswordHash;
        }

        public void SetPasswordHash(string password)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Convert.FromBase64String(Config.salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 1000,
                numBytesRequested: 256 / 8));
            PasswordHash = hashed;
        }
    }
}
