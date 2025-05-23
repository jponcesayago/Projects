﻿using BackEnd.Domains.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domains.IRepositories
{
    public interface IUsuarioRepository
    {
        Task SaveUser(Usuario Usuario);
        Task<bool> ValidateExistance(Usuario Usuario);
        Task<Usuario> ValidatePassword(int idUsuario, string passwordAnterior);
        Task UpdatePassword(Usuario Usuario);
    }
}
