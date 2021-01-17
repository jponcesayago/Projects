using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace prisma_lunar_webApi.Models
{
    public partial class RawMaterialContext : DbContext
    {
        public RawMaterialContext()
        {
        }

        public RawMaterialContext(DbContextOptions<RawMaterialContext> options)
            : base(options)
        {
        }

        public virtual DbSet<RawMaterial> RawMaterial { get; set; }
        public virtual DbSet<RawMaterialCategory> RawMaterialCategory { get; set; }
        public virtual DbSet<RawMaterialUom> RawMaterialUom { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=TR-213-NB;Initial Catalog=prisma_lunar;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<RawMaterial>(entity =>
            {
                entity.Property(e => e.RawMaterialId)
                    .HasColumnName("rawMaterialId")
                    .ValueGeneratedNever();

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.RawMaterialCategoryId).HasColumnName("rawMaterialCategoryId");

                entity.Property(e => e.RawMaterialDescrip)
                    .HasColumnName("rawMaterialDescrip")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RawMaterialName)
                    .IsRequired()
                    .HasColumnName("rawMaterialName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RawMaterialQuantity).HasColumnName("rawMaterialQuantity");

                entity.Property(e => e.RawMaterialUomId).HasColumnName("rawMaterialUomId");

                entity.HasOne(d => d.RawMaterialCategory)
                    .WithMany(p => p.RawMaterial)
                    .HasForeignKey(d => d.RawMaterialCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RawMaterial_Category");

                entity.HasOne(d => d.RawMaterialUom)
                    .WithMany(p => p.RawMaterial)
                    .HasForeignKey(d => d.RawMaterialUomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RawMaterial_Uom");
            });

            modelBuilder.Entity<RawMaterialCategory>(entity =>
            {
                entity.Property(e => e.RawMaterialCategoryId)
                    .HasColumnName("rawMaterialCategoryId")
                    .ValueGeneratedNever();

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.RawMaterialCategoryDescrip)
                    .HasColumnName("rawMaterialCategoryDescrip")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RawMaterialCategoryName)
                    .IsRequired()
                    .HasColumnName("rawMaterialCategoryName")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RawMaterialUom>(entity =>
            {
                entity.Property(e => e.RawMaterialUomId)
                    .HasColumnName("rawMaterialUomId")
                    .ValueGeneratedNever();

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.RawMaterialUomDescrip)
                    .HasColumnName("rawMaterialUomDescrip")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RawMaterialUomName)
                    .IsRequired()
                    .HasColumnName("rawMaterialUomName")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
