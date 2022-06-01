using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BgGlobalChallenge.Models;
using static BgGlobalChallenge.Models.Custom.CustomModels;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using BgGlobalChallenge.Services;

namespace BgGlobalChallenge.Controllers
{
    public class EquipmentController : Controller
    {

        private readonly operationDbContextReport _context;

        public EquipmentController(operationDbContextReport context)
        {
            _context = context;
        }


        public IActionResult Index()
        {

            try
            {

                List<Equipment> equipments = _context.Equipment
                    .Where(t => t.IsDeleted == false && t.EquipmentClass.EquipmentClassName == "vehicle")
                    .ToList();

                List<EquipmentPropertyList> equipmentPropList = EquipmentPropertyLists(equipments);

                return View(equipmentPropList);
            }
            catch (Exception e)
            {
                List<EquipmentPropertyList> equipmentPropList = new List<EquipmentPropertyList>();
                return View(equipmentPropList);
            }


        }

        public List<EquipmentPropertyList> EquipmentPropertyLists(List<Equipment> equipments)
        {

            try
            {

                List<EquipmentPropertyList> equipmentPropList = new List<EquipmentPropertyList>();


                List<EquipmentProperty> equipProperties = _context.EquipmentProperties
                    .Where(t => t.IsDeleted == false)
                    .ToList();


                foreach (var item in equipments)
                {
                    string brand = "";
                    string model = "";
                    string patent = "";
                    string owner = "";
                    string doors = "";

                    foreach (var equipProperty in equipProperties)
                    {
                        EquipmentPropertyValue equipmentPropertyValue = _context.EquipmentPropertyValues
                            .Where(t => t.EquipmentPropertyId == equipProperty.EquipmentPropertyId && t.EquipmentId == item.EquipmentId)
                            .FirstOrDefault();

                        switch (equipmentPropertyValue.EquipmentProperty.EquipmentPropertyName)
                        {
                            case "brand":
                                brand = equipmentPropertyValue.Value;
                                break;
                            case "model":
                                model = equipmentPropertyValue.Value;
                                break;
                            case "patent":
                                patent = equipmentPropertyValue.Value;
                                break;
                            case "owner":
                                owner = equipmentPropertyValue.Value;
                                break;
                            case "doors":
                                doors = equipmentPropertyValue.Value;
                                break;
                        }
                    }

                    EquipmentPropertyList equipmentPropertyListItem = new EquipmentPropertyList()
                    {
                        brand = brand,
                        model = model,
                        patent = patent,
                        owner = owner,
                        doors = doors
                    };

                    equipmentPropList.Add(equipmentPropertyListItem);



                }

                return equipmentPropList;

            }
            catch (Exception e)
            {
                return null;
            }

        }


        /// <summary>
        /// ////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> Create()
        {
            try
            {
                List<EquipmentPropertySpecification> equipmentPropertySpecifications = _context.EquipmentPropertySpecifications
                .Where(t => t.IsDeleted == false && t.EquipmentProperty.EquipmentPropertyName == "brand")
                .ToList();


                string[] pages = new string[] { "1", "2", "3" };

                List<userData> userData = await RestApiQueries.Users(pages);

                brandOwnerData brandOwnerData = new brandOwnerData()
                {
                    equipmentPropertySpecifications = equipmentPropertySpecifications,
                    userData = userData
                };


                EquipmentPropertyList equipmentPropertyList1 = CreateSelectListItems(brandOwnerData);


                EquipmentPropertyList equipmentPropertyList = new EquipmentPropertyList()
                {
                    brandList = equipmentPropertyList1.brandList,
                    ownerList = equipmentPropertyList1.ownerList
                };
                return View(equipmentPropertyList);
            }
            catch (Exception e)
            {
                return View();
            }
           
        }


