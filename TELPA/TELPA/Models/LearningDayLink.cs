using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class LearningDayLink : IVersionedEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int LearningDayId { get; set; }
        [Required]
        public string Link { get; set; }
        [JsonIgnore]
        [ConcurrencyCheck]
        public long Version { get; set; }

        public LearningDay LearningDay { get; set; }
    }
}
