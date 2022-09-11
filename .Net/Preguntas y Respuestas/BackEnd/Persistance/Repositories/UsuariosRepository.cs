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
    public class UsuariosRepository: IUsuarioRepository
    {
        private readonly ApplicationDbContext _context;
        public UsuariosRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task SaveUser(Usuario usuario)
        {
            _context.Add(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ValidateExistance(Usuario usuario)
        {
            var user = await _context.Usuario.AnyAsync(x => x.NombreUsuario.ToLower() == usuario.NombreUsuario.ToLower());

            return user;

        }

        public async Task<Usuario> ValidatePassword(int idUsuario, string passwordAnterior)
        {

            var usuario = await _context.Usuario.Where(x => x.Id == idUsuario && x.Password == passwordAnterior).FirstOrDefaultAsync();

            return usuario;

        }

        public async Task UpdatePassword(Usuario Usuario)
        {
             _context.Usuario.Update(Usuario);
            await _context.SaveChangesAsync();
        }
    }
}
