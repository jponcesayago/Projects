using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BgGlobalChallenge.Models
{
    public partial class Equipment
    {
        public Equipment()
        {
            EquipmentPropertyValues = new HashSet<EquipmentPropertyValue>();
        }

        [Key]
        [Column("equipmentId")]
        public long EquipmentId { get; set; }
        [Required]
        [Column("equipmentName")]
        [StringLength(64)]
        public string EquipmentName { get; set; }
        [Column("equipmentDescription")]
        [StringLength(128)]
        public string EquipmentDescription { get; set; }
        [Column("equipmentClassId")]
        public long EquipmentClassId { get; set; }
        [Column("isDeleted")]
        public bool? IsDeleted { get; set; }

        [ForeignKey(nameof(EquipmentClassId))]
        [InverseProperty("Equipment")]
        public virtual EquipmentClass EquipmentClass { get; set; }
        [InverseProperty(nameof(EquipmentPropertyValue.Equipment))]
        public virtual ICollection<EquipmentPropertyValue> EquipmentPropertyValues { get; set; }
    }
}
