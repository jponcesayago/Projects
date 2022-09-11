using BackEnd.Domains.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.Utils
{
    public class JwtConfigurator
    {
        public static string GetToken(Usuario usuario, IConfiguration configuration)
        {
            string secretKey = configuration["Jwt:SecretKey"];
            string Issuer = configuration["Jwt:Issuer"];
            string Audience = configuration["Jwt:Audience"];


            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.NombreUsuario),
                new Claim("idUsuario", usuario.Id.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);

            
        }

        public static int GetTokenUserId(ClaimsIdentity identity)
        {
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;

                foreach (Claim claim in claims)
                {
                    if (claim.Type == "idUsuario")
                    {
                        return Int32.Parse(claim.Value);
                    }
                }
            }
            return 0;
        }
    }
}
