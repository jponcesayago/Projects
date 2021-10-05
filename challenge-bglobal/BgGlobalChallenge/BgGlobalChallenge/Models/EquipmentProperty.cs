using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BgGlobalChallenge.Models
{
    [Table("EquipmentProperty")]
    public partial class EquipmentProperty
    {
        public EquipmentProperty()
        {
            EquipmentPropertySpecifications = new HashSet<EquipmentPropertySpecification>();
            EquipmentPropertyValues = new HashSet<EquipmentPropertyValue>();
        }

        [Key]
        [Column("equipmentPropertyId")]
        public long EquipmentPropertyId { get; set; }
        [Required]
        [Column("equipmentPropertyName")]
        [StringLength(64)]
        public string EquipmentPropertyName { get; set; }
        [Column("equipmentPropertyDescription")]
        [StringLength(128)]
        public string EquipmentPropertyDescription { get; set; }
        [Column("isDeleted")]
        public bool? IsDeleted { get; set; }

        [InverseProperty(nameof(EquipmentPropertySpecification.EquipmentProperty))]
        public virtual ICollection<EquipmentPropertySpecification> EquipmentPropertySpecifications { get; set; }
        [InverseProperty(nameof(EquipmentPropertyValue.EquipmentProperty))]
        public virtual ICollection<EquipmentPropertyValue> EquipmentPropertyValues { get; set; }
    }
}
