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
        public DateTime LearningDayDate { get; set; }
        [Required]
        public string LearningDayEmployeeId { get; set; }
        [Required]
        public int TopicId { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        public virtual LearningDay LearningDay { get; set; }
        public virtual Topic Topic { get; set; }
        
    }
}
