using BackEnd.Domains.IRepositories;
using BackEnd.Domains.IServices;
using BackEnd.Domains.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class UsuariosServicios: IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        public UsuariosServicios(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task SaveUser(Usuario Usuario)
        {
           await _usuarioRepository.SaveUser(Usuario);
        }

        public async Task<bool> ValidateExistance(Usuario usuario)
        {
            return await _usuarioRepository.ValidateExistance(usuario);


        }

        public async Task<Usuario> ValidatePassword(int idUsuario, string passwordAnterior)
        {
            return await _usuarioRepository.ValidatePassword(idUsuario, passwordAnterior);


        }

        public async Task UpdatePassword(Usuario Usuario)
        {
            await _usuarioRepository.UpdatePassword(Usuario);
        }

    }
}
