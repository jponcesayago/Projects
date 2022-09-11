using BackEnd.Domains.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domains.IServices
{
    public interface ILoginService
    {

        public Task<Usuario> ValidateExistance(Usuario usuario);
    }
}
