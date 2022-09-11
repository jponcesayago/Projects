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
    public class RespuestaCuestionarioRepository : IRespuestaCuestionarioRepository
    {
        private readonly ApplicationDbContext _context;
        public RespuestaCuestionarioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            return await _context.RespuestaCuestionario
                .Where(x => x.Id == idCuestionario && x.Cuestionario.UsuarioId == idUsuario
                    && x.Activo == 1)
                .FirstOrDefaultAsync();
        }

        public async Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            respuestaCuestionario.Activo = 0;
            _context.Entry(respuestaCuestionario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetIdCuestionarioByIdRespuesta(int idRespuestaCuestionario)
        {
            var cuestionario = await _context.RespuestaCuestionario
                .Where(x => x.Id == idRespuestaCuestionario && x.Activo == 1)
                .FirstOrDefaultAsync();

            return cuestionario.CuestionarioId;
        }

        public async Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario)
        {
            return await _context.RespuestaCuestionarioDetalle
                .Where(x => x.RespuestaCuestionarioId == idRespuestaCuestionario)
                .ToListAsync();
        }

        public async Task<List<RespuestaCuestionario>> ListRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            return await _context.RespuestaCuestionario
                    .Where(x => x.CuestionarioId == idCuestionario && x.Activo == 1
                        && x.Cuestionario.UsuarioId == idUsuario)
                    .OrderByDescending(x => x.Fecha)
                    .ToListAsync();
        }

        public async Task SaveCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            respuestaCuestionario.Activo = 1;
            respuestaCuestionario.Fecha = DateTime.Now;

            _context.RespuestaCuestionario.Add(respuestaCuestionario);
            await _context.SaveChangesAsync();
        }
    }
}
