using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    public class Limit : IVersionedEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [Required]
        public string StartDate { get; set; }
        [Required]
        public string EndDate { get; set; }
        [Required]
        public int MaxConsecutiveLearningDays { get; set; }
        [Required]
        public int MaxTotalLearningDays { get; set; }
        [ConcurrencyCheck]
        public long Version { get; set; }

        public virtual Employee Employee { get; set; }

        private bool RepeatingDateLessThan(string x, string y)
        {
            var x_parts = x.Split("-");
            var y_parts = y.Split("-");
            for (int i = 0; i < 3; i++)
            {
                if (x_parts[i].Contains("*") || y_parts[i].Contains("*"))
                {
                    continue;
                }
                else
                {
                    if (int.Parse(x_parts[i]) >= int.Parse(x_parts[i]))
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        public bool IsInInterval(DateTime date)
        {
            var date_string = date.Year + "-" + date.Month + date.Day;
            return RepeatingDateLessThan(EndDate, date_string) && !RepeatingDateLessThan(StartDate, date_string);
        }
    }
}
