using BackEnd.Domains.IServices;
using BackEnd.Domains.Models;
using BackEnd.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuestionarioController : ControllerBase
    {

        private readonly ICuestionarioService _cuestionarioService;
        public CuestionarioController(ICuestionarioService cuestionarioService)
        {
            _cuestionarioService = cuestionarioService;

        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody]Cuestionario cuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenUserId(identity);

                cuestionario.UsuarioId = idUsuario;
                cuestionario.Activo = 1;
                cuestionario.FechaCreacion = DateTime.Now;


                await _cuestionarioService.CreateCuestionario(cuestionario);

                return Ok(new { message = "resultado cuestionario guardado exitosamente." });
            }
            catch ( Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        
        [Route("GetListCuestionariosByUser")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListCuestionariosByUser()
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenUserId(identity);

                var cuestionarios = await _cuestionarioService.GetListCuestionariosByUser(idUsuario);
                return Ok(cuestionarios);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [Route("GetListCuestionarios")]
        [HttpGet]
        public async Task<IActionResult> GetListCuestionarios()
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenUserId(identity);

                var cuestionarios = await _cuestionarioService.GetListCuestionarios();
                return Ok(cuestionarios);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{idCuestionario}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetCuestionario(int idCuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenUserId(identity);

                var cuestionario = await _cuestionarioService.GetCuestionario(idCuestionario);
                return Ok(cuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }




        [HttpDelete("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> EliminarCuestionario(int idCuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenUserId(identity);

                var cuestionario = await _cuestionarioService.BuscarCuestionario(idCuestionario, idUsuario);
                if (cuestionario == null)
                {
                    return NotFound(new { message = "Cuestionario inexistente." });
                }
                else
                {
                    await _cuestionarioService.EliminarCuestionario(cuestionario);
                }
                

                return Ok(cuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
