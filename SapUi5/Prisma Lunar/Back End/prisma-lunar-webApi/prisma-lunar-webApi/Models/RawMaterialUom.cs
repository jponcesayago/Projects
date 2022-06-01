using System;
using System.Collections.Generic;

namespace prisma_lunar_webApi.Models
{
    public partial class RawMaterialUom
    {
        public RawMaterialUom()
        {
            RawMaterial = new HashSet<RawMaterial>();
        }

        public int RawMaterialUomId { get; set; }
        public string RawMaterialUomName { get; set; }
        public string RawMaterialUomDescrip { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<RawMaterial> RawMaterial { get; set; }
    }
}
