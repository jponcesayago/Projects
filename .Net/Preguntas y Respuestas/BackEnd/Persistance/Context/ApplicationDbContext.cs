using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Domains.Models;


namespace BackEnd.Persistance.Context
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Pregunta> Pregunta { get; set; }
        public DbSet<Respuesta> Respuesta { get; set; }
        public DbSet<Cuestionario> Cuestionario { get; set; }
        public DbSet<RespuestaCuestionario> RespuestaCuestionario { get; set; }
        public DbSet<RespuestaCuestionarioDetalle> RespuestaCuestionarioDetalle { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base (options)
        {

        }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        //}
    }
}
