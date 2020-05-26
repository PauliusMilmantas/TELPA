using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Exceptions
{
    public class ValidationException : Exception
    {
        public string Field { get; set; }
        public ValidationException(string field, string message) : base(message)
        {
            this.Field = field;
        }
    }
}
