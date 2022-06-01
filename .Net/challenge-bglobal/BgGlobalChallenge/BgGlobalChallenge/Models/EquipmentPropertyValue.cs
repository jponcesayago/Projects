using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BgGlobalChallenge.Models
{
    [Table("EquipmentPropertyValue")]
    public partial class EquipmentPropertyValue
    {
        [Key]
        [Column("equipmentPropertyValueId")]
        public long EquipmentPropertyValueId { get; set; }
        [Column("equipmentId")]
        public long EquipmentId { get; set; }
        [Column("equipmentPropertyId")]
        public long EquipmentPropertyId { get; set; }
        [Required]
        [Column("value")]
        [StringLength(1024)]
        public string Value { get; set; }
        [Column("isDeleted")]
        public bool? IsDeleted { get; set; }

        [ForeignKey(nameof(EquipmentId))]
        [InverseProperty("EquipmentPropertyValues")]
        public virtual Equipment Equipment { get; set; }
        [ForeignKey(nameof(EquipmentPropertyId))]
        [InverseProperty("EquipmentPropertyValues")]
        public virtual EquipmentProperty EquipmentProperty { get; set; }
    }
}
