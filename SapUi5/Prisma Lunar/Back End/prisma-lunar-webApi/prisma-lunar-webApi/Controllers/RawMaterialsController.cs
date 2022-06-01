using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using prisma_lunar_webApi.Models;


namespace prisma_lunar_webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RawMaterialsController : ControllerBase
    {

        private readonly RawMaterialContext _context;

        public RawMaterialsController(RawMaterialContext context)
        {
            _context = context;
        }

        //Get Raw Materials
        [HttpGet("GetRawMaterials")]
        public List<RawMaterial> GetRawMaterials()
        {
            List<RawMaterial> rawMaterialsList2 = new List<RawMaterial>();

            var rawMaterialsList = _context.RawMaterial.ToList();


            return rawMaterialsList;
        }

        // GET: api/RawMaterials
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/RawMaterials/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/RawMaterials
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/RawMaterials/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
