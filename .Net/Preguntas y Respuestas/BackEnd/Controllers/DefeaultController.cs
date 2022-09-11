using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DefeaultController : ControllerBase
    {
        
        [HttpGet]
        public string Get()
        {
            return "API Preguntas y Respuestas";
        }
    }
}
