using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Entities
{
    public class Session
    {
        public string Id { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int? EmployeeId { get; set; }
    }
}
