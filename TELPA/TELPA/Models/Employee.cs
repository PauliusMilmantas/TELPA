using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class Employee : IVersionedEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        public string Role { get; set; }
        [Required]
        public string Name { get; set; }
        public int? LeaderId { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        public virtual Employee Leader { get; set; }
        public virtual List<Employee> Subordinates { get; set; }
        public virtual List<LearnedTopic> LearnedTopics { get; set; }
        public virtual List<RecommendedTopic> RecommendedTopics { get; set; }
        public virtual List<LearningDay> LearningDays { get; set; }
        public virtual List<Limit> Limits { get; set; }
        public virtual List<Invite> Invites { get; set; }
    }
}
