﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class v12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RespuestaCuestionario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreParticipante = table.Column<string>(type: "varchar(100)", nullable: false),
                    Fecha = table.Column<DateTime>(nullable: false),
                    Activo = table.Column<int>(nullable: false),
                    CuestionarioId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestaCuestionario", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RespuestaCuestionario_Cuestionario_CuestionarioId",
                        column: x => x.CuestionarioId,
                        principalTable: "Cuestionario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RespuestaCuestionarioDetalle",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RespuestaCuestionarioId = table.Column<int>(nullable: true),
                    RespuestaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestaCuestionarioDetalle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RespuestaCuestionarioDetalle_RespuestaCuestionario_RespuestaCuestionarioId",
                        column: x => x.RespuestaCuestionarioId,
                        principalTable: "RespuestaCuestionario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RespuestaCuestionarioDetalle_Respuesta_RespuestaId",
                        column: x => x.RespuestaId,
                        principalTable: "Respuesta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RespuestaCuestionario_CuestionarioId",
                table: "RespuestaCuestionario",
                column: "CuestionarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestaCuestionarioDetalle_RespuestaCuestionarioId",
                table: "RespuestaCuestionarioDetalle",
                column: "RespuestaCuestionarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestaCuestionarioDetalle_RespuestaId",
                table: "RespuestaCuestionarioDetalle",
                column: "RespuestaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RespuestaCuestionarioDetalle");

            migrationBuilder.DropTable(
                name: "RespuestaCuestionario");
        }
    }
}
