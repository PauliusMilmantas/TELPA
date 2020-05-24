using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
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

        public virtual Topic ParentTopic { get; set; }
        public virtual List<Topic> Subtopics { get; set; }
        public virtual List<TopicLink> TopicLinks { get; set; }
        public virtual List<LearnedTopic> LearnedTopics { get; set; }
        public virtual List<RecommendedTopic> RecommendedTopics { get; set; }
        public virtual List<LearningDayTopic> LearningDayTopics { get; set; }
    }
}
