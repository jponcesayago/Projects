﻿using BackEnd.Domains.IServices;
using BackEnd.Domains.Models;
using BackEnd.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly ILoginService _loginService;
        private readonly IConfiguration _configuration;

        public LoginController(ILoginService loginService, IConfiguration configuration)
        {
            _loginService = loginService;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            try
            {
                usuario.Password = Encriptar.EncriptarPassword(usuario.Password);

                var user = await _loginService.ValidateExistance(usuario);
                if (user == null)
                {
                    return BadRequest(new { message = "Usuario o contraseña inválidos!" });
                }
                string tokenString = JwtConfigurator.GetToken(user, _configuration);

                return Ok(new { token = tokenString });
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
