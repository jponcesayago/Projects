﻿// <auto-generated />
using System;
using BackEnd.Persistance.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackEnd.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220622234426_v1.1")]
    partial class v11
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.25")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BackEnd.Domains.Models.Cuestionario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Activo")
                        .HasColumnType("int");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Cuestionario");
                });

            modelBuilder.Entity("BackEnd.Domains.Models.Pregunta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CuestionarioId")
                        .HasColumnType("int");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("CuestionarioId");

                    b.ToTable("Pregunta");
                });

            modelBuilder.Entity("BackEnd.Domains.Models.Respuesta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<bool>("EsCorrecta")
                        .HasColumnType("bit");

                    b.Property<int>("PreguntaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PreguntaId");

                    b.ToTable("Respuesta");
                });

            modelBuilder.Entity("BackEnd.Domains.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NombreUsuario")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("BackEnd.Domains.Models.Cuestionario", b =>
                {
                    b.HasOne("BackEnd.Domains.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BackEnd.Domains.Models.Pregunta", b =>
                {
                    b.HasOne("BackEnd.Domains.Models.Cuestionario", "Cuestionario")
                        .WithMany("Pregunta")
                        .HasForeignKey("CuestionarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BackEnd.Domains.Models.Respuesta", b =>
                {
                    b.HasOne("BackEnd.Domains.Models.Pregunta", "Pregunta")
                        .WithMany("Respuesta")
                        .HasForeignKey("PreguntaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}