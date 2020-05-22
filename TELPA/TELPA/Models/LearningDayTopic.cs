using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class LearningDayTopic : IVersionedEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int LearningDayId { get; set; }
        [Required]
        public int TopicId { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        public virtual LearningDay LearningDay { get; set; }
        public virtual Topic Topic { get; set; }
        
    }
}
