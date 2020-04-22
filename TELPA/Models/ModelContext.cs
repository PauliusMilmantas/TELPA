using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TELPA.Models.Entities;

namespace TELPA.Models
{
    public class ModelContext : DbContext
    {
        public virtual DbSet<Employee> employees { get; set; }
        public virtual DbSet<Event> events { get; set; }
        public virtual DbSet<Topic> topics { get; set; }

        public ModelContext()
            : base("name=TELPA_DB")
        { }

    }
}