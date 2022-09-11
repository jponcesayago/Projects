using BackEnd.Domains.IRepositories;
using BackEnd.Domains.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class RespuestaCuestionarioService : IRespuestaCuestionarioService
    {
        private readonly IRespuestaCuestionarioRepository _respuestaCuestionarioRepository;
        public RespuestaCuestionarioService(IRespuestaCuestionarioRepository respuestaCuestionarioRepository)
        {
            _respuestaCuestionarioRepository = respuestaCuestionarioRepository;
        }

        public async Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            return await _respuestaCuestionarioRepository.BuscarRespuestaCuestionario(idCuestionario, idUsuario);
        }

        public async Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            await _respuestaCuestionarioRepository.EliminarRespuestaCuestionario(respuestaCuestionario);
        }

        public async Task<int> GetIdCuestionarioByIdRespuesta(int idRespuestaCuestionario)
        {
            return await _respuestaCuestionarioRepository.GetIdCuestionarioByIdRespuesta(idRespuestaCuestionario);
        }

        public async Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario)
        {
            return await _respuestaCuestionarioRepository.GetListRespuestas(idRespuestaCuestionario);
        }

        public async  Task<List<RespuestaCuestionario>> ListRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            return await _respuestaCuestionarioRepository.ListRespuestaCuestionario(idCuestionario, idUsuario);
        }

        public async  Task SaveCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            await _respuestaCuestionarioRepository.SaveCuestionario(respuestaCuestionario);
        }
    }
}
