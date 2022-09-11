using BackEnd.Domains.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domains.IRepositories
{
    public interface ICuestionarioRepository
    {

        public Task CreateCuestionario(Cuestionario cuestionario);
        public Task<List<Cuestionario>> GetListCuestionariosByUser(int idUsuario);
        public Task<List<Cuestionario>> GetListCuestionarios();
        public Task<Cuestionario> GetCuestionario(int idCuestionario);
        public Task<Cuestionario> BuscarCuestionario(int idCuestionario, int idUsuario);
        public Task EliminarCuestionario(Cuestionario cuestionario);

    }
}
