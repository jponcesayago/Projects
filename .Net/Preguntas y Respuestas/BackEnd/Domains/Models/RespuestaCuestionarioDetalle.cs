using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Domains.Models
{
    public class RespuestaCuestionarioDetalle
    {
        public int Id { get; set; }
        public System.Nullable<int> RespuestaCuestionarioId { get; set; }
        public RespuestaCuestionario  RespuestaCuestionario { get; set; }
        public System.Nullable<int> RespuestaId { get; set; }
        public Respuesta  Respuesta { get; set; }
    }
}