        public EquipmentPropertyList CreateSelectListItems(brandOwnerData brandOwnerData)
        {
            List<SelectListItem> brandListItems = new List<SelectListItem>();
            List<SelectListItem> ownerListItems = new List<SelectListItem>();

            foreach (var item in brandOwnerData.userData)
            {

                SelectListItem selectListItem = new SelectListItem()
                {
                    id = item.id,
                    label = item.last_name + ", " + item.first_name,
                    code = item.last_name
                };

                ownerListItems.Add(selectListItem);
            }

            foreach (var item in brandOwnerData.equipmentPropertySpecifications)
            {
                SelectListItem selectListItem = new SelectListItem()
                {
                    id = item.EquipmentPropertySpecificationId,
                    label = item.EquipmentPropertySpecificationName,
                    code = item.EquipmentPropertySpecificationName
                };

                brandListItems.Add(selectListItem);
            }

            EquipmentPropertyList equipmentPropertyList = new EquipmentPropertyList()
            {
                brandList = brandListItems,
                ownerList = ownerListItems
            };

            return equipmentPropertyList;

        }



        /// <summary>
        /// ////////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("brand,model,patent,owner, doors")] EquipmentPropertyList data)
        {
            if (ModelState.IsValid)
            {
                try
                {


                    EquipmentClass equipmentClass = _context.EquipmentClasses
                        .Where(t => t.IsDeleted == false && t.EquipmentClassName == "vehicle")
                        .FirstOrDefault();

                    string lastEquipmentNameNumber = LastEquipmentNumber(equipmentClass.EquipmentClassName);

                    Equipment equipment = new Equipment()
                    {
                        EquipmentClassId = equipmentClass.EquipmentClassId,
                        EquipmentName = equipmentClass.EquipmentClassName + (Int16.Parse(lastEquipmentNameNumber) + 1),
                        EquipmentDescription  = "",
                        IsDeleted = false
                    };

                    _context.Equipment.Add(equipment);

                    await _context.SaveChangesAsync();


                    EquipmentPropertyValues(data);

                     await _context.SaveChangesAsync();

                    TempData["message"] = "El vehículo se ha dado de alta correctamente";

                    return RedirectToAction(nameof(Index));
                }
                catch (Exception e)
                {
                    return RedirectToAction(nameof(Index));
                }

               
            }
            return View();
        }



        public string LastEquipmentNumber(string equipmentClassName)
        {
            try
            {
                Equipment lastEquipment = _context.Equipment
                       .Where(t => t.IsDeleted == false)
                       .OrderBy(t => t.EquipmentId)
                       .Last();


                string lastEquipmentName = "";

                if (lastEquipment == null)
                {
                    lastEquipmentName = equipmentClassName + "0";
                }
                else
                {
                    lastEquipmentName = lastEquipment.EquipmentName;
                }

                return new String(lastEquipmentName.Where(Char.IsDigit).ToArray());
            }
            catch(Exception e)
            {
                return "";
            }
            


            
        }


        public void EquipmentPropertyValues(EquipmentPropertyList data)
        {

            try
            {

                List<EquipmentProperty> equipmentProperties = _context.EquipmentProperties
                    .Where(t => t.IsDeleted == false)
                    .ToList();

                Equipment newEquipment = _context.Equipment
                      .OrderBy(t => t.EquipmentId)
                      .Last();

                string value = "";
                foreach (var item in equipmentProperties)
                {
                    value = "";
                    switch (item.EquipmentPropertyName)
                    {
                        case "brand":
                            value = data.brand;
                            break;
                        case "model":
                            value = data.model;
                            break;
                        case "patent":
                            value = data.patent;
                            break;
                        case "owner":
                            value = data.owner;
                            break;
                        case "doors":
                            value = data.doors;
                            break;
                    }

                    EquipmentPropertyValue equipmentPropertyValue = new EquipmentPropertyValue()
                    {
                        EquipmentId = newEquipment.EquipmentId,
                        EquipmentPropertyId = item.EquipmentPropertyId,
                        Value = value
                    };

                    _context.EquipmentPropertyValues.Add(equipmentPropertyValue);
                }

            }
            catch (Exception e)
            {

            }

           

        }
    }
}
