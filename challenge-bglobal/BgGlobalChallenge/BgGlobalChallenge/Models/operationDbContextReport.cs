using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace BgGlobalChallenge.Models
{
    public partial class operationDbContextReport : DbContext
    {
        public operationDbContextReport()
        {
        }

        public operationDbContextReport(DbContextOptions<operationDbContextReport> options)
            : base(options)
        {
        }

        public virtual DbSet<Equipment> Equipment { get; set; }
        public virtual DbSet<EquipmentClass> EquipmentClasses { get; set; }
        public virtual DbSet<EquipmentProperty> EquipmentProperties { get; set; }
        public virtual DbSet<EquipmentPropertySpecification> EquipmentPropertySpecifications { get; set; }
        public virtual DbSet<EquipmentPropertyValue> EquipmentPropertyValues { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("Server=TR-213-NB;Database=BG.GLOBAL.DB;Trusted_Connection=True;");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.Property(e => e.EquipmentDescription).IsUnicode(false);

                entity.Property(e => e.EquipmentName).IsUnicode(false);

                entity.HasOne(d => d.EquipmentClass)
                    .WithMany(p => p.Equipment)
                    .HasForeignKey(d => d.EquipmentClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Equipment_EquipmentClass");
            });

            modelBuilder.Entity<EquipmentClass>(entity =>
            {
                entity.Property(e => e.EquipmentClassDescription).IsUnicode(false);

                entity.Property(e => e.EquipmentClassName).IsUnicode(false);
            });

            modelBuilder.Entity<EquipmentProperty>(entity =>
            {
                entity.Property(e => e.EquipmentPropertyDescription).IsUnicode(false);

                entity.Property(e => e.EquipmentPropertyName).IsUnicode(false);
            });

            modelBuilder.Entity<EquipmentPropertySpecification>(entity =>
            {
                entity.Property(e => e.EquipmentPropertySpecificationDescription).IsUnicode(false);

                entity.Property(e => e.EquipmentPropertySpecificationName).IsUnicode(false);

                entity.HasOne(d => d.EquipmentProperty)
                    .WithMany(p => p.EquipmentPropertySpecifications)
                    .HasForeignKey(d => d.EquipmentPropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EquipmentPropertySpecification_EquipmentProperty");
            });

            modelBuilder.Entity<EquipmentPropertyValue>(entity =>
            {
                entity.Property(e => e.Value).IsUnicode(false);

                entity.HasOne(d => d.Equipment)
                    .WithMany(p => p.EquipmentPropertyValues)
                    .HasForeignKey(d => d.EquipmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EquipmentPropertyValue_Equipment");

                entity.HasOne(d => d.EquipmentProperty)
                    .WithMany(p => p.EquipmentPropertyValues)
                    .HasForeignKey(d => d.EquipmentPropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EquipmentPropertyValue_EquipmentProperty");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
