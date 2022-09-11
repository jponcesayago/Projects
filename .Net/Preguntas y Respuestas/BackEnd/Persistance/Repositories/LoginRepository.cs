using BackEnd.Domains.IRepositories;
using BackEnd.Domains.Models;
using BackEnd.Persistance.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Persistance.Repositories
{
    public class LoginRepository: ILoginRepository
    {
        private readonly ApplicationDbContext _context;
        public LoginRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario> ValidateExistance(Usuario usuario)
        {
           return await _context.Usuario.Where(x => x.NombreUsuario.ToLower() == usuario.NombreUsuario 
                        && x.Password == usuario.Password).FirstOrDefaultAsync();
        }
    }
}
