using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TELPA.Models
{
    public class ModelContext : DbContext
    {
        public ModelContext()
            : base("name=TELPA_DB")
        { }

        public virtual DbSet<User> Users { get; set; }
    }
}