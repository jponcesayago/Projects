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
    public class CuestionarioRepository: ICuestionarioRepository
    {
        private readonly ApplicationDbContext _context;

        public CuestionarioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Cuestionario> BuscarCuestionario(int idCuestionario, int idUsuario)
        {
            return await _context.Cuestionario
                .Where(x => x.Id == idCuestionario && x.Activo == 1)
                .FirstOrDefaultAsync();
        }

        public async Task CreateCuestionario(Cuestionario cuestionario)
        {
            _context.Cuestionario.Add(cuestionario);
            await _context.SaveChangesAsync();
        }

        public async Task EliminarCuestionario(Cuestionario cuestionario)
        {
            cuestionario.Activo = 0;
            _context.Entry(cuestionario).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }

        public async Task<Cuestionario> GetCuestionario(int idCuestionario)
        {
            return await _context.Cuestionario
                .Include(t => t.listPreguntas)
                .ThenInclude(t => t.listRespuesta)
                .Where(x => x.Id == idCuestionario && x.Activo == 1)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Cuestionario>> GetListCuestionariosByUser(int idUsuario)
        {
            return await _context.Cuestionario
                .Where(x => x.Activo == 1 && x.UsuarioId == idUsuario)
                .ToListAsync(); 
        }

        public async Task<List<Cuestionario>> GetListCuestionarios()
        {
            return await _context.Cuestionario
                .Where(x => x.Activo == 1)
                .Select(o => new Cuestionario
                {
                    Id = o.Id,
                    Nombre = o.Nombre,
                    Descripcion = o.Descripcion,
                    FechaCreacion = o.FechaCreacion,
                    Usuario = new Usuario
                    {
                        NombreUsuario =o.Usuario.NombreUsuario
                    }
                })
                //.Include(x => x.Usuario)
                .ToListAsync();
        }
    }
}
