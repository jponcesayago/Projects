using System;
using System.Collections.Generic;

namespace prisma_lunar_webApi.Models
{
    public partial class RawMaterial
    {
        public int RawMaterialId { get; set; }
        public string RawMaterialName { get; set; }
        public string RawMaterialDescrip { get; set; }
        public int RawMaterialCategoryId { get; set; }
        public int RawMaterialUomId { get; set; }
        public long? RawMaterialQuantity { get; set; }
        public bool IsDeleted { get; set; }

        public virtual RawMaterialCategory RawMaterialCategory { get; set; }
        public virtual RawMaterialUom RawMaterialUom { get; set; }
    }
}
