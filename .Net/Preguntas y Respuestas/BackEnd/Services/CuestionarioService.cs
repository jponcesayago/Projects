using BackEnd.Domains.IRepositories;
using BackEnd.Domains.IServices;
using BackEnd.Domains.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class CuestionarioService: ICuestionarioService
    {
        private readonly ICuestionarioRepository _cuestionarioService;

        public CuestionarioService(ICuestionarioRepository cuestionarioRepository)
        {
            _cuestionarioService = cuestionarioRepository;
        }
        public async Task CreateCuestionario(Cuestionario cuestionario)
        {
            await _cuestionarioService.CreateCuestionario(cuestionario);
            
        }

        public async Task<Cuestionario> GetCuestionario(int idCuestionario)
        {
            return await _cuestionarioService.GetCuestionario(idCuestionario);
        }

        public async Task<List<Cuestionario>> GetListCuestionariosByUser(int idUsuario)
        {
            return await _cuestionarioService.GetListCuestionariosByUser(idUsuario);
        }

        public async Task<Cuestionario> BuscarCuestionario(int idCuestionario, int idUsuario)
        {
            return await _cuestionarioService.BuscarCuestionario(idCuestionario, idUsuario);
        }

        public async Task EliminarCuestionario(Cuestionario cuestionario)
        {
            await _cuestionarioService.EliminarCuestionario(cuestionario);

        }

        public async Task<List<Cuestionario>> GetListCuestionarios()
        {
            return await _cuestionarioService.GetListCuestionarios();
        }
    }
}
