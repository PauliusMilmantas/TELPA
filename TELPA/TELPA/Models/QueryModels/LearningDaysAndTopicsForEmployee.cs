namespace TELPA.Models
{
    public class LearningDaysAndTopicsForEmployee
    {
        public int employeeId { get; set; }
        public int learningDayId { get; set; }
        public string learningDayDate { get; set; }
        public string learningDayComment { get; set; }
        public long learningDayVersion { get; set; }
        public int learningDayTopicId { get; set; }
        public long learningDayTopicVersion { get; set; }
        public int topicId { get; set; }
        public string topicName { get; set; }
        public string topicDescription { get; set; }
        public int topicParentTopicId { get; set; }
        public long topicVersion { get; set; }
    }
}
