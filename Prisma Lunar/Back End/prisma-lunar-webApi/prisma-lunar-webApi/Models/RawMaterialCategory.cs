using System;
using System.Collections.Generic;

namespace prisma_lunar_webApi.Models
{
    public partial class RawMaterialCategory
    {
        public RawMaterialCategory()
        {
            RawMaterial = new HashSet<RawMaterial>();
        }

        public int RawMaterialCategoryId { get; set; }
        public string RawMaterialCategoryName { get; set; }
        public string RawMaterialCategoryDescrip { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<RawMaterial> RawMaterial { get; set; }
    }
}
