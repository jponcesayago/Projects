USE [master]
GO
/****** Object:  Database [BG.GLOBAL.DB]    Script Date: 4/10/2021 21:33:45 ******/
CREATE DATABASE [BG.GLOBAL.DB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BG.GLOBAL.DB', FILENAME = N'D:\Programas\SQL Server 2019\MSSQL15.MSSQLSERVER\MSSQL\DATA\BG.GLOBAL.DB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BG.GLOBAL.DB_log', FILENAME = N'D:\Programas\SQL Server 2019\MSSQL15.MSSQLSERVER\MSSQL\DATA\BG.GLOBAL.DB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [BG.GLOBAL.DB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BG.GLOBAL.DB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BG.GLOBAL.DB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET ARITHABORT OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET  MULTI_USER 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BG.GLOBAL.DB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BG.GLOBAL.DB] SET QUERY_STORE = OFF
GO
USE [BG.GLOBAL.DB]
GO
/****** Object:  Table [dbo].[Equipment]    Script Date: 4/10/2021 21:33:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Equipment](
	[equipmentId] [bigint] IDENTITY(1,1) NOT NULL,
	[equipmentName] [varchar](64) NOT NULL,
	[equipmentDescription] [varchar](128) NULL,
	[equipmentClassId] [bigint] NOT NULL,
	[isDeleted] [bit] NULL,
 CONSTRAINT [PK_Equipment] PRIMARY KEY CLUSTERED 
(
	[equipmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EquipmentClass]    Script Date: 4/10/2021 21:33:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EquipmentClass](
	[equipmentClassId] [bigint] IDENTITY(1,1) NOT NULL,
	[equipmentClassName] [varchar](64) NOT NULL,
	[equipmentClassDescription] [varchar](128) NULL,
	[isDeleted] [bit] NULL,
 CONSTRAINT [PK_EquipmentClass] PRIMARY KEY CLUSTERED 
(
	[equipmentClassId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EquipmentProperty]    Script Date: 4/10/2021 21:33:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EquipmentProperty](
	[equipmentPropertyId] [bigint] IDENTITY(1,1) NOT NULL,
	[equipmentPropertyName] [varchar](64) NOT NULL,
	[equipmentPropertyDescription] [varchar](128) NULL,
	[isDeleted] [bit] NULL,
 CONSTRAINT [PK_EquipmentProperty] PRIMARY KEY CLUSTERED 
(
	[equipmentPropertyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EquipmentPropertySpecification]    Script Date: 4/10/2021 21:33:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EquipmentPropertySpecification](
	[equipmentPropertySpecificationId] [bigint] IDENTITY(1,1) NOT NULL,
	[equipmentPropertyId] [bigint] NOT NULL,
	[equipmentPropertySpecificationName] [varchar](64) NOT NULL,
	[equipmentPropertySpecificationDescription] [varchar](128) NULL,
	[isDeleted] [bit] NULL,
 CONSTRAINT [PK_EquipmentSpecification] PRIMARY KEY CLUSTERED 
(
	[equipmentPropertySpecificationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EquipmentPropertyValue]    Script Date: 4/10/2021 21:33:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EquipmentPropertyValue](
	[equipmentPropertyValueId] [bigint] IDENTITY(1,1) NOT NULL,
	[equipmentId] [bigint] NOT NULL,
	[equipmentPropertyId] [bigint] NOT NULL,
	[value] [varchar](1024) NOT NULL,
	[isDeleted] [bit] NULL,
 CONSTRAINT [PK_EquipmentPropertyValue] PRIMARY KEY CLUSTERED 
(
	[equipmentPropertyValueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Equipment] ON 

INSERT [dbo].[Equipment] ([equipmentId], [equipmentName], [equipmentDescription], [equipmentClassId], [isDeleted]) VALUES (1, N'vehicle1', NULL, 1, 0)
INSERT [dbo].[Equipment] ([equipmentId], [equipmentName], [equipmentDescription], [equipmentClassId], [isDeleted]) VALUES (2, N'vehicle2', NULL, 1, 0)
INSERT [dbo].[Equipment] ([equipmentId], [equipmentName], [equipmentDescription], [equipmentClassId], [isDeleted]) VALUES (3, N'vehicle3', NULL, 1, 0)
INSERT [dbo].[Equipment] ([equipmentId], [equipmentName], [equipmentDescription], [equipmentClassId], [isDeleted]) VALUES (4, N'vehicle4', N'', 1, 0)
INSERT [dbo].[Equipment] ([equipmentId], [equipmentName], [equipmentDescription], [equipmentClassId], [isDeleted]) VALUES (5, N'vehicle5', N'', 1, 0)
INSERT [dbo].[Equipment] ([equipmentId], [equipmentName], [equipmentDescription], [equipmentClassId], [isDeleted]) VALUES (6, N'vehicle6', N'', 1, 0)
INSERT [dbo].[Equipment] ([equipmentId], [equipmentName], [equipmentDescription], [equipmentClassId], [isDeleted]) VALUES (7, N'vehicle7', N'', 1, 0)
INSERT [dbo].[Equipment] ([equipmentId], [equipmentName], [equipmentDescription], [equipmentClassId], [isDeleted]) VALUES (8, N'vehicle8', N'', 1, 0)
SET IDENTITY_INSERT [dbo].[Equipment] OFF
GO
SET IDENTITY_INSERT [dbo].[EquipmentClass] ON 

INSERT [dbo].[EquipmentClass] ([equipmentClassId], [equipmentClassName], [equipmentClassDescription], [isDeleted]) VALUES (1, N'vehicle', N'Vehículo', 0)
SET IDENTITY_INSERT [dbo].[EquipmentClass] OFF
GO
SET IDENTITY_INSERT [dbo].[EquipmentProperty] ON 

INSERT [dbo].[EquipmentProperty] ([equipmentPropertyId], [equipmentPropertyName], [equipmentPropertyDescription], [isDeleted]) VALUES (1, N'brand', N'Marca', 0)
INSERT [dbo].[EquipmentProperty] ([equipmentPropertyId], [equipmentPropertyName], [equipmentPropertyDescription], [isDeleted]) VALUES (2, N'owner', N'Titular', 0)
INSERT [dbo].[EquipmentProperty] ([equipmentPropertyId], [equipmentPropertyName], [equipmentPropertyDescription], [isDeleted]) VALUES (3, N'model', N'Modelo', 0)
INSERT [dbo].[EquipmentProperty] ([equipmentPropertyId], [equipmentPropertyName], [equipmentPropertyDescription], [isDeleted]) VALUES (4, N'doors', N'Puertas', 0)
INSERT [dbo].[EquipmentProperty] ([equipmentPropertyId], [equipmentPropertyName], [equipmentPropertyDescription], [isDeleted]) VALUES (5, N'patent', N'Patente', 0)
SET IDENTITY_INSERT [dbo].[EquipmentProperty] OFF
GO
SET IDENTITY_INSERT [dbo].[EquipmentPropertySpecification] ON 

INSERT [dbo].[EquipmentPropertySpecification] ([equipmentPropertySpecificationId], [equipmentPropertyId], [equipmentPropertySpecificationName], [equipmentPropertySpecificationDescription], [isDeleted]) VALUES (1, 1, N'Ford', NULL, 0)
INSERT [dbo].[EquipmentPropertySpecification] ([equipmentPropertySpecificationId], [equipmentPropertyId], [equipmentPropertySpecificationName], [equipmentPropertySpecificationDescription], [isDeleted]) VALUES (3, 1, N'Fiat', NULL, 0)
INSERT [dbo].[EquipmentPropertySpecification] ([equipmentPropertySpecificationId], [equipmentPropertyId], [equipmentPropertySpecificationName], [equipmentPropertySpecificationDescription], [isDeleted]) VALUES (4, 1, N'Renault', NULL, 0)
INSERT [dbo].[EquipmentPropertySpecification] ([equipmentPropertySpecificationId], [equipmentPropertyId], [equipmentPropertySpecificationName], [equipmentPropertySpecificationDescription], [isDeleted]) VALUES (5, 1, N'Chevrolet', NULL, 0)
INSERT [dbo].[EquipmentPropertySpecification] ([equipmentPropertySpecificationId], [equipmentPropertyId], [equipmentPropertySpecificationName], [equipmentPropertySpecificationDescription], [isDeleted]) VALUES (6, 1, N'Peugot', NULL, 0)
INSERT [dbo].[EquipmentPropertySpecification] ([equipmentPropertySpecificationId], [equipmentPropertyId], [equipmentPropertySpecificationName], [equipmentPropertySpecificationDescription], [isDeleted]) VALUES (7, 1, N'volkswagen', NULL, 0)
SET IDENTITY_INSERT [dbo].[EquipmentPropertySpecification] OFF
GO
SET IDENTITY_INSERT [dbo].[EquipmentPropertyValue] ON 

INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (1, 1, 1, N'Ford', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (2, 1, 2, N'Ponce, Juan', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (4, 1, 3, N'Focus', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (5, 1, 4, N'5', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (6, 1, 5, N'NNH443', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (7, 2, 1, N'Chevrolet', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (8, 2, 2, N'Barrera, Pablo', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (9, 2, 3, N'Cruze', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (10, 2, 4, N'5', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (11, 2, 5, N'PON231', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (12, 3, 1, N'Peugot', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (14, 3, 2, N'Ansio, Juan', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (15, 3, 3, N'308', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (16, 3, 4, N'5', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (17, 3, 5, N'NTD542', 0)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (18, 4, 1, N'Ford', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (19, 4, 2, N'Bluth, George', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (20, 4, 3, N'Gol', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (21, 4, 4, N'5', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (22, 4, 5, N'GTI124', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (23, 5, 1, N'Ford', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (24, 5, 2, N'Morris, Charles', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (25, 5, 3, N'Ka', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (26, 5, 4, N'3', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (27, 5, 5, N'FKI243', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (28, 6, 1, N'Ford', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (29, 6, 2, N'Bluth, George', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (30, 6, 3, N'Fiesta', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (31, 6, 4, N'5', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (32, 6, 5, N'GTI12434', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (33, 7, 1, N'Chevrolet', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (34, 7, 2, N'Morris, Charles', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (35, 7, 3, N'Aegis', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (36, 7, 4, N'5', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (37, 7, 5, N'KTI34515', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (38, 8, 1, N'Renault', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (39, 8, 2, N'Bluth, George', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (40, 8, 3, N'Kwid', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (41, 8, 4, N'5', NULL)
INSERT [dbo].[EquipmentPropertyValue] ([equipmentPropertyValueId], [equipmentId], [equipmentPropertyId], [value], [isDeleted]) VALUES (42, 8, 5, N'PQT12354', NULL)
SET IDENTITY_INSERT [dbo].[EquipmentPropertyValue] OFF
GO
ALTER TABLE [dbo].[Equipment]  WITH CHECK ADD  CONSTRAINT [FK_Equipment_EquipmentClass] FOREIGN KEY([equipmentClassId])
REFERENCES [dbo].[EquipmentClass] ([equipmentClassId])
GO
ALTER TABLE [dbo].[Equipment] CHECK CONSTRAINT [FK_Equipment_EquipmentClass]
GO
ALTER TABLE [dbo].[EquipmentPropertySpecification]  WITH CHECK ADD  CONSTRAINT [FK_EquipmentPropertySpecification_EquipmentProperty] FOREIGN KEY([equipmentPropertyId])
REFERENCES [dbo].[EquipmentProperty] ([equipmentPropertyId])
GO
ALTER TABLE [dbo].[EquipmentPropertySpecification] CHECK CONSTRAINT [FK_EquipmentPropertySpecification_EquipmentProperty]
GO
ALTER TABLE [dbo].[EquipmentPropertyValue]  WITH CHECK ADD  CONSTRAINT [FK_EquipmentPropertyValue_Equipment] FOREIGN KEY([equipmentId])
REFERENCES [dbo].[Equipment] ([equipmentId])
GO
ALTER TABLE [dbo].[EquipmentPropertyValue] CHECK CONSTRAINT [FK_EquipmentPropertyValue_Equipment]
GO
ALTER TABLE [dbo].[EquipmentPropertyValue]  WITH CHECK ADD  CONSTRAINT [FK_EquipmentPropertyValue_EquipmentProperty] FOREIGN KEY([equipmentPropertyId])
REFERENCES [dbo].[EquipmentProperty] ([equipmentPropertyId])
GO
ALTER TABLE [dbo].[EquipmentPropertyValue] CHECK CONSTRAINT [FK_EquipmentPropertyValue_EquipmentProperty]
GO
USE [master]
GO
ALTER DATABASE [BG.GLOBAL.DB] SET  READ_WRITE 
GO
