using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class RecommendedTopic : IVersionedEntity
    {
        [Required]
        public int TopicId { get; set; }
        [Required]
        public string EmployeeId { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        public virtual Topic Topic { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
