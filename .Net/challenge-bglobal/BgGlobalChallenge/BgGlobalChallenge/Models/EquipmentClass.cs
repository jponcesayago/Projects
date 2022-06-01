using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BgGlobalChallenge.Models
{
    [Table("EquipmentClass")]
    public partial class EquipmentClass
    {
        public EquipmentClass()
        {
            Equipment = new HashSet<Equipment>();
        }

        [Key]
        [Column("equipmentClassId")]
        public long EquipmentClassId { get; set; }
        [Required]
        [Column("equipmentClassName")]
        [StringLength(64)]
        public string EquipmentClassName { get; set; }
        [Column("equipmentClassDescription")]
        [StringLength(128)]
        public string EquipmentClassDescription { get; set; }
        [Column("isDeleted")]
        public bool? IsDeleted { get; set; }

        [InverseProperty("EquipmentClass")]
        public virtual ICollection<Equipment> Equipment { get; set; }
    }
}
