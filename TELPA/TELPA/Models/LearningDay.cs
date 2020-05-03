using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class LearningDay : IVersionedEntity
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(MAX)")]
        public string Comment { get; set; }
        [Required]
        public string EmployeeId { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual List<LearningDayTopic> LearningDayTopics { get; set; }
        public virtual List<LearningDayLink> LearningDayLinks { get; set; }
    }
}
