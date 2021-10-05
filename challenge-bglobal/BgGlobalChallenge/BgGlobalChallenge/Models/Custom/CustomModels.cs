using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BgGlobalChallenge.Models.Custom
{
    public class CustomModels
    {

        public class EquipmentPropertyList
        {
            public string equipmentClassName { get; set; }
            public string equipmentName { get; set; }
            [Display(Name = "Marca")]
            public string brand { get; set; }
            [Required(ErrorMessage = "'Modelo' es requerido ")]
            [StringLength(20, ErrorMessage = "'Modelo' longitud máxima 20 caracteres ")]
            [Display(Name ="Modelo")]
            public string model { get; set; }
            [Required(ErrorMessage = "'Patente' es requerido con 8 caracteres")]
            [StringLength(8)]
            [Display(Name = "Patente")]
            public string patent { get; set; }
            [Display(Name = "Titular")]
            public string owner { get; set; }
            [Required]
            [Range(0, 20)]
            [RegularExpression("^[0-9]*$", ErrorMessage = "'Puertas' es un dato númerico menor a 20")]
            [Display(Name = "Puertas")]
            public string doors { get; set; }
            public List<SelectListItem> brandList { get; set; }
            public List<SelectListItem> ownerList { get; set; }
        }


        public class SelectListItem
        {
            public long id { get; set; }
            public string label { get; set; }
            public string code { get; set; }

        }


        public class reqresUsersData
        {
            public int page { get; set; }
            public int per_page { get; set; }
            public int total { get; set; }
            public int total_pages { get;  set; }
            public List<userData> data { get; set; }

        }

        public class userData
        {
            public long id { get; set; }
            public string email { get; set; }
            public string first_name { get; set; }
            public string last_name { get; set; }
            public string avatar { get; set; }
        }

        public class brandOwnerData
        {
            public List<EquipmentPropertySpecification> equipmentPropertySpecifications { get; set; }
            public List<userData> userData { get; set; }
        }

    }
}
