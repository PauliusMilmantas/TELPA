using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class Topic : IVersionedEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(MAX)")]
        public string Description { get; set; }
        public int? ParentTopicId { get; set; }
        [JsonIgnore]
        [ConcurrencyCheck]
        public long Version { get; set; }

        [JsonIgnore]
        public virtual Topic ParentTopic { get; set; }
        [JsonIgnore]
        public virtual List<Topic> Subtopics { get; set; }
        [JsonIgnore]
        public virtual List<TopicLink> TopicLinks { get; set; }
        [JsonIgnore]
        public virtual List<LearnedTopic> LearnedTopics { get; set; }
        [JsonIgnore]
        public virtual List<RecommendedTopic> RecommendedTopics { get; set; }
        [JsonIgnore]
        public virtual List<LearningDayTopic> LearningDayTopics { get; set; }
    }
}
