using BackEnd.Domains.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domains.IRepositories
{
    public interface IRespuestaCuestionarioRepository
    {
        public Task SaveCuestionario(RespuestaCuestionario respuestaCuestionario);
        public Task<List<RespuestaCuestionario>> ListRespuestaCuestionario(int idCuestionario, int idUsuario);
        public Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idCuestionario, int idUsuario);
        public Task<int> GetIdCuestionarioByIdRespuesta(int idRespuestaCuestionario);
        public Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario);
        public Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario);

    }
}
