using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
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
        [JsonIgnore]
        [ConcurrencyCheck]
        public long Version { get; set; }

        public virtual Topic Topic { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
