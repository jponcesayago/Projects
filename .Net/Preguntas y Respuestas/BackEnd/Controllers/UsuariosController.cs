using BackEnd.Domains.IServices;
using BackEnd.Domains.Models;
using BackEnd.DTO;
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
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            try
            {
                var ValidateUser = await _usuarioService.ValidateExistance(usuario);
                if (ValidateUser)
                {
                    return BadRequest(new { message = "El usuario " + usuario.NombreUsuario + " ya existe!" });
                }

                usuario.Password = Encriptar.EncriptarPassword(usuario.Password);

                await _usuarioService.SaveUser(usuario);

                return Ok(new { message = "Usuario registrado con éxito!" });
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("CambiarPassword")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<IActionResult> CambiarPassword([FromBody] CambiarPasswordDTO cambiarPassword)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                int idUsuario = JwtConfigurator.GetTokenUserId(identity);
                

                string passwordEncriptado = Encriptar.EncriptarPassword(cambiarPassword.passwordAnterior);
                var usuario = await _usuarioService.ValidatePassword(idUsuario, passwordEncriptado);
                if(usuario == null)
                {
                    return BadRequest(new { message = "Password incorrecto!" });
                }

                usuario.Password = Encriptar.EncriptarPassword(cambiarPassword.nuevaPassword);

                await _usuarioService.UpdatePassword(usuario);

                return Ok(new { message = "La contraseña ha sido actualizada con exito!" });
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
