using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Models
{
    interface IVersionedEntity
    {
        [ConcurrencyCheck]
        public long Version { get; set; }
        public void OnSaveChanges()
        {
            Version++;
        }
    }
}
