using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class LearningDayLink : IVersionedEntity
    {
        [Required]
        public DateTime LearningDayDate { get; set; }
        [Required]
        public string LearningDayEmployeeId { get; set; }
        [Required]
        public string Link { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        public LearningDay LearningDay { get; set; }
    }
}
