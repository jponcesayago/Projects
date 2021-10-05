using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BgGlobalChallenge.Models
{
    [Table("EquipmentPropertySpecification")]
    public partial class EquipmentPropertySpecification
    {
        [Key]
        [Column("equipmentPropertySpecificationId")]
        public long EquipmentPropertySpecificationId { get; set; }
        [Column("equipmentPropertyId")]
        public long EquipmentPropertyId { get; set; }
        [Required]
        [Column("equipmentPropertySpecificationName")]
        [StringLength(64)]
        public string EquipmentPropertySpecificationName { get; set; }
        [Column("equipmentPropertySpecificationDescription")]
        [StringLength(128)]
        public string EquipmentPropertySpecificationDescription { get; set; }
        [Column("isDeleted")]
        public bool? IsDeleted { get; set; }

        [ForeignKey(nameof(EquipmentPropertyId))]
        [InverseProperty("EquipmentPropertySpecifications")]
        public virtual EquipmentProperty EquipmentProperty { get; set; }
    }
}
