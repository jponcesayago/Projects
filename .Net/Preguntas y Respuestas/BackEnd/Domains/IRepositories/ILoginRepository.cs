using BackEnd.Domains.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domains.IRepositories
{
    public interface ILoginRepository
    {

        public Task<Usuario> ValidateExistance(Usuario usuario);

    }
}
