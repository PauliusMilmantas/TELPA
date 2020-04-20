using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TELPA.Models
{
    public class ModelContext : DbContext
    {
        public virtual DbSet<Employee> employees { get; set; }

        public ModelContext()
            : base("name=TELPA_DB")
        { }

    }
}