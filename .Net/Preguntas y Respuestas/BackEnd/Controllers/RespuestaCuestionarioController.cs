using BackEnd.Domains.IRepositories;
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
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RespuestaCuestionarioController : ControllerBase
    {
        private readonly IRespuestaCuestionarioService _respuestaCuestionarioService;
        private readonly ICuestionarioService _cuestionarioService;

        public RespuestaCuestionarioController(IRespuestaCuestionarioService respuestaCuestionarioService,ICuestionarioService cuestionarioService)
        {
            _respuestaCuestionarioService = respuestaCuestionarioService;
            _cuestionarioService = cuestionarioService;

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RespuestaCuestionario respuestaCuestionario)
        {
            try
            {
                
                await _respuestaCuestionarioService.SaveCuestionario(respuestaCuestionario);

                return Ok(new { message = "Se guardo el cuestionario exitosamente." });
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get(int idCuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenUserId(identity);


                var listRespuestas = await _respuestaCuestionarioService.ListRespuestaCuestionario(idCuestionario, idUsuario);

                if (listRespuestas == null)
                {
                    return BadRequest(new { message = "Error al buscar el listado de respuestas." });
                }
                
                return Ok(listRespuestas);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int idCuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenUserId(identity);

                var cuestionario = await _respuestaCuestionarioService.BuscarRespuestaCuestionario(idCuestionario, idUsuario);
                if (cuestionario == null)
                {
                    return NotFound(new { message = "Cuestionario inexistente." });
                }
                else
                {
                    await _respuestaCuestionarioService.EliminarRespuestaCuestionario(cuestionario);
                }


                return Ok(cuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("GetCuestionarioByIdRespuesta/{id}")]
        [HttpGet()]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetCuestionarioByIdRespuesta(int id)
        {
            try
            {
                int idCuestionario = await _respuestaCuestionarioService.GetIdCuestionarioByIdRespuesta(id);

                var cuestionario = await _cuestionarioService.GetCuestionario(idCuestionario);

                var listRespuestas = await _respuestaCuestionarioService.GetListRespuestas(id);
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenUserId(identity);


                //var listRespuestas = await _respuestaCuestionarioService.ListRespuestaCuestionario(idCuestionario, idUsuario);

                //if (listRespuestas == null)
                //{
                //    return BadRequest(new { message = "Error al buscar el listado de respuestas." });
                //}

                return Ok(new { cuestionario = cuestionario, respuestas = listRespuestas});
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

    }
}
