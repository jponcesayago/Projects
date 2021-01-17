var oDataFilter =[];
var oDataFilterTable1_3 = [];

var oDataFilterPreviousState;

var filterSavedTable1;

var oInitialData = [];

var filterFlag1 = false;
var filterFlag2 = false;
var filterFlag3 = false;

var filtercleanFlag1 = true;
var filtercleanFlag2 = true;
var filtercleanFlag3 = true;

var firstFiltered1 = false;
var firstFiltered2 = false;
var firstFiltered3 = false;

var tableTripleFilterChange = false;
var tableFirstFilteredChange = false;
var tripleFilter = false;

//Flags para fitrado triple y cambios de tabla

tripleFilter123 = false;
tripleFilter213 = false;
tripleFilter231 = false;
tripleFilter321 = false;
tripleFilter312 = false;
tripleFilter132 = false;

var sValueSaved = "";
var sColumn;
var sPathSaved = "";

var sValueSavedFirstFiltered = "";
var sColumnFirstFiltered;
var sPathSavedFirstFiltered = "";

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/Device',
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox',
	"sap/ui/unified/DateTypeRange",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter',
	'sap/m/Menu',
	'sap/m/MenuItem',
], function(Controller, Device , JSONModel,MessageBox,DateTypeRange, MessageToast, DateFormat,Export, ExportTypeCSV,Filter , Sorter ,Menu , MenuItem) {
	"use strict";

	
	
	
	return Controller.extend("prismalunar.controller.test2", {
/**
/**
* Called whe1n a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.test2
*/
	onInit: function() {

		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		
		//INICIALIZO ARRAY DONDE SE ALMACENARAN LOS PARAMETROS DE LOS FILTROS APLICADOS
		
		filterSavedTable1 = [ new Filter("prodName", "Contains", "") , new Filter("prodDescrip", "Contains", ""), new Filter("prodPrice", "Contains", "")];
		
		//console.log(filterSavedTable1);
		
		var ProductsTableJson = new JSONModel();
		
		oInitialData = [
			{
				prodId:1,
				prodName:"elástico",
				prodDescrip:"aaaaa",
				prodPrice:"10",
				prodUOM:"metros",
				prodQuantity:200,
				prodWarranty:0,
				prodObservations:"aaaaaaaaaacccc"
				
			},{
				prodId:2,
				prodName:"RJ-45",
				prodDescrip:"jack ethernet",
				prodPrice:"30",
				prodUOM:"cantidad",
				prodQuantity:300,
				prodWarranty:0.6,
				prodObservations:"bbbbbbbbbb"
				
			},{
				prodId:3,
				prodName:"notebook dell",
				prodDescrip:"inspiron 5363",
				prodPrice:"7000",
				prodUOM:"cantidad",
				prodQuantity:5,
				prodWarranty:1,
				prodObservations:"cccccccccc"
				
			},{
				prodId:4,
				prodName:"tv samsung",
				prodDescrip:"45'",
				prodPrice:"15500",
				prodUOM:"cantidad",
				prodQuantity:10,
				prodWarranty:2,
				prodObservations:"dddddddddd"
				
			}
			
		];
		
		
		
	/*	for (var i=0;i<9;i++){
			
			oData.push(
				
				{
					prodId:i,
					prodName:"Nombre" + i,
					prodDescrip:"Descrip" + i,
					prodPrice:i*2,
					prodId2:i+10,
					prodName2:"Name"+i+10,
					prodDescrip2:"Descrip"+i+10,
					prodPrice2:i*3
				}
			);
			
			
		};*/
		
		
		ProductsTableJson.setData(oInitialData);
		//console.log(ProductsTableJson);
		
		ProductsTable1.setModel(ProductsTableJson);
		ProductsTable2.setModel(ProductsTableJson);
		ProductsTable3.setModel(ProductsTableJson);
		
		//console.log(ProductsTable);
		
	
	
	},
	
	
	handleFilter : function(oEvent){
		
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		
		// Seteo la estructura para contener los datos despues de filtrar la TABLA
		
		oDataFilter =[
			{
				prodId:1,
				prodName:"elástico",
				prodDescrip:"aaaaa",
				prodPrice:10,
				prodUOM:"metros",
				prodQuantity:200,
				prodWarranty:0,
				prodObservations:"aaaaaaaaaaa"
				
			}
		];
		
		
			if ((!firstFiltered2)&&(!firstFiltered3)) { firstFiltered1 = true;} // Evaluo si es la primera TABLA que se filtró
			
		
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
			
			if ((!filterFlag2)&&(!filterFlag3)) // Si NO HAY otra TABLA filtrada, reinicio el modelo y lo seteo
																				//en la TABLA 1
				{	
					var ProductTableResetModel = new JSONModel();
					
					ProductTableResetModel.setData(oInitialData);
					ProductsTable1.setModel(ProductTableResetModel);
					
				}
			
	
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			// Filtrado Triple Con Cambio de Tabla
			
			//Arreglar condición de ingreso al IF no se contempla el caso en el cual FTABLA3 - FTABLA1 -FTABLA2
			
			
			
			///////////////////////////////////////////////////////////////////////////
			
			//Cambio de 132 a 231
			
			
			if (tripleFilter132)
				{
					
				console.log("F. Triple Cambio FF Tabla 2");
				console.log("F231");
				
				
		
				//console.log(oBindingTable1);
				//console.log(oBindingTable2);
				//console.log(oBindingTable3);
				
				console.log(sValueSaved);
				console.log(sPathSaved);
				
				console.log(sValueSavedFirstFiltered);
				console.log(sPathSavedFirstFiltered);
				
				
				////////////////////////////////////////////
				
				// Obtengo el Binding de la TABLA 2
				var oBindingTable2 = ProductsTable2.getBinding();
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Estos parametro tienen que se los de la nueva TABLA
				
				var aFiltersTable2 = oBindingTable2.aFilters; //Obtengo el filtro aplicado en la TABLA 2
				console.log(aFiltersTable2);
				
				//////////////////
				//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
				
				
				sValueSavedFirstFiltered = oBindingTable2.aFilters[0].oValue1;
				//sColumnFirstFiltered = oColumn;
				sPathSavedFirstFiltered = oBindingTable2.aFilters[0].sPath;
				//////////////////
				
				
				//Resetear Modelo Tabla 2
				
				//Declaro el Modelo para Resetear la TABLA 2
				
				var  ProductsTableResetModel = new JSONModel();
				
				
				//SETEO los Datos Iniciales en el Modelo
				ProductsTableResetModel.setData(oInitialData);
				
				// Reseteo de los Modelos de las 2 tablas 
				
				//ProductsTable1.setModel(ProductsTableResetModel);
				ProductsTable2.setModel(ProductsTableResetModel);
				
				
				// Obtengo el Binding de la TABLA 2
				var oBindingTable2 = ProductsTable2.getBinding();
				
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 2
				oBindingTable2.filter(aFiltersTable2);
				
				console.log(oBindingTable2);
				
				
				
				
				for (var i=0;i<oBindingTable2.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				
				
				/////////////////////////////////////////////////////////////
				
				// Obtengo el Binding de la TABLA 3
				var oBindingTable3 = ProductsTable3.getBinding();
				
				var oData = oBindingTable3.oList;
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable3 = oBindingTable3.aFilters;
				//console.log(aFiltersTable2);
				
				var sOperator = "Contains";
				
				//Armo Filtro
				var oFilterTable3 = new Filter(sPathSaved, sOperator, sValueSaved);
				
				if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable3.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable3.push(oFilterTable3);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 3
				oBindingTable3.filter(aFiltersTable3);
				
				console.log(oBindingTable3);
				
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
				

				//Matcheo con el contenido del modelo de datos de la tabla
				
				for (var i=0;i<oBindingTable3.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 2
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable2.setModel(ProductsTableFilteredModel);
				
				////////////////////////////////////////////////////////////////
				
				
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
				
				// Obtengo el Binding de la TABLA 1
				var oBindingTable1 = ProductsTable1.getBinding();
				console.log(oBindingTable1);
				
				var oData = oBindingTable1.oList; //
				
				
				//console.log(oData);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Parámetros instroducidos en la columna filtrado TABLA 1
				
				var aFiltersTable1 = oBindingTable1.aFilters;
				
				var oColumn = oEvent.getParameter("column");
				
				//Parámetros
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				
				

				//Armo Filtro
				var oFilterTable1 = new Filter(sPath, sOperator, sValue);
				
				
				if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable1.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable1.push(oFilterTable1);
				
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable1.filter(aFiltersTable1);
				
				//console.log(aFiltersTable1);
				//console.log(oBindingTable1.aIndices);
				
			
				
				
				//Matcheo con el contenido del modelo de datos de la tabla
				
				for (var i=0;i<oBindingTable1.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);	
				
				
				
				////////////////////////////////////////////////////////////

				firstFiltered1 = false;
				firstFiltered2 = true;
				firstFiltered3 = false;
				
				//Seteo Flags correspondientes
				tableTripleFilterChange = true;
				
				
				
				filterFlag2 = true;
				filterFlag1 = true;
				filterFlag3 = true;
				
				tripleFilter132 = false;
				tripleFilter231 = true;
				
				
				
				
				}
			
			
			
			///////////////////////////////////////////////////////////////////////////
			//// Cambio de 312 a 321
			
			if (tripleFilter312)
				{
				
					console.log("F. Triple Cambio FF Tabla 3");
					console.log("F321");
					
					// Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Estos parametro tienen que se los de la nueva TABLA
					
					var aFiltersTable2 = oBindingTable2.aFilters; //Obtengo el filtro aplicado en la TABLA 3
					console.log(aFiltersTable2);
					
					//////////////////
					//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
					
					
					sValueSaved = oBindingTable2.aFilters[0].oValue1;
					//sColumnFirstFiltered = oColumn;
					sPathSaved = oBindingTable2.aFilters[0].sPath;
					//////////////////
					
					///////////////////////////////////////////////////////////////////////////
					
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable1 = ProductsTable1.getBinding();
					
					//console.log(oBindingTable1);
					//console.log(oBindingTable2);
					//console.log(oBindingTable3);
					
					//console.log(sValueSaved);
					//console.log(sPathSaved);
					
					//console.log(sValueSavedFirstFiltered);
					//console.log(sPathSavedFirstFiltered);
					
					//Resetear Modelo Tabla 3
					
					//Declaro el Modelo para Resetear la TABLA 3
					
					var  ProductsTableResetModel = new JSONModel();
					
					
					//SETEO los Datos Iniciales en el Modelo
					ProductsTableResetModel.setData(oInitialData);
					
					// Reseteo de los Modelos de las 2 tablas 
					
					//ProductsTable1.setModel(ProductsTableResetModel);
					ProductsTable3.setModel(ProductsTableResetModel);
					
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					
					var aFiltersTable3 = oBindingTable3.aFilters;
					//console.log(aFiltersTable2);
					
					var sOperator = "Contains";
					
					//Armo Filtro
					var oFilterTable3 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
					
					if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable3.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable3.push(oFilterTable3);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 3
					oBindingTable3.filter(aFiltersTable3);
					
					console.log(oBindingTable3);
					
					
					
					
					for (var i=0;i<oBindingTable3.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					console.log(oDataFilter);
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable2.setModel(ProductsTableFilteredModel);
					
					//////////////////////////////////////////////////////////////////
					
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					// Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					
					var oData =  oBindingTable2.oList;
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 3
					oBindingTable2.filter(aFiltersTable2);
					
					console.log(oBindingTable2);
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					////////////////////////////////////////////////////////////////////////////////////
					
					
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					
					// Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					console.log(oBindingTable1);
					
					var oData = oBindingTable1.oList; //
					
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable1 = oBindingTable1.aFilters;
					
					var oColumn = oEvent.getParameter("column");
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					

					//Armo Filtro
					var oFilterTable1 = new Filter(sPath, sOperator, sValue);
					
					
					if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable1.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					//console.log(aFiltersTable1);
					//console.log(oBindingTable1.aIndices);
					
				
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 2 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);	
					
					
					//////////////////////////////////////////////////////////////////////////////////////
					
					firstFiltered1 = false;
					firstFiltered2 = false;
					firstFiltered3 = true;
					
					//Seteo Flags correspondientes
					tableTripleFilterChange = true;
					
					
					
					filterFlag2 = true;
					filterFlag1 = true;
					filterFlag3 = true;
					
					tripleFilter312 = false;
					tripleFilter321 = true;
					
					
				
				
				}
				
				
				
///////////////////////////////////// Cambio de 123 a 321 ///////////////////////////////////////////////////////////////////
			
				if (tripleFilter123)
				{
					console.log("F. Triple Cambio FF Tabla 3");
					console.log("F321");
					

					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					
					//console.log(oBindingTable1);
					//console.log(oBindingTable2);
					//console.log(oBindingTable3);
				
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Estos parametro tienen que se los de la nueva TABLA
					
					var aFiltersTable3 = oBindingTable3.aFilters; //Obtengo el filtro aplicado en la TABLA 3
					//console.log(aFiltersTable3);

					var sValueTable2 = sValueSavedFirstFiltered;
					var sPathTable2 = sPathSavedFirstFiltered;
					//console.log(sValueTable2);
					//console.log(sPathTable2);
					
					//////////////////
					//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
					
					
					sValueSavedFirstFiltered = oBindingTable3.aFilters[0].oValue1;
					//sColumnFirstFiltered = oColumn;
					sPathSavedFirstFiltered = oBindingTable3.aFilters[0].sPath;
					//////////////////
					
					//console.log(sValueSavedFirstFiltered);
					
					//Resetear Modelo Tabla 3
					
					//Declaro el Modelo para Resetear la TABLA 3
					
					var  ProductsTableResetModel = new JSONModel();
					
					
					//SETEO los Datos Iniciales en el Modelo
					ProductsTableResetModel.setData(oInitialData);
					
					// Reseteo de los Modelos de las 2 tablas 
					
					ProductsTable1.setModel(ProductsTableResetModel);
					ProductsTable3.setModel(ProductsTableResetModel);
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 3
					oBindingTable3.filter(aFiltersTable3);
					//console.log(aFiltersTable3);
					
					//console.log(oBindingTable3.aIndices);
					
					
					for (var i=0;i<oBindingTable3.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					console.log(oDataFilter);
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable2.setModel(ProductsTableFilteredModel);
					
					///////////////////////////////////////////////////////////////////////////////
					
					
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					// Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					
					var oData =  oBindingTable2.oList;
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					
					var aFiltersTable2 = oBindingTable2.aFilters;
					//console.log(aFiltersTable2);
					
					var sOperator = "Contains";
					
					//Armo Filtro
					var oFilterTable2 = new Filter(sPathSaved, sOperator, sValueSaved);
					
					if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable2.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable2.push(oFilterTable2);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable2.filter(aFiltersTable2);
					
					//console.log(oBindingTable2.aIndices);
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					////////////////////////////////////////////////////////////////////////7
					
					// Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					console.log(oBindingTable1);
					
					var oData = oBindingTable1.oList; //
					
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable1 = oBindingTable1.aFilters;
					
					var oColumn = oEvent.getParameter("column");
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					
					
					
					
					//Armo Filtro
					var oFilterTable1 = new Filter(sPath, sOperator, sValue);
					
					
					if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable1.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					//console.log(aFiltersTable1);
					//console.log(oBindingTable1.aIndices);
					
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);	
					
					//////////////////////////////////////////////////////////////////////////////////////////
					
					firstFiltered1 = false;
					firstFiltered2 = false;
					firstFiltered3 = true;
					
					//Seteo Flags correspondientes
					tableTripleFilterChange = true;
					
					
					
					filterFlag2 = true;
					filterFlag1 = true;
					filterFlag3 = true;
					
					tripleFilter123 = false;
					tripleFilter321 = true;
					
					
				}
				
				
		/////////////////// Cambio filtro triple 213 a 231 /////////////////////////
		if (tripleFilter213)
					{
					console.log("F. Triple Cambio FF Tabla 2");
					console.log("F231");
					
					
					////////////Obtengo los parametros del Filtro de la Tabla 3//////////
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					console.log(oBindingTable3);
					
					var aFiltersTable3 = oBindingTable3.aFilters; //Obtengo el filtro aplicado en la TABLA 3
					//console.log(aFiltersTable3);
					
					/////////////////////////////////////////////////////////////////////
					//Guardo parámetros para filtros triples
					
					var	sPathSavedTable3 =  oBindingTable3.aFilters[0].sPath;
					var	sValueSavedTable3 =  oBindingTable3.aFilters[0].oValue1;
					
					
					//////////////////////////////////////////////////////////////////////
					
					//Resetear Modelo Tabla 3
					
					//Declaro el Modelo para Resetear la TABLA 3
					
					var  ProductsTableResetModel = new JSONModel();
					
					
					//SETEO los Datos Iniciales en el Modelo
					ProductsTableResetModel.setData(oInitialData);
					
					// Reseteo de los Modelos de las 2 tablas 
					
					ProductsTable2.setModel(ProductsTableResetModel);
					//ProductsTable3.setModel(ProductsTableResetModel);
					
					// Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					//console.log(oBindingTable2);
					

					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					
					var aFiltersTable2 = oBindingTable2.aFilters;
					//console.log(aFiltersTable2);
					
					var sOperator = "Contains";
					
					//Armo Filtro
					var oFilterTable2 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
					
					if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable2.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable2.push(oFilterTable2);
					console.log(oFilterTable2);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable2.filter(aFiltersTable2);
					
					console.log(oBindingTable2.aIndices);
					
					

					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					console.log(oDataFilter);
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					/////////////////////////////////////////////////////7
					
					
					//Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					console.log(oBindingTable3);
					
					var oData =  oBindingTable3.oList;
					
					//console.log(oData);
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable3.filter(aFiltersTable3);
					
					//console.log(oBindingTable2.aIndices);
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable3.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable2.setModel(ProductsTableFilteredModel);
					
					/////////////////////////////////////////////////////////////////////
					
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					
					// Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					console.log(oBindingTable1);
					
					var oData = oBindingTable1.oList; //
					
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable1 = oBindingTable1.aFilters;
					
					var oColumn = oEvent.getParameter("column");
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					
					
					
					
					//Armo Filtro
					var oFilterTable1 = new Filter(sPath, sOperator, sValue);
					
					
					if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable1.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					//console.log(aFiltersTable1);
					//console.log(oBindingTable1.aIndices);
					
		
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);	
					
					
					sPathSaved = sPathSavedTable3;
					sValueSaved = sValueSavedTable3;
					
					console.log(sPathSaved);
					console.log(sValueSaved);
					console.log(sPathSavedFirstFiltered);
					console.log(sValueSavedFirstFiltered);
					
					

					firstFiltered1 = false;
					firstFiltered2 = true;
					firstFiltered3 = false;
					
					
					//Seteo Flags correspondientes
					tableTripleFilterChange = true;
					
					
					
					filterFlag2 = true;
					filterFlag1 = true;
					filterFlag3 = true;
					
					tripleFilter213 = false;
					tripleFilter231 = true;
					
					
					
					}
				
					
				
			
			
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			
			//Filtro Triple TABLA 3 - TABLA 2 - TABLA 1
			
			if ((firstFiltered3)&&(filterFlag2)&&(!tableTripleFilterChange))
			{
				console.log("F. Triple T3-T2-T1");
				
				tripleFilter = true; //Activo el Flag de Filtro Triple
				tripleFilter321 = true;
				
				if (oEvent.getParameter("value")=="")
				{
					tripleFilter321 = false;
					//Reseteo Modelo de datos de la TABLA 3
					var ProductTableResetModel = new JSONModel();
					
					ProductTableResetModel.setData(oInitialData);
					ProductsTable3.setModel(ProductTableResetModel);
					
					//Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					var aFiltersTable3 = oBindingTable3.aFilters;
					
					console.log(oBindingTable3);
					
					//console.log(sValueSavedTable1);
					//console.log(sPathSavedTable1);
					
					//console.log(sPathSaved);
					//console.log(sValueSaved);
					
					var sOperator = "Contains"
						
					//Armo Filtro
					var oFilterTable3 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
					
					if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable3.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable3.push(oFilterTable3);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable3.filter(aFiltersTable3);
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable3.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					//Declaro el Modelo para setear en las TABLAS 2 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					
					
					  
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
						
					//Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					
					console.log(oBindingTable2);
					
					var oData =  oBindingTable2.oList;
					
					console.log(oData);
					
					var aFiltersTable2 = oBindingTable2.aFilters;
					
					
						
					//Armo Filtro
					var oFilterTable2 = new Filter(sPathSaved, sOperator, sValueSaved);
					
					if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable2.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable2.push(oFilterTable2);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable2.filter(aFiltersTable2);
					
					console.log(oBindingTable2.aIndices);
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					
					
				}else
					{
					
					
					
					
					//Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					//console.log(oBindingTable2);
					
					// Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					console.log(oBindingTable1);
					
					var oData = oBindingTable1.oList; //
					
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable1 = oBindingTable1.aFilters;
					
					var oColumn = oEvent.getParameter("column");
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					//Armo Filtro
					var oFilterTable1 = new Filter(sPath, sOperator, sValue);
					
					
					if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable1.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					console.log(aFiltersTable1);
					console.log(oBindingTable1.aIndices);
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					}
				
				
				
					
			}
			
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			
			//Filtro Triple TABLA 2 - TABLA 3 - TABLA 1
			
			if ((firstFiltered2)&&(filterFlag3)&&(!tableTripleFilterChange))
			{
				console.log("F. Triple T2-T3-T1");
				
				tripleFilter = true; //Activo el Flag de Filtro Triple
				tripleFilter231 = true;
				
				
				if (oEvent.getParameter("value")=="")
				{
					tripleFilter231 = false;
					//Reseteo Modelo de datos de la TABLA 2
					var ProductTableResetModel = new JSONModel();
					
					ProductTableResetModel.setData(oInitialData);
					ProductsTable2.setModel(ProductTableResetModel);
					
					//Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					
					var aFiltersTable2 = oBindingTable2.aFilters;
					
					console.log(oBindingTable2);
					
					//console.log(sValueSavedTable1);
					//console.log(sPathSavedTable1);
					
					//console.log(sPathSaved);
					//console.log(sValueSaved);
					
					var sOperator = "Contains"
						
						
						
					//Armo Filtro
					var oFilterTable2 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
					
					if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable2.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable2.push(oFilterTable2);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable2.filter(aFiltersTable2);
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					
					
					  
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
						
					//Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					console.log(oBindingTable3);
					
					var oData =  oBindingTable3.oList;
					
					console.log(oData);
					
					var aFiltersTable3 = oBindingTable3.aFilters;
					
					
						
					//Armo Filtro
					var oFilterTable3 = new Filter(sPathSaved, sOperator, sValueSaved);
					
					if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable3.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable3.push(oFilterTable3);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable3.filter(aFiltersTable3);
					
					console.log(oBindingTable3.aIndices);
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable3.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable1.setModel(ProductsTableFilteredModel);
					
					
					
				}else
					{
					
					
					
					
					//Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					//console.log(oBindingTable2);
					
					// Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					console.log(oBindingTable1);
					
					var oData = oBindingTable1.oList; //
					
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable1 = oBindingTable1.aFilters;
					
					var oColumn = oEvent.getParameter("column");
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					//Armo Filtro
					var oFilterTable1 = new Filter(sPath, sOperator, sValue);
					
					
					if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable1.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					console.log(aFiltersTable1);
					console.log(oBindingTable1.aIndices);
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					}
				
				
				
					
			}
			
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			//Cambio TABLA 3
			
			
			if ((firstFiltered1)&&(!filterFlag2)&&(filterFlag3))
			{
				console.log("Cambio a Tabla 3");
				
				
				oDataFilterTable1_3 =[ 		
				{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}];
				
				//console.log(oDataFilterTable1_3);
				
				
				firstFiltered1 = false; //Seteo los FLags correspondientes para situarme correctamente en el nuevo estado
				firstFiltered3 = true;
				tableFirstFilteredChange = true;
				
				
				//Declaro el Modelo para Resetear la TABLA 2 
				
				var  ProductsTableResetModel = new JSONModel();
				
				
				//SETEO los Datos Iniciales en el Modelo
				ProductsTableResetModel.setData(oInitialData);
				
				// Reseteo de los Modelos de las 2 tablas 
				
				ProductsTable1.setModel(ProductsTableResetModel);
				ProductsTable3.setModel(ProductsTableResetModel);
				
				
				// Obtengo el Binding de la TABLA 2
				var oBindingTable3 = ProductsTable3.getBinding();
				
				//console.log(oBindingTable2);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Estos parametro tienen que se los de la nueva TABLA
				
				var aFilters = oBindingTable3.aFilters;
				//console.log(aFilters);
				
				//var oColumn = oEvent.getParameter("column");
				var oColumn = sColumn;
				
				//var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sPath =	sPathSaved;
				
				var sOperator = "Contains";
				//var sValue = oEvent.getParameter("value");
				var sValue = sValueSaved;
				
				var oFilter = new Filter(sPath, sOperator, sValue);
				
				if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
				aFilters.splice(0,1);
				}
				
				
				aFilters.push(oFilter);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable3.filter(aFilters);
				console.log(aFilters);
				
				
				for (var i=0;i<oBindingTable3.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilterPreviousState);
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable2.setModel(ProductsTableFilteredModel);
				//////////////////////////////////////////////////////////////////////
				
				// Obtengo el Binding de la TABLA 1
				var oBindingTable1 = ProductsTable1.getBinding();
				
				//console.log(oBindingTable1);
				
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Parámetros instroducidos en la columna filtrado TABLA 1
				
				var aFiltersTable1 = oBindingTable1.aFilters;
				
				//Parámetros
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				
				
				
				
				//Armo Filtro
				var oFilterTable1 = new Filter(sPath, sOperator, sValue);
				
				////////////////////////////////////////
				//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
				
				sValueSaved = sValue;
				sColumn = oColumn;
				sPathSaved = sPath;
				//////////////////////////////////////
				//Seteo el Filtro Creado
				aFiltersTable1.push(oFilterTable1);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable1.filter(aFiltersTable1);
				
				console.log(aFiltersTable1);
				console.log(oBindingTable1.aIndices);
				
				
				
				
				
				for (var i=0;i<oBindingTable1.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilterTable1_3.push(oDataFilterPreviousState[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				
				oDataFilterTable1_3.splice(0,1);
				
				console.log(oDataFilterTable1_3);	
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel2 = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel2.setData(oDataFilterTable1_3);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel2);
				ProductsTable3.setModel(ProductsTableFilteredModel2);
				
				
			}
			
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
				//Cambio a TABLA 2
			if ((firstFiltered1)&&(filterFlag2)&&(!filterFlag3))
				{
					console.log("Cambio a Tabla 2");
					
					
					oDataFilterTable1_3 =[ 		
					{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}];
					
					//console.log(oDataFilterTable1_3);
					
					
					firstFiltered1 = false; //Seteo los FLags correspondientes para situarme correctamente en el nuevo estado
					firstFiltered2 = true;
					tableFirstFilteredChange = true;
					

					// Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					
					console.log(oBindingTable2);
					
					//Declaro el Modelo para Resetear la TABLA 2 
					
					var  ProductsTableResetModel = new JSONModel();
					
					
					//SETEO los Datos Iniciales en el Modelo
					ProductsTableResetModel.setData(oInitialData);
					
					// Reseteo de los Modelos de las 2 tablas 
					
					ProductsTable1.setModel(ProductsTableResetModel);
					ProductsTable2.setModel(ProductsTableResetModel);
					
					
					// Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					
					//console.log(oBindingTable2);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Estos parametro tienen que se los de la nueva TABLA
					
					var aFilters = oBindingTable2.aFilters;
					//console.log(aFilters);
					
					//var oColumn = oEvent.getParameter("column");
					var oColumn = sColumn;
					
					//var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sPath =	sPathSaved;
					
					var sOperator = "Contains";
					//var sValue = oEvent.getParameter("value");
					var sValue = sValueSaved;
					
					var oFilter = new Filter(sPath, sOperator, sValue);
					
					if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
					aFilters.splice(0,1);
					}
					
					
					aFilters.push(oFilter);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable2.filter(aFilters);
					console.log(aFilters);
					
					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					console.log(oDataFilterPreviousState);
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					//////////////////////////////////////////////////////////
					
					
					// Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					
					//console.log(oBindingTable1);
					
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable1 = oBindingTable1.aFilters;
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					//Armo Filtro
					var oFilterTable1 = new Filter(sPath, sOperator, sValue);
					
					////////////////////////////////////////
					//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
					
					sValueSaved = sValue;
					sColumn = oColumn;
					sPathSaved = sPath;
					//////////////////////////////////////
					
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					console.log(aFiltersTable1);
					console.log(oBindingTable1.aIndices);
					
					
					
					
					
					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilterTable1_3.push(oDataFilterPreviousState[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					
					oDataFilterTable1_3.splice(0,1);
					
					console.log(oDataFilterTable1_3);	
					
					//Declaro el Modelo para setear en las TABLAS 2 Y 3
					
					var  ProductsTableFilteredModel2 = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel2.setData(oDataFilterTable1_3);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel2);
					ProductsTable3.setModel(ProductsTableFilteredModel2);
					
					
				}
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			// SI LA TABLA 1 ES LA PRIMERA  QUE SE FILTRA
			
			if ((firstFiltered1)&&(!tableTripleFilterChange))
			{
				tableFirstFilteredChange = false; //Indico que ya se ha producido el cambio de TABLA
				
				console.log("Ind. Tabla 1");
				
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBinding = ProductsTable1.getBinding();
				console.log(oBinding);
				
				//console.log(oEvent.getParameters().column.mProperties.filterProperty);
				//console.log(oBinding.aIndices);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFilters = oBinding.aFilters;
				console.log(aFilters);
				
				
				if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFilters.splice(0,1);
				}
				
				
				
				var oColumn = oEvent.getParameter("column");
				
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(sPath, sOperator, sValue);
				
				
				for (var i = 0;i<filterSavedTable1.length;i++)
					{
						if (filterSavedTable1[i].sPath==sPath) filterSavedTable1[i].oValue1 = sValue;
					
						
					}
				
				console.log(filterSavedTable1);
				
				
				//////////////////
				//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
				
				sValueSavedFirstFiltered = sValue;
				sColumnFirstFiltered = oColumn;
				sPathSavedFirstFiltered = sPath;
				//////////////////
				
				
				/*
				 * 
				 aFilters.push(oFilter);
				
				oBinding.filter(aFilters);
				
				var oBinding2 = ProductsTable2.getBinding();
				
				var aFilters2 = oBinding.aFilters;
				
				
				aFilters2.push(oFilter);
				
				oBinding2.filter(aFilters2);
				
				
				
	
				
				//Evaluo si se ha limpiado una celda de filtrado y actualizado lista de parametros de filtros
				//posteriormente aplico los nuevos parametros de filtrado y matcheo con otras tablas
				if (sValue!=""){
					
					aFilters.push(oFilter);
					
					oBinding.filter(aFilters);
					
				}else
					{
						for (var i = 0;i<filterSavedTable1.length;i++)
							{
								if (filterSavedTable1[i].oValue1!="")
								{
									
									aFilters.push(filterSavedTable1[i]);
									oBinding.filter(aFilters,sap.ui.model.FilterType.Application);
								}
								
							
							
							}
						
					
					}
				
				console.log(aFilters);
				
				/*
				
				 var oCombinedFilter = new sap.ui.model.Filter({
				     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable1[0],
				          // filter for value 2
				        	filterSavedTable1[1],
				          // filter for value 3
				        	filterSavedTable1[2]
				 
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				
				
				 oBinding.filter(oCombinedFilter, sap.ui.model.FilterType.Application);
				 
				console.log(oCombinedFilter); 
				
				var oBinding = ProductsTable1.getBinding();*/
				
				
				
				aFilters.push(oFilter);
				
				oBinding.filter(aFilters);
				
				console.log(oBinding.aIndices);
				
				
				for (var i=0;i<oBinding.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBinding.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilterPreviousState);
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel); 
			
			}//If firstFiltered1
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// 
			
			else //Si la TABLA 1 NO ES la PRIMERA en ser filtrada
			{
			
			if ((!tableFirstFilteredChange)&&(!tripleFilter))
			{
				console.log("Concatenado Tabla 1");
				
				
				
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBinding = ProductsTable1.getBinding();
				
				//console.log(oEvent.getParameters().column.mProperties.filterProperty);
				//console.log(oBinding.aIndices);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFilters = oBinding.aFilters;
				//console.log(aFilters);
				
				var oColumn = oEvent.getParameter("column");
				
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(sPath, sOperator, sValue);
				
				if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFilters.splice(0,1);
				}
				
				////////////////////////////////////////
				//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
				
				sValueSaved = sValue;
				sColumn = oColumn;
				sPathSaved = sPath;
				//////////////////////////////////////
				
				
				aFilters.push(oFilter);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBinding.filter(aFilters);
				
				console.log(aFilters);
				
				//console.log(oBinding.aIndices);
				
				////////////////////////////////////////////////////// 
				// TENGO QUE REALIZAR EL MATCHEO CON EL MODELO ACTUAL DE LA TABLA 1
				
				
				
				for (var i=0;i<oBinding.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oDataFilterPreviousState[oBinding.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				//////////////////////////////////////////////////////////////////
				console.log(oDataFilter);
				
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				
			
			
			}
			
			}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// SETEO DE FLAGS
			
		if (oEvent.getParameter("value")=="")
		{
						
			filterFlag1 = false;  //Indico que se ha limpiado la celda de la columna de filtrado en TABLA 1
			//filtercleanFlag1 = true; // Indico que se ha limpiado la celda de filtrado
			firstFiltered1 = false; // Compruebo si es la primera tabla que se filtro para resetear el flag
			tripleFilter = false; //Reseteo el Flag del Filtro Triple
			
		}else
			{
			
			filterFlag1 = true; // Indico que se tiene una condición de filtrado en TABLA 2
			
			}
		
		//Reseteo el Flag de cambio de Tabla
		tableFirstFilteredChange = false;  
		tableTripleFilterChange = false;
		
	console.log(filterFlag1);
	console.log(firstFiltered1);
	
		
		
	},
	
	handleFilter2 : function(oEvent){
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		
		// Seteo la estructura para contener los datos despues de filtrar la TABLA
		
		oDataFilter =[
			{
				prodId:1,
				prodName:"elástico",
				prodDescrip:"aaaaa",
				prodPrice:10,
				prodUOM:"metros",
				prodQuantity:200,
				prodWarranty:0,
				prodObservations:"aaaaaaaaaaa"
				
			}
		];
		
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			if ((!firstFiltered1)&&(!firstFiltered3)) { firstFiltered2 = true;} // Evaluo si es la primera TABLA que se filtró
			
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			if ((!filterFlag1)&&(!filterFlag3)) // Si NO HAY otra TABLA filtrada, reinicio el modelo y lo seteo
				//en la TABLA 2
				{	
				var ProductTableResetModel = new JSONModel();
				
				ProductTableResetModel.setData(oInitialData);
				ProductsTable2.setModel(ProductTableResetModel);
				}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//Cambio Triple filter 231 a 132
			
			
			if (tripleFilter231)
				{
				console.log("Cambio Triple Filtro FF Tabla 1");
				console.log("F132");
				
				///////////////////////////////////////////////////////
				
				// Obtengo el Binding de la TABLA 1
				var oBindingTable1 = ProductsTable1.getBinding();
				
				var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 3
				//console.log(aFiltersTable1);
				
				//////////////////
				//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
				sValueSavedFirstFiltered = oBindingTable1.aFilters[0].oValue1;
				//sColumnFirstFiltered = oColumn;
				sPathSavedFirstFiltered = oBindingTable1.aFilters[0].sPath;
				//////////////////
				
				//Resetear Modelo Tabla 1
				
				//Declaro el Modelo para Resetear la TABLA 1
				
				var  ProductsTableResetModel = new JSONModel();
				
				
				//SETEO los Datos Iniciales en el Modelo
				ProductsTableResetModel.setData(oInitialData);
				
				// Reseteo de los Modelos de las 2 tablas 
				
				ProductsTable1.setModel(ProductsTableResetModel);
				//ProductsTable3.setModel(ProductsTableResetModel);
				
				
				// Obtengo el Binding de la TABLA 1
				var oBindingTable1 = ProductsTable1.getBinding();
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable1.filter(aFiltersTable1);
				
				console.log(aFiltersTable1);
				
				//console.log(oBindingTable2.aIndices);
				
				

				for (var i=0;i<oBindingTable1.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				///////////////////////////////////////////////////////////
				
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
				// Obtengo el Binding de la TABLA 3
				var oBindingTable3 = ProductsTable3.getBinding();
				
				var oData = oBindingTable3.oList;
				
				var aFiltersTable3 = oBindingTable3.aFilters; //Obtengo el filtro aplicado en la TABLA 3
				//console.log(aFiltersTable3);
				
				var sOperator = "Contains";
			
				
				//Armo Filtro
				var oFilterTable3 = new Filter(sPathSaved, sOperator, sValueSaved);
				
				if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable3.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable3.push(oFilterTable3);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable3.filter(aFiltersTable3);
				
				for (var i=0;i<oBindingTable3.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 1
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable1.setModel(ProductsTableFilteredModel);
				
				//////////////////////////////////////////////////////
				
				
				// Obtengo el Binding de la TABLA 2
				var oBindingTable2 = ProductsTable2.getBinding();
				console.log(oBindingTable2);
				
				var oData = oBindingTable2.oList; //
				
				
				//console.log(oData);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Parámetros instroducidos en la columna filtrado TABLA 1
				
				var aFiltersTable2 = oBindingTable2.aFilters;
				
				var oColumn = oEvent.getParameter("column");
				
				//Parámetros
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				
				
				
				
				
				//Armo Filtro
				var oFilterTable2 = new Filter(sPath, sOperator, sValue);
				
				
				if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable2.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable2.push(oFilterTable2);
				
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable2.filter(aFiltersTable2);
				
				//console.log(aFiltersTable1);
				//console.log(oBindingTable1.aIndices);
				
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
				
				
				//Matcheo con el contenido del modelo de datos de la tabla
				
				for (var i=0;i<oBindingTable2.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);	
				
				///////////////////////////////////////////////////////
				
				firstFiltered1 = true;
				firstFiltered2 = false;
				firstFiltered3 = false;
				
				//Seteo Flags correspondientes
				tableTripleFilterChange = true;
				
				
				
				filterFlag2 = true;
				filterFlag1 = true;
				filterFlag3 = true;
				
				tripleFilter231 = false;
				tripleFilter132 = true;
				
				
				
				}
			
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			//Cambio Triple filter 321 a 312
			
			if (tripleFilter321)
				{
				
				console.log("Cambio Triple Filtro FF Tabla 3");
				console.log("F312");
				
				/////////////////////////////////////////////////////
				
				// Obtengo el Binding de la TABLA 1
				var oBindingTable1 = ProductsTable1.getBinding();
				
				var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 3
				//console.log(aFiltersTable1);
				
				//////////////////
				//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
				sValueSaved = oBindingTable1.aFilters[0].oValue1;
				//sColumnFirstFiltered = oColumn;
				sPathSaved = oBindingTable1.aFilters[0].sPath;
				//////////////////
				
				
				//Resetear Modelo Tabla 3
				
				//Declaro el Modelo para Resetear la TABLA 3
				
				var  ProductsTableResetModel = new JSONModel();
				
				
				//SETEO los Datos Iniciales en el Modelo
				ProductsTableResetModel.setData(oInitialData);
				
				// Reseteo de los Modelos de las 2 tablas 
				
				//ProductsTable1.setModel(ProductsTableResetModel);
				ProductsTable3.setModel(ProductsTableResetModel);
				
				// Obtengo el Binding de la TABLA 3
				var oBindingTable3 = ProductsTable3.getBinding();
				
				var aFiltersTable3 = oBindingTable3.aFilters; //Obtengo el filtro aplicado en la TABLA 3
				//console.log(aFiltersTable3);
				
				var sOperator = "Contains";
			
				
				//Armo Filtro
				var oFilterTable3 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
				
				if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable3.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable3.push(oFilterTable3);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable3.filter(aFiltersTable3);
				
				//console.log(oBindingTable2.aIndices);
				

				for (var i=0;i<oBindingTable3.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 2
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable2.setModel(ProductsTableFilteredModel);
				
				///////////////////////////////////////////////////////////////////////////////////
				
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
				// Obtengo el Binding de la TABLA 1
				var oBindingTable1 = ProductsTable1.getBinding();
				
				var oData = oBindingTable1.oList;
			
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable1.filter(aFiltersTable1);
				

				for (var i=0;i<oBindingTable1.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				///////////////////////////////////////////////////////////
				
				// Obtengo el Binding de la TABLA 2
				var oBindingTable2 = ProductsTable2.getBinding();
				console.log(oBindingTable2);
				
				var oData = oBindingTable2.oList; //
				
				
				//console.log(oData);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Parámetros instroducidos en la columna filtrado TABLA 1
				
				var aFiltersTable2 = oBindingTable2.aFilters;
				
				var oColumn = oEvent.getParameter("column");
				
				//Parámetros
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				
				
				
				
				
				//Armo Filtro
				var oFilterTable2 = new Filter(sPath, sOperator, sValue);
				
				
				if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable2.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable2.push(oFilterTable2);
				
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable2.filter(aFiltersTable2);
				
				//console.log(aFiltersTable1);
				//console.log(oBindingTable1.aIndices);
				
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
				
				
				//Matcheo con el contenido del modelo de datos de la tabla
				
				for (var i=0;i<oBindingTable2.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);	
				
				
				
				///////////////////////////////////////////////////////
				
				firstFiltered1 = false;
				firstFiltered2 = false;
				firstFiltered3 = true;
				
				//Seteo Flags correspondientes
				tableTripleFilterChange = true;
				
				
				
				filterFlag2 = true;
				filterFlag1 = true;
				filterFlag3 = true;
				
				tripleFilter321 = false;
				tripleFilter312 = true;
				
				
				
				}
					
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			//Cambio Triple filter 213 a 312
			
			
			if (tripleFilter213)
				{
					console.log("Cambio Triple Filtro FF Tabla 3");
					console.log("F312");
					
					//////////////////////////////////////////////
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					//////////////////
					//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
					sValueSavedFirstFiltered = oBindingTable3.aFilters[0].oValue1;
					//sColumnFirstFiltered = oColumn;
					sPathSavedFirstFiltered = oBindingTable3.aFilters[0].sPath;
					//////////////////
					
					
				
					
					
					
					var aFiltersTable3 = oBindingTable3.aFilters; //Obtengo el filtro aplicado en la TABLA 3
					console.log(aFiltersTable3);
					
					
					//Resetear Modelo Tabla 3
					
					//Declaro el Modelo para Resetear la TABLA 3
					
					var  ProductsTableResetModel = new JSONModel();
					
					
					//SETEO los Datos Iniciales en el Modelo
					ProductsTableResetModel.setData(oInitialData);
					
					// Reseteo de los Modelos de las 2 tablas 
					
					//ProductsTable1.setModel(ProductsTableResetModel);
					ProductsTable3.setModel(ProductsTableResetModel);
					
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable3.filter(aFiltersTable3);
					
					//console.log(oBindingTable2.aIndices);
					

					for (var i=0;i<oBindingTable3.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					console.log(oDataFilter);
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable2.setModel(ProductsTableFilteredModel);
					
					//////////////////////////////////////////////////////////////////////
					
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					// Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					
					console.log(oBindingTable1);
					
					var oData = oBindingTable1.oList;
					
					
					var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 3
					//console.log(aFiltersTable3);
					
					var sOperator = "Contains";
					
				
					
					
					//Armo Filtro
					var oFilterTable1 = new Filter(sPathSaved, sOperator, sValueSaved);
					
					if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable1.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					//console.log(oBindingTable2.aIndices);
					

					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					console.log(oDataFilter);
					
					//Declaro el Modelo para setear en las TABLAS 2 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					
					
					//////////////////////////////////////////////////////////////////////
					
					// Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					console.log(oBindingTable2);
					
					var oData = oBindingTable2.oList; //
					
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable2 = oBindingTable2.aFilters;
					
					var oColumn = oEvent.getParameter("column");
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					
					
					
					
					//Armo Filtro
					var oFilterTable2 = new Filter(sPath, sOperator, sValue);
					
					
					if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable2.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable2.push(oFilterTable2);
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable2.filter(aFiltersTable2);
					
					//console.log(aFiltersTable1);
					//console.log(oBindingTable1.aIndices);
					
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);	
					
					//////////////////////////////////////////////////////////////////////////////////////////

					firstFiltered1 = false;
					firstFiltered2 = false;
					firstFiltered3 = true;
					
					//Seteo Flags correspondientes
					tableTripleFilterChange = true;
					
					
					
					filterFlag2 = true;
					filterFlag1 = true;
					filterFlag3 = true;
					
					tripleFilter213 = false;
					tripleFilter312 = true;
				
				}
			
			
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			//Cambio Triple filter 123 a 132
			
			
			if (tripleFilter123)
				{
					console.log("Cambio Triple Filtro FF Tabla 1");
					console.log("F132");
					
					////////////////////////////////////////////////////////////////////
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					
					//console.log(oBindingTable1);
					//console.log(oBindingTable2);
					//console.log(oBindingTable3);
				
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Estos parametro tienen que se los de la nueva TABLA
					
					var aFiltersTable3 = oBindingTable3.aFilters; //Obtengo el filtro aplicado en la TABLA 3
					//console.log(aFiltersTable3);

					//var sValueTable2 = sValueSavedFirstFiltered;
					//var sPathTable2 = sPathSavedFirstFiltered;
					//console.log(sValueTable2);
					//console.log(sPathTable2);
					
					//////////////////
					//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
					
					
					sValueSaved = oBindingTable3.aFilters[0].oValue1;
					//sColumnFirstFiltered = oColumn;
					sPathSaved = oBindingTable3.aFilters[0].sPath;
					//////////////////
					
					
					
					//Resetear Modelo Tabla 1
					
					//Declaro el Modelo para Resetear la TABLA 1
					
					var  ProductsTableResetModel = new JSONModel();
					
					
					//SETEO los Datos Iniciales en el Modelo
					ProductsTableResetModel.setData(oInitialData);
					
					// Reseteo de los Modelos de las 2 tablas 
					
					ProductsTable1.setModel(ProductsTableResetModel);
					//ProductsTable3.setModel(ProductsTableResetModel);
					
					

					// Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					
					console.log(oBindingTable1);
					
					var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 3
					//console.log(aFiltersTable3);
					
					var sOperator = "Contains";
					
					//Armo Filtro
					var oFilterTable1 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
					
					if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable1.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					//console.log(oBindingTable2.aIndices);
					

					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					console.log(oDataFilter);
					
					//Declaro el Modelo para setear en las TABLAS 2 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					//////////////////////////////////////////////////////////////////////
					

					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					
					var oData = oBindingTable3.oList;
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable3.filter(aFiltersTable3);
					
					
	
					
					for (var i=0;i<oBindingTable3.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					console.log(oDataFilter);
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable2.setModel(ProductsTableFilteredModel);
					
					
					
					

					////////////////////////////////////////////////////////////////////////7
					
					// Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					console.log(oBindingTable2);
					
					var oData = oBindingTable2.oList; //
					
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable2 = oBindingTable2.aFilters;
					
					var oColumn = oEvent.getParameter("column");
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					
					
					
					
					//Armo Filtro
					var oFilterTable2 = new Filter(sPath, sOperator, sValue);
					
					
					if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable2.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable2.push(oFilterTable2);
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable2.filter(aFiltersTable2);
					
					//console.log(aFiltersTable1);
					//console.log(oBindingTable1.aIndices);
					
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);	
					
					
	
					
					///////////////////////////////////////////////////////////7
					
					
					
					firstFiltered1 = true;
					firstFiltered2 = false;
					firstFiltered3 = false;
					
					//Seteo Flags correspondientes
					tableTripleFilterChange = true;
					
					
					
					filterFlag2 = true;
					filterFlag1 = true;
					filterFlag3 = true;
					
					tripleFilter123 = false;
					tripleFilter132 = true;
					
					
					
					
					///////////////////////////////////////////////////////////////////
				}
			
			
			
			
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			//Filtro Triple TABLA 3 - TABLA 1 - TABLA 2
			
			if ((firstFiltered3)&&(filterFlag1)&&(!tableTripleFilterChange))
				{
					console.log("F. Triple T3-T1-T2");
					
					tripleFilter = true; //Activo el Flag de Filtro Triple
					tripleFilter312 = true;
					
					if (oEvent.getParameter("value")=="")
					{
						tripleFilter312 = false;
						//Reseteo Modelo de datos de la TABLA 1
						var ProductTableResetModel = new JSONModel();
						
						ProductTableResetModel.setData(oInitialData);
						ProductsTable3.setModel(ProductTableResetModel);
						
						//Obtengo el Binding de la TABLA 1
						var oBindingTable3 = ProductsTable3.getBinding();
						
						var aFiltersTable3 = oBindingTable3.aFilters;
						
						console.log(oBindingTable3);
						
						//console.log(sValueSavedTable1);
						//console.log(sPathSavedTable1);
						
						//console.log(sPathSaved);
						//console.log(sValueSaved);
						
						var sOperator = "Contains"
							
							
							
						//Armo Filtro
						var oFilterTable3 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
						
						if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
						{	
							aFiltersTable3.splice(0,1);
						}
						
						//Seteo el Filtro Creado
						aFiltersTable3.push(oFilterTable3);
						
						//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
						oBindingTable3.filter(aFiltersTable3);
						
						
						//Matcheo con el contenido del modelo de datos de la tabla
						
						for (var i=0;i<oBindingTable3.aIndices.length;i++){
							
							
							//	console.log(oData[oBinding.aIndices[i]]);
							oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
							
							}
						
						oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
						
						/////////////////////////////////////////////////////////////////
						
						// Debo guardar el  estado para el FILTRO CONCATENADO
						
						oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
						
						//Declaro el Modelo para setear en las TABLAS 1 Y 2
						
						var  ProductsTableFilteredModel = new JSONModel();
						
						
						//SETEO los Datos Filtrados
						ProductsTableFilteredModel.setData(oDataFilter);
						
						// Seteo de los Modelos de las 2 tablas matcheadas
						
						ProductsTable1.setModel(ProductsTableFilteredModel);
						ProductsTable2.setModel(ProductsTableFilteredModel);
						
						
						
						  
						// Reseteo la estructura para contener los datos despues de filtrar la TABLA
						
						oDataFilter =[
							{
								prodId:1,
								prodName:"elástico",
								prodDescrip:"aaaaa",
								prodPrice:10,
								prodUOM:"metros",
								prodQuantity:200,
								prodWarranty:0,
								prodObservations:"aaaaaaaaaaa"
								
							}
						];
						
							
						//Obtengo el Binding de la TABLA 3
						var oBindingTable1 = ProductsTable1.getBinding();
						
						console.log(oBindingTable1);
						
						var oData =  oBindingTable1.oList;
						
						console.log(oData);
						
						var aFiltersTable1 = oBindingTable1.aFilters;
						
						
							
						//Armo Filtro
						var oFilterTable1 = new Filter(sPathSaved, sOperator, sValueSaved);
						
						if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
						{	
							aFiltersTable1.splice(0,1);
						}
						
						//Seteo el Filtro Creado
						aFiltersTable1.push(oFilterTable1);
						
						//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
						oBindingTable1.filter(aFiltersTable1);
						
						console.log(oBindingTable1.aIndices);
						
						
						
						//Matcheo con el contenido del modelo de datos de la tabla
						
						for (var i=0;i<oBindingTable1.aIndices.length;i++){
							
							
							//	console.log(oData[oBinding.aIndices[i]]);
							oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
							
							}
						
						oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
						
						
						
						//Declaro el Modelo para setear en las TABLAS 2 Y 3
						
						var  ProductsTableFilteredModel = new JSONModel();
						
						
						//SETEO los Datos Filtrados
						ProductsTableFilteredModel.setData(oDataFilter);
						
						// Seteo de los Modelos de las 2 tablas matcheadas
						
						ProductsTable2.setModel(ProductsTableFilteredModel);
						ProductsTable3.setModel(ProductsTableFilteredModel);
						
						
						
					}else
						{
						
						
						
						
						//Obtengo el Binding de la TABLA 2
						var oBindingTable2 = ProductsTable2.getBinding();
						//console.log(oBindingTable2);
						
						// Obtengo el Binding de la TABLA 3
						var oBindingTable3 = ProductsTable3.getBinding();
						console.log(oBindingTable3);
						
						var oData = oBindingTable2.oList; //
						
						
						//console.log(oData);
						
						//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
						// Parámetros instroducidos en la columna filtrado TABLA 1
						
						var aFiltersTable2 = oBindingTable2.aFilters;
						
						var oColumn = oEvent.getParameter("column");
						
						//Parámetros
						var sPath = oEvent.getParameters().column.mProperties.filterProperty;
						var sOperator = "Contains";
						var sValue = oEvent.getParameter("value");
						
						//Armo Filtro
						var oFilterTable2 = new Filter(sPath, sOperator, sValue);
						
						
						if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
						{	
							aFiltersTable2.splice(0,1);
						}
						
						//Seteo el Filtro Creado
						aFiltersTable2.push(oFilterTable2);
						
						
						
						
						//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
						oBindingTable2.filter(aFiltersTable2);
						
						console.log(aFiltersTable2);
						console.log(oBindingTable2.aIndices);
						
						
						//Matcheo con el contenido del modelo de datos de la tabla
						
						for (var i=0;i<oBindingTable2.aIndices.length;i++){
							
							
							//	console.log(oData[oBinding.aIndices[i]]);
							oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
							
							}
						
						oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
						
						
						
						//Declaro el Modelo para setear en las TABLAS 1 Y 3
						
						var  ProductsTableFilteredModel = new JSONModel();
						
						
						//SETEO los Datos Filtrados
						ProductsTableFilteredModel.setData(oDataFilter);
						
						// Seteo de los Modelos de las 2 tablas matcheadas
						
						ProductsTable3.setModel(ProductsTableFilteredModel);
						ProductsTable1.setModel(ProductsTableFilteredModel);
						}
					
					
					
						
				}
			
			
	
			
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			

			//Filtro Triple TABLA 1 - TABLA 3 - TABLA 2
			
			if ((firstFiltered1)&&(filterFlag3)&&(!tableTripleFilterChange))
				{
					console.log("F. Triple T1-T3-T2");
					
					tripleFilter = true; //Activo el Flag de Filtro Triple
					tripleFilter132 = true;
					
					if (oEvent.getParameter("value")=="")
					{
						tripleFilter132 = false;
						//Reseteo Modelo de datos de la TABLA 1
						var ProductTableResetModel = new JSONModel();
						
						ProductTableResetModel.setData(oInitialData);
						ProductsTable1.setModel(ProductTableResetModel);
						
						//Obtengo el Binding de la TABLA 1
						var oBindingTable1 = ProductsTable1.getBinding();
						
						var aFiltersTable1 = oBindingTable1.aFilters;
						
						console.log(oBindingTable1);
						
						//console.log(sValueSavedTable1);
						//console.log(sPathSavedTable1);
						
						//console.log(sPathSaved);
						//console.log(sValueSaved);
						
						var sOperator = "Contains"
							
						//Armo Filtro
						var oFilterTable1 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
						
						if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
						{	
							aFiltersTable1.splice(0,1);
						}
						
						//Seteo el Filtro Creado
						aFiltersTable1.push(oFilterTable1);
						
						//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
						oBindingTable1.filter(aFiltersTable1);
						
						
						//Matcheo con el contenido del modelo de datos de la tabla
						
						for (var i=0;i<oBindingTable1.aIndices.length;i++){
							
							
							//	console.log(oData[oBinding.aIndices[i]]);
							oDataFilter.push(oInitialData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
							
							}
						
						oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
						
						/////////////////////////////////////////////////////////////////
						
						// Debo guardar el  estado para el FILTRO CONCATENADO
						
						oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
						
						
						
						/////////////////////////////////////////////////////////////////
						//Declaro el Modelo para setear en las TABLAS 1 Y 2
						
						var  ProductsTableFilteredModel = new JSONModel();
						
						
						//SETEO los Datos Filtrados
						ProductsTableFilteredModel.setData(oDataFilter);
						
						// Seteo de los Modelos de las 2 tablas matcheadas
						
						ProductsTable2.setModel(ProductsTableFilteredModel);
						ProductsTable3.setModel(ProductsTableFilteredModel);
						
						
						
						  
						// Reseteo la estructura para contener los datos despues de filtrar la TABLA
						
						oDataFilter =[
							{
								prodId:1,
								prodName:"elástico",
								prodDescrip:"aaaaa",
								prodPrice:10,
								prodUOM:"metros",
								prodQuantity:200,
								prodWarranty:0,
								prodObservations:"aaaaaaaaaaa"
								
							}
						];
						
							
						//Obtengo el Binding de la TABLA 3
						var oBindingTable3 = ProductsTable3.getBinding();
						
						console.log(oBindingTable3);
						
						var oData =  oBindingTable3.oList;
						
						console.log(oData);
						
						var aFiltersTable3 = oBindingTable3.aFilters;
						
						
							
						//Armo Filtro
						var oFilterTable3 = new Filter(sPathSaved, sOperator, sValueSaved);
						
						if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
						{	
							aFiltersTable3.splice(0,1);
						}
						
						//Seteo el Filtro Creado
						aFiltersTable3.push(oFilterTable3);
						
						//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
						oBindingTable3.filter(aFiltersTable3);
						
						console.log(oBindingTable3.aIndices);
						
						
						
						//Matcheo con el contenido del modelo de datos de la tabla
						
						for (var i=0;i<oBindingTable3.aIndices.length;i++){
							
							
							//	console.log(oData[oBinding.aIndices[i]]);
							oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
							
							}
						
						oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
						
						
						
						//Declaro el Modelo para setear en las TABLAS 1 Y 3
						
						var  ProductsTableFilteredModel = new JSONModel();
						
						
						//SETEO los Datos Filtrados
						ProductsTableFilteredModel.setData(oDataFilter);
						
						// Seteo de los Modelos de las 2 tablas matcheadas
						
						ProductsTable1.setModel(ProductsTableFilteredModel);
						ProductsTable2.setModel(ProductsTableFilteredModel);
						
						
						
					}else
						{
						
						
						
						
						//Obtengo el Binding de la TABLA 2
						var oBindingTable2 = ProductsTable2.getBinding();
						//console.log(oBindingTable2);
						
						// Obtengo el Binding de la TABLA 3
						var oBindingTable3 = ProductsTable3.getBinding();
						console.log(oBindingTable3);
						
						var oData = oBindingTable2.oList; //
						
						
						//console.log(oData);
						
						//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
						// Parámetros instroducidos en la columna filtrado TABLA 1
						
						var aFiltersTable2 = oBindingTable2.aFilters;
						
						var oColumn = oEvent.getParameter("column");
						
						//Parámetros
						var sPath = oEvent.getParameters().column.mProperties.filterProperty;
						var sOperator = "Contains";
						var sValue = oEvent.getParameter("value");
						
						//Armo Filtro
						var oFilterTable2 = new Filter(sPath, sOperator, sValue);
						
						
						if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
						{	
							aFiltersTable2.splice(0,1);
						}
						
						//Seteo el Filtro Creado
						aFiltersTable2.push(oFilterTable2);
						
						//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
						oBindingTable2.filter(aFiltersTable2);
						
						console.log(aFiltersTable2);
						console.log(oBindingTable2.aIndices);
						
						
						//Matcheo con el contenido del modelo de datos de la tabla
						
						for (var i=0;i<oBindingTable2.aIndices.length;i++){
							
							
							//	console.log(oData[oBinding.aIndices[i]]);
							oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
							
							}
						
						oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
						
						
						
						//Declaro el Modelo para setear en las TABLAS 1 Y 3
						
						var  ProductsTableFilteredModel = new JSONModel();
						
						
						//SETEO los Datos Filtrados
						ProductsTableFilteredModel.setData(oDataFilter);
						
						// Seteo de los Modelos de las 2 tablas matcheadas
						
						ProductsTable3.setModel(ProductsTableFilteredModel);
						ProductsTable1.setModel(ProductsTableFilteredModel);
						}
					
					
					
						
				}
			
			
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			//Cambio a TABLA 1
		if ((firstFiltered2)&&(filterFlag1)&&(!filterFlag3))
			{
				console.log("Cambio a Tabla 1");
				
				
				oDataFilterTable1_3 =[ 		
				{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}];
				
				//console.log(oDataFilterTable1_3);
				
				
				firstFiltered2 = false; //Seteo los FLags correspondientes para situarme correctamente en el nuevo estado
				firstFiltered1 = true;
				tableFirstFilteredChange = true;
				
				
				//Declaro el Modelo para Resetear la TABLA 2 
				
				var  ProductsTableResetModel = new JSONModel();
				
				
				//SETEO los Datos Iniciales en el Modelo
				ProductsTableResetModel.setData(oInitialData);
				
				// Reseteo de los Modelos de las 2 tablas 
				
				ProductsTable1.setModel(ProductsTableResetModel);
				ProductsTable2.setModel(ProductsTableResetModel);
				
				
				// Obtengo el Binding de la TABLA 2
				var oBindingTable1 = ProductsTable1.getBinding();
				
				//console.log(oBindingTable2);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Estos parametro tienen que se los de la nueva TABLA
				
				var aFilters = oBindingTable1.aFilters;
				//console.log(aFilters);
				
				//var oColumn = oEvent.getParameter("column");
				var oColumn = sColumn;
				
				//var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sPath =	sPathSaved;
				
				var sOperator = "Contains";
				//var sValue = oEvent.getParameter("value");
				var sValue = sValueSaved;
				
				var oFilter = new Filter(sPath, sOperator, sValue);
				
				if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
				aFilters.splice(0,1);
				}
				
				
				aFilters.push(oFilter);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable1.filter(aFilters);
				console.log(aFilters);
				
				
				for (var i=0;i<oBindingTable1.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilterPreviousState);
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				////////////////////////////////////////////////////////
				
				
				// Obtengo el Binding de la TABLA 2
				var oBindingTable2 = ProductsTable2.getBinding();
				
				//console.log(oBindingTable1);
				
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Parámetros instroducidos en la columna filtrado TABLA 1
				
				var aFiltersTable2 = oBindingTable2.aFilters;
				
				//Parámetros
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				
				//Armo Filtro
				var oFilterTable2 = new Filter(sPath, sOperator, sValue);
				
				
				////////////////////////////////////////
				//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
				
				sValueSaved = sValue;
				sColumn = oColumn;
				sPathSaved = sPath;
				//////////////////////////////////////
				
				
				//Seteo el Filtro Creado
				aFiltersTable2.push(oFilterTable2);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable2.filter(aFiltersTable2);
				
				console.log(aFiltersTable2);
				console.log(oBindingTable2.aIndices);
				
				
				
				
				
				for (var i=0;i<oBindingTable2.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilterTable1_3.push(oDataFilterPreviousState[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				
				oDataFilterTable1_3.splice(0,1);
				
				console.log(oDataFilterTable1_3);	
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel2 = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel2.setData(oDataFilterTable1_3);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel2);
				ProductsTable3.setModel(ProductsTableFilteredModel2);
				
				
			}
		
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		
		
		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		//Cambio a TABLA 3
	if ((firstFiltered2)&&(!filterFlag1)&&(filterFlag3))
		{
			console.log("Cambio a Tabla 3");
			
			
			oDataFilterTable1_3 =[ 		
			{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}];
			
			//console.log(oDataFilterTable1_3);
			
			
			firstFiltered2 = false; //Seteo los FLags correspondientes para situarme correctamente en el nuevo estado
			firstFiltered3 = true;
			tableFirstFilteredChange = true;
			
			
			//Declaro el Modelo para Resetear la TABLA 2 
			
			var  ProductsTableResetModel = new JSONModel();
			
			
			//SETEO los Datos Iniciales en el Modelo
			ProductsTableResetModel.setData(oInitialData);
			
			// Reseteo de los Modelos de las 2 tablas 
			
			ProductsTable2.setModel(ProductsTableResetModel);
			ProductsTable3.setModel(ProductsTableResetModel);
			
			
			// Obtengo el Binding de la TABLA 3
			var oBindingTable3 = ProductsTable3.getBinding();
			
			//console.log(oBindingTable2);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Estos parametro tienen que se los de la nueva TABLA
			
			var aFilters = oBindingTable3.aFilters;
			//console.log(aFilters);
			
			//var oColumn = oEvent.getParameter("column");
			var oColumn = sColumn;
			
			//var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sPath =	sPathSaved;
			
			var sOperator = "Contains";
			//var sValue = oEvent.getParameter("value");
			var sValue = sValueSaved;
			
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
			aFilters.splice(0,1);
			}
			
			
			aFilters.push(oFilter);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable3.filter(aFilters);
			console.log(aFilters);
			
			
			for (var i=0;i<oBindingTable3.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilterPreviousState);
			
			//Declaro el Modelo para setear en las TABLAS 2 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable2.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			/////////////////////////////////////////////////////////////////////
			
			// Obtengo el Binding de la TABLA 2
			var oBindingTable2 = ProductsTable2.getBinding();
			
			//console.log(oBindingTable1);
			
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Parámetros instroducidos en la columna filtrado TABLA 1
			
			var aFiltersTable2 = oBindingTable2.aFilters;
			
			//Parámetros
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			
			//Armo Filtro
			var oFilterTable2 = new Filter(sPath, sOperator, sValue);
			
			////////////////////////////////////////
			//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
			
			sValueSaved = sValue;
			sColumn = oColumn;
			sPathSaved = sPath;
			//////////////////////////////////////
			
			//Seteo el Filtro Creado
			aFiltersTable2.push(oFilterTable2);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable2.filter(aFiltersTable2);
			
			console.log(aFiltersTable2);
			console.log(oBindingTable2.aIndices);
			
			
			
			
			
			for (var i=0;i<oBindingTable2.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilterTable1_3.push(oDataFilterPreviousState[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			
			oDataFilterTable1_3.splice(0,1);
			
			console.log(oDataFilterTable1_3);	
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 3
			
			var  ProductsTableFilteredModel2 = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel2.setData(oDataFilterTable1_3);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel2);
			ProductsTable3.setModel(ProductsTableFilteredModel2);
			
			
		}
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Si la TABLA 2 es la PRIMERA en filtrar  Procedemos de la siguiente manera
	
			
			if ((firstFiltered2)&&(!tableTripleFilterChange)){ 
				
				tableFirstFilteredChange = false; //Indico que ya se ha producido el cambio de TABLA
				
				console.log("Ind. TABLA 2");
				//Obtengo la vinculación con los datos de la TABLA 2
				
				var oBinding = ProductsTable2.getBinding();
				
				//console.log(oEvent.getParameters().column.mProperties.filterProperty);
				//console.log(oBinding.aIndices);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFilters = oBinding.aFilters;
				//console.log(aFilters);
				
				var oColumn = oEvent.getParameter("column");
				
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(sPath, sOperator, sValue);
				
				if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFilters.splice(0,1);
				}
				
				//////////////////
				//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
				
				sValueSavedFirstFiltered = sValue;
				sColumnFirstFiltered = oColumn;
				sPathSavedFirstFiltered = sPath;
				//////////////////
				
				
				aFilters.push(oFilter);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 2
				oBinding.filter(aFilters);
				
				console.log(aFilters);
				//console.log(oBinding.aIndices);
				
				
				
				for (var i=0;i<oBinding.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBinding.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilterPreviousState);
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				
				
			}
			else //Si la TABLA 2 NO ES la PRIMERA en ser filtrada
				{
				
				
				if ((!tableFirstFilteredChange)&&(!tripleFilter))
				{
					console.log("Concatenado TABLA 2")
					
					
					
					//Obtengo la vinculación con los datos de la TABLA 2
					
					var oBinding = ProductsTable2.getBinding();
					
					//console.log(oEvent.getParameters().column.mProperties.filterProperty);
					//console.log(oBinding.aIndices);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					
					var aFilters = oBinding.aFilters;
					//console.log(aFilters);
					
					var oColumn = oEvent.getParameter("column");
					
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					var oFilter = new Filter(sPath, sOperator, sValue);
					
					if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFilters.splice(0,1);
					}
					
					//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
					
					sValueSaved = sValue;
					sColumn = oColumn;
					sPathSaved = sPath;
					
					aFilters.push(oFilter);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 2
					oBinding.filter(aFilters);
					
					console.log(aFilters);
					
					//console.log(oBinding.aIndices);
					
					////////////////////////////////////////////////////// 
					// TENGO QUE REALIZAR EL MATCHEO CON EL MODELO ACTUAL DE LA TABLA 2
					
					
					
					for (var i=0;i<oBinding.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oDataFilterPreviousState[oBinding.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					//////////////////////////////////////////////////////////////////
					console.log(oDataFilterPreviousState);
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
				
				}
				
				
				}
			
	//////////////////////////////////////////////////////////////////
			
			if (oEvent.getParameter("value")=="")
			{
							
				filterFlag2 = false;  //Indico que se ha limpiado la celda de la columna de filtrado en TABLA 1
				//filtercleanFlag1 = true; // Indico que se ha limpiado la celda de filtrado
				firstFiltered2 = false; // Compruebo si es la primera tabla que se filtro para resetear el flag
				tripleFilter = false; //Reseteo el Flag de Filtro Triple
				
			}else
				{
				
				filterFlag2 = true; // Indico que se tiene una condición de filtrado en TABLA 2
				
				}
				
			console.log(filterFlag2);
			console.log(firstFiltered2);
			
			tableFirstFilteredChange = false;
			tableTripleFilterChange = false;
			
	},
	
	
	
handleFilter3 : function(oEvent){
		
	
	
	var ProductsTable1 = this.getView().byId("ProductsTable");
	var ProductsTable2 = this.getView().byId("ProductsTable2");
	var ProductsTable3 = this.getView().byId("ProductsTable3");
	
	
	// Seteo la estructura para contener los datos despues de filtrar la TABLA
	
	oDataFilter =[
		{
			prodId:1,
			prodName:"elástico",
			prodDescrip:"aaaaa",
			prodPrice:10,
			prodUOM:"metros",
			prodQuantity:200,
			prodWarranty:0,
			prodObservations:"aaaaaaaaaaa"
			
		}
	];
	

	
		if ((!firstFiltered1)&&(!firstFiltered2)) { firstFiltered3 = true;} // Evaluo si es la primera TABLA que se filtró
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Si NO HAY otra TABLA filtrada, reinicio el modelo y lo seteo
		
		if ((!filterFlag1)&&(!filterFlag2)) 
			//en la TABLA 3
			{	
			var ProductTableResetModel = new JSONModel();
			
			ProductTableResetModel.setData(oInitialData);
			ProductsTable3.setModel(ProductTableResetModel);
			}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//Cambio de filtro triple 312 a 213
		
		if (tripleFilter312)
			{
				console.log("Cambio Triple Filtro FF Tabla 2");
				console.log("F213");
				
				/////////////////////////////////////////////////
			
				// Obtengo el Binding de la TABLA 1
				var oBindingTable2 = ProductsTable2.getBinding();
				

				var aFiltersTable2 = oBindingTable2.aFilters; //Obtengo el filtro aplicado en la TABLA 3
				//console.log(aFiltersTable1);
				
				//////////////////
				//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
				sValueSavedFirstFiltered  = oBindingTable2.aFilters[0].oValue1;
				//sColumnFirstFiltered = oColumn;
				sPathSavedFirstFiltered = oBindingTable2.aFilters[0].sPath;
				//////////////////
				
				/////////////////////////////////////////////////////
				
				//Resetear Modelo Tabla 2
				
				//Declaro el Modelo para Resetear la TABLA 2
				
				var  ProductsTableResetModel = new JSONModel();
				
				
				//SETEO los Datos Iniciales en el Modelo
				ProductsTableResetModel.setData(oInitialData);
				
				// Reseteo de los Modelos de las 2 tablas 
				
				//ProductsTable1.setModel(ProductsTableResetModel);
				ProductsTable2.setModel(ProductsTableResetModel);
				
				
				
				// Obtengo el Binding de la TABLA 2
				var oBindingTable2 = ProductsTable2.getBinding();
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable2.filter(aFiltersTable2);
				
				

				for (var i=0;i<oBindingTable2.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				///////////////////////////////////////////////////////////////////////////////
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
				// Obtengo el Binding de la TABLA 1
				var oBindingTable1 = ProductsTable1.getBinding();
				
				var oData = oBindingTable1.oList;
			
				
				var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 2
				//console.log(aFiltersTable3);
				
				var sOperator = "Contains";
			
				
				//Armo Filtro
				var oFilterTable1 = new Filter(sPathSaved, sOperator, sValueSaved);
				
				if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable1.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable1.push(oFilterTable1);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable1.filter(aFiltersTable1);
				
				
				for (var i=0;i<oBindingTable1.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				////////////////////////////////////////////////////////////////////////////////////
				
				// Obtengo el Binding de la TABLA 3
				var oBindingTable3 = ProductsTable3.getBinding();
				console.log(oBindingTable3);
				
				var oData = oBindingTable3.oList; //
				
				
				//console.log(oData);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Parámetros instroducidos en la columna filtrado TABLA 1
				
				var aFiltersTable3 = oBindingTable3.aFilters;
				
				var oColumn = oEvent.getParameter("column");
				
				//Parámetros
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				

				//Armo Filtro
				var oFilterTable3 = new Filter(sPath, sOperator, sValue);
				
				
				if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable3.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable3.push(oFilterTable3);
				
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable3.filter(aFiltersTable3);
				
				//console.log(aFiltersTable1);
				//console.log(oBindingTable1.aIndices);
				
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
				
				
				//Matcheo con el contenido del modelo de datos de la tabla
				
				for (var i=0;i<oBindingTable3.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 2
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable2.setModel(ProductsTableFilteredModel);	
				
				
				
				/////////////////////////////////////////////////////////////////////////////////////
				
				
				firstFiltered1 = false;
				firstFiltered2 = true;
				firstFiltered3 = false;
				
				//Seteo Flags correspondientes
				tableTripleFilterChange = true;
				
				filterFlag2 = true;
				filterFlag1 = true;
				filterFlag3 = true;
				
				tripleFilter312 = false;
				tripleFilter213 = true;
				
			}
		
		
		
		
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/// Cambio de filtro triple 231 a 213
		
		
		if (tripleFilter231)
		{
			
			console.log("Cambio Triple Filtro FF Tabla 2");
			console.log("F213");
			
			/////////////////////////////////////////////////
			
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable1 = ProductsTable1.getBinding();
			

			var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 3
			//console.log(aFiltersTable1);
			
			//////////////////
			//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
			sValueSaved  = oBindingTable1.aFilters[0].oValue1;
			//sColumnFirstFiltered = oColumn;
			sPathSaved = oBindingTable1.aFilters[0].sPath;
			//////////////////
			
			
			
			////////////////////////////////////////////////////////////////////////////////////
			
			//Resetear Modelo Tabla 2
			
			//Declaro el Modelo para Resetear la TABLA 2
			
			var  ProductsTableResetModel = new JSONModel();
			
			
			//SETEO los Datos Iniciales en el Modelo
			ProductsTableResetModel.setData(oInitialData);
			
			// Reseteo de los Modelos de las 2 tablas 
			
			//ProductsTable1.setModel(ProductsTableResetModel);
			ProductsTable2.setModel(ProductsTableResetModel);
			
			
			
			// Obtengo el Binding de la TABLA 2
			var oBindingTable2 = ProductsTable2.getBinding();
			
			
			var aFiltersTable2 = oBindingTable2.aFilters; //Obtengo el filtro aplicado en la TABLA 2
			//console.log(aFiltersTable3);
			
			var sOperator = "Contains";
		
			
			//Armo Filtro
			var oFilterTable2 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
			
			if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFiltersTable2.splice(0,1);
			}
			
			//Seteo el Filtro Creado
			aFiltersTable2.push(oFilterTable2);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable2.filter(aFiltersTable2);
			

			for (var i=0;i<oBindingTable2.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oInitialData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilter);
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			//////////////////////////////////////////////////////////////////////////////////////
			
			
			// Reseteo la estructura para contener los datos despues de filtrar la TABLA
			
			oDataFilter =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}
			];
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable1 = ProductsTable1.getBinding();
			
			var oData = oBindingTable1.oList;
		
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable1.filter(aFiltersTable1);
			
			for (var i=0;i<oBindingTable1.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilter);
			
			//Declaro el Modelo para setear en las TABLAS 2 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable2.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			////////////////////////////////////////////////////////////////////////////////////
			
			// Obtengo el Binding de la TABLA 3
			var oBindingTable3 = ProductsTable3.getBinding();
			console.log(oBindingTable3);
			
			var oData = oBindingTable3.oList; //
			
			
			//console.log(oData);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Parámetros instroducidos en la columna filtrado TABLA 1
			
			var aFiltersTable3 = oBindingTable3.aFilters;
			
			var oColumn = oEvent.getParameter("column");
			
			//Parámetros
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			

			//Armo Filtro
			var oFilterTable3 = new Filter(sPath, sOperator, sValue);
			
			
			if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFiltersTable3.splice(0,1);
			}
			
			//Seteo el Filtro Creado
			aFiltersTable3.push(oFilterTable3);
			
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable3.filter(aFiltersTable3);
			
			//console.log(aFiltersTable1);
			//console.log(oBindingTable1.aIndices);
			
			// Reseteo la estructura para contener los datos despues de filtrar la TABLA
			
			oDataFilter =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}
			];
			
			
			
			//Matcheo con el contenido del modelo de datos de la tabla
			
			for (var i=0;i<oBindingTable3.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 2
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable2.setModel(ProductsTableFilteredModel);	
			
			
			
			/////////////////////////////////////////////////////////////////////////////////////
			
			
			firstFiltered1 = false;
			firstFiltered2 = true;
			firstFiltered3 = false;
			
			//Seteo Flags correspondientes
			tableTripleFilterChange = true;
			
			filterFlag2 = true;
			filterFlag1 = true;
			filterFlag3 = true;
			
			tripleFilter231 = false;
			tripleFilter213 = true;
			
			
			
		}
		
		
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/// Cambio de filtro triple 132 a 123
		
		if (tripleFilter132)
		{
			console.log("Cambio Triple Filtro FF Tabla 1");
			console.log("F123");
			
			////////////////////////////////////////////////////////
			
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable2 = ProductsTable2.getBinding();
			

			var aFiltersTable2 = oBindingTable2.aFilters; //Obtengo el filtro aplicado en la TABLA 3
			//console.log(aFiltersTable1);
			
			//////////////////
			//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
			sValueSaved  = oBindingTable2.aFilters[0].oValue1;
			//sColumnFirstFiltered = oColumn;
			sPathSaved = oBindingTable2.aFilters[0].sPath;
			//////////////////
			
			/////////////////////////////////////////////////7
			
			
			//Resetear Modelo Tabla 1
			
			//Declaro el Modelo para Resetear la TABLA 1
			
			var  ProductsTableResetModel = new JSONModel();
			
			
			//SETEO los Datos Iniciales en el Modelo
			ProductsTableResetModel.setData(oInitialData);
			
			// Reseteo de los Modelos de las 2 tablas 
			
			//ProductsTable1.setModel(ProductsTableResetModel);
			ProductsTable1.setModel(ProductsTableResetModel);
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable1 = ProductsTable1.getBinding();
			
			
			var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 3
			//console.log(aFiltersTable3);
			
			var sOperator = "Contains";
		
			
			//Armo Filtro
			var oFilterTable1 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
			
			if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFiltersTable1.splice(0,1);
			}
			
			//Seteo el Filtro Creado
			aFiltersTable1.push(oFilterTable1);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable1.filter(aFiltersTable1);
			

			for (var i=0;i<oBindingTable1.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oInitialData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilter);
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 2
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable2.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			///////////////////////////////////////////////////////////////////////////////////
			
			
			// Reseteo la estructura para contener los datos despues de filtrar la TABLA
			
			oDataFilter =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}
			];
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable2 = ProductsTable2.getBinding();
			
			var oData = oBindingTable2.oList;
		
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable2.filter(aFiltersTable2);
			
			for (var i=0;i<oBindingTable2.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilter);
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			//////////////////////////////////////////////////////////////////////////////////////////////
			
			// Obtengo el Binding de la TABLA 3
			var oBindingTable3 = ProductsTable3.getBinding();
			console.log(oBindingTable3);
			
			var oData = oBindingTable3.oList; //
			
			
			//console.log(oData);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Parámetros instroducidos en la columna filtrado TABLA 1
			
			var aFiltersTable3 = oBindingTable3.aFilters;
			
			var oColumn = oEvent.getParameter("column");
			
			//Parámetros
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			

			//Armo Filtro
			var oFilterTable3 = new Filter(sPath, sOperator, sValue);
			
			
			if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFiltersTable3.splice(0,1);
			}
			
			//Seteo el Filtro Creado
			aFiltersTable3.push(oFilterTable3);
			
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable3.filter(aFiltersTable3);
			
			//console.log(aFiltersTable1);
			//console.log(oBindingTable1.aIndices);
			
			// Reseteo la estructura para contener los datos despues de filtrar la TABLA
			
			oDataFilter =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}
			];
			
			
			
			//Matcheo con el contenido del modelo de datos de la tabla
			
			for (var i=0;i<oBindingTable3.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 2
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable2.setModel(ProductsTableFilteredModel);	
			
			////////////////////////////////////////////////////////////////////////////////////
			
			firstFiltered1 = true;
			firstFiltered2 = false;
			firstFiltered3 = false;
			
			//Seteo Flags correspondientes
			tableTripleFilterChange = true;
			
			
			
			filterFlag2 = true;
			filterFlag1 = true;
			filterFlag3 = true;
			
			tripleFilter132 = false;
			tripleFilter123 = true;
		
		}
		
		
		
		
		
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//Cambio de filtro triple 321 a 123
		
		
		if (tripleFilter321)
			{
				
			console.log("Cambio Triple Filtro FF Tabla 1");
			console.log("F123");
			
			/////////////////////////////////////////////////////
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable1 = ProductsTable1.getBinding();
			

			var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 3
			//console.log(aFiltersTable1);
			
			//////////////////
			//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
			sValueSavedFirstFiltered  = oBindingTable1.aFilters[0].oValue1;
			//sColumnFirstFiltered = oColumn;
			sPathSavedFirstFiltered = oBindingTable1.aFilters[0].sPath;
			//////////////////
			

			//Resetear Modelo Tabla 1
			
			//Declaro el Modelo para Resetear la TABLA 1
			
			var  ProductsTableResetModel = new JSONModel();
			
			
			//SETEO los Datos Iniciales en el Modelo
			ProductsTableResetModel.setData(oInitialData);
			
			// Reseteo de los Modelos de las 2 tablas 
			
			//ProductsTable1.setModel(ProductsTableResetModel);
			ProductsTable1.setModel(ProductsTableResetModel);
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable1 = ProductsTable1.getBinding();
			
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable1.filter(aFiltersTable1);
			

			for (var i=0;i<oBindingTable1.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oInitialData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilter);
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 2
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable2.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			///////////////////////////////////////////////////////////////////////////////////
			
// Reseteo la estructura para contener los datos despues de filtrar la TABLA
			
			oDataFilter =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}
			];
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable2 = ProductsTable2.getBinding();
			
			var oData = oBindingTable2.oList;
			
			var aFiltersTable2 = oBindingTable2.aFilters; //Obtengo el filtro aplicado en la TABLA 3
			//console.log(aFiltersTable3);
			
			var sOperator = "Contains";
		
			
			//Armo Filtro
			var oFilterTable2 = new Filter(sPathSaved, sOperator, sValueSaved);
			
			if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFiltersTable2.splice(0,1);
			}
			
			//Seteo el Filtro Creado
			aFiltersTable2.push(oFilterTable2);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable2.filter(aFiltersTable2);
			

			for (var i=0;i<oBindingTable2.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilter);
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			///////////////////////////////////////////////////////////
			
			
			// Obtengo el Binding de la TABLA 3
			var oBindingTable3 = ProductsTable3.getBinding();
			console.log(oBindingTable3);
			
			var oData = oBindingTable3.oList; //
			
			
			//console.log(oData);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Parámetros instroducidos en la columna filtrado TABLA 1
			
			var aFiltersTable3 = oBindingTable3.aFilters;
			
			var oColumn = oEvent.getParameter("column");
			
			//Parámetros
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			

			//Armo Filtro
			var oFilterTable3 = new Filter(sPath, sOperator, sValue);
			
			
			if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFiltersTable3.splice(0,1);
			}
			
			//Seteo el Filtro Creado
			aFiltersTable3.push(oFilterTable3);
			
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable3.filter(aFiltersTable3);
			
			//console.log(aFiltersTable1);
			//console.log(oBindingTable1.aIndices);
			
			// Reseteo la estructura para contener los datos despues de filtrar la TABLA
			
			oDataFilter =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}
			];
			
			
			
			//Matcheo con el contenido del modelo de datos de la tabla
			
			for (var i=0;i<oBindingTable3.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 2
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable2.setModel(ProductsTableFilteredModel);	
			
			
			
			////////////////////////////////////////////////////////////////////////////////////
			
			firstFiltered1 = true;
			firstFiltered2 = false;
			firstFiltered3 = false;
			
			//Seteo Flags correspondientes
			tableTripleFilterChange = true;
			
			
			
			filterFlag2 = true;
			filterFlag1 = true;
			filterFlag3 = true;
			
			tripleFilter321 = false;
			tripleFilter123 = true;
			
			/////////////////////////////////////////////////////////////////////////////////
			
			
			/*
			if (tripleFilter321)
			{
			
			console.log("Cambio Triple Filtro FF Tabla 3");
			console.log("F312");
			
			/////////////////////////////////////////////////////
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable1 = ProductsTable1.getBinding();
			
			var aFiltersTable1 = oBindingTable1.aFilters; //Obtengo el filtro aplicado en la TABLA 3
			//console.log(aFiltersTable1);
			
			//////////////////
			//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
			sValueSaved = oBindingTable1.aFilters[0].oValue1;
			//sColumnFirstFiltered = oColumn;
			sPathSaved = oBindingTable1.aFilters[0].sPath;
			//////////////////
			
			
			//Resetear Modelo Tabla 3
			
			//Declaro el Modelo para Resetear la TABLA 3
			
			var  ProductsTableResetModel = new JSONModel();
			
			
			//SETEO los Datos Iniciales en el Modelo
			ProductsTableResetModel.setData(oInitialData);
			
			// Reseteo de los Modelos de las 2 tablas 
			
			//ProductsTable1.setModel(ProductsTableResetModel);
			ProductsTable3.setModel(ProductsTableResetModel);
			
			// Obtengo el Binding de la TABLA 3
			var oBindingTable3 = ProductsTable3.getBinding();
			
			var aFiltersTable3 = oBindingTable3.aFilters; //Obtengo el filtro aplicado en la TABLA 3
			//console.log(aFiltersTable3);
			
			var sOperator = "Contains";
		
			
			//Armo Filtro
			var oFilterTable3 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
			
			if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFiltersTable3.splice(0,1);
			}
			
			//Seteo el Filtro Creado
			aFiltersTable3.push(oFilterTable3);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable3.filter(aFiltersTable3);
			
			//console.log(oBindingTable2.aIndices);
			

			for (var i=0;i<oBindingTable3.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oInitialData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilter);
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 2
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable2.setModel(ProductsTableFilteredModel);
			
			///////////////////////////////////////////////////////////////////////////////////
			
			// Reseteo la estructura para contener los datos despues de filtrar la TABLA
			
			oDataFilter =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}
			];
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable1 = ProductsTable1.getBinding();
			
			var oData = oBindingTable1.oList;
		
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable1.filter(aFiltersTable1);
			

			for (var i=0;i<oBindingTable1.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilter);
			
			//Declaro el Modelo para setear en las TABLAS 2 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable2.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			///////////////////////////////////////////////////////////
			
			// Obtengo el Binding de la TABLA 2
			var oBindingTable2 = ProductsTable2.getBinding();
			console.log(oBindingTable2);
			
			var oData = oBindingTable2.oList; //
			
			
			//console.log(oData);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Parámetros instroducidos en la columna filtrado TABLA 1
			
			var aFiltersTable2 = oBindingTable2.aFilters;
			
			var oColumn = oEvent.getParameter("column");
			
			//Parámetros
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			
			
			
			
			
			//Armo Filtro
			var oFilterTable2 = new Filter(sPath, sOperator, sValue);
			
			
			if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFiltersTable2.splice(0,1);
			}
			
			//Seteo el Filtro Creado
			aFiltersTable2.push(oFilterTable2);
			
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable2.filter(aFiltersTable2);
			
			//console.log(aFiltersTable1);
			//console.log(oBindingTable1.aIndices);
			
			// Reseteo la estructura para contener los datos despues de filtrar la TABLA
			
			oDataFilter =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}
			];
			
			
			
			//Matcheo con el contenido del modelo de datos de la tabla
			
			for (var i=0;i<oBindingTable2.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);	
			
			
			
			///////////////////////////////////////////////////////
			
			firstFiltered1 = false;
			firstFiltered2 = false;
			firstFiltered3 = true;
			
			//Seteo Flags correspondientes
			tableTripleFilterChange = true;
			
			
			
			filterFlag2 = true;
			filterFlag1 = true;
			filterFlag3 = true;
			
			tripleFilter321 = false;
			tripleFilter312 = true;
			
			
			
			} */
			
			
			
			}
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		//Filtro Triple TABLA 2 - TABLA 1 - TABLA 3
		
		if ((firstFiltered2)&&(filterFlag1)&&(!tableTripleFilterChange))
		{
			console.log("F. Triple T2-T1-T3");
			
			tripleFilter = true; //Activo el Flag de Filtro Triple
			tripleFilter213 = true; 
				
			if (oEvent.getParameter("value")=="")
			{
				tripleFilter213 = false;
				//Reseteo Modelo de datos de la TABLA 2
				var ProductTableResetModel = new JSONModel();
				
				ProductTableResetModel.setData(oInitialData);
				ProductsTable2.setModel(ProductTableResetModel);
				
				//Obtengo el Binding de la TABLA 2
				var oBindingTable2 = ProductsTable2.getBinding();
				
				var aFiltersTable2 = oBindingTable2.aFilters;
				
				console.log(oBindingTable2);
				
				//console.log(sValueSavedTable1);
				//console.log(sPathSavedTable1);
				
				//console.log(sPathSaved);
				//console.log(sValueSaved);
				
				var sOperator = "Contains"
					
					
					
				//Armo Filtro
				var oFilterTable2 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
				
				if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable2.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable2.push(oFilterTable2);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable2.filter(aFiltersTable2);
				
				
				//Matcheo con el contenido del modelo de datos de la tabla
				
				for (var i=0;i<oBindingTable2.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oInitialData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				/////////////////////////////////////////////////////////////////
				
				// Debo guardar el  estado para el FILTRO CONCATENADO
				
				oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				
				
				  
				// Reseteo la estructura para contener los datos despues de filtrar la TABLA
				
				oDataFilter =[
					{
						prodId:1,
						prodName:"elástico",
						prodDescrip:"aaaaa",
						prodPrice:10,
						prodUOM:"metros",
						prodQuantity:200,
						prodWarranty:0,
						prodObservations:"aaaaaaaaaaa"
						
					}
				];
				
					
				//Obtengo el Binding de la TABLA 1
				var oBindingTable1 = ProductsTable1.getBinding();
				
				console.log(oBindingTable1);
				
				var oData =  oBindingTable1.oList;
				
				console.log(oData);
				
				var aFiltersTable1 = oBindingTable1.aFilters;
				
				
					
				//Armo Filtro
				var oFilterTable1 = new Filter(sPathSaved, sOperator, sValueSaved);
				
				if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable1.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable1.push(oFilterTable1);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable1.filter(aFiltersTable1);
				
				console.log(oBindingTable1.aIndices);
				
				
				
				//Matcheo con el contenido del modelo de datos de la tabla
				
				for (var i=0;i<oBindingTable1.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				console.log(oDataFilter);
				
				//Declaro el Modelo para setear en las TABLAS 2 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable3.setModel(ProductsTableFilteredModel);
				
				
				
			}else
				{
				
				
				
				
				//Obtengo el Binding de la TABLA 2
				var oBindingTable2 = ProductsTable2.getBinding();
				//console.log(oBindingTable2);
				
				// Obtengo el Binding de la TABLA 3
				var oBindingTable3 = ProductsTable3.getBinding();
				console.log(oBindingTable3);
				
				var oData = oBindingTable3.oList; //
				
				
				//console.log(oData);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				// Parámetros instroducidos en la columna filtrado TABLA 1
				
				var aFiltersTable3 = oBindingTable3.aFilters;
				
				var oColumn = oEvent.getParameter("column");
				
				//Parámetros
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				
				//Armo Filtro
				var oFilterTable3 = new Filter(sPath, sOperator, sValue);
				
				
				if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFiltersTable3.splice(0,1);
				}
				
				//Seteo el Filtro Creado
				aFiltersTable3.push(oFilterTable3);
				
				
				
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
				oBindingTable3.filter(aFiltersTable3);
				
				console.log(aFiltersTable3);
				console.log(oBindingTable3.aIndices);
				
				
				//Matcheo con el contenido del modelo de datos de la tabla
				
				for (var i=0;i<oBindingTable3.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 2
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable2.setModel(ProductsTableFilteredModel);
				ProductsTable1.setModel(ProductsTableFilteredModel);
				}
			
			
			
				
		}
		
		
		
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		//Filtro Triple TABLA 1 - TABLA 2 - TABLA 3
		
		if ((firstFiltered1)&&(filterFlag2)&&(!tableTripleFilterChange))
			{
				console.log("F. Triple T1-T2-T3");
				
				tripleFilter = true; //Activo el Flag de Filtro Triple
				tripleFilter123 = true;
				
				if (oEvent.getParameter("value")=="")
				{
					tripleFilter123 = false;
					//Reseteo Modelo de datos de la TABLA 1
					var ProductTableResetModel = new JSONModel();
					
					ProductTableResetModel.setData(oInitialData);
					ProductsTable1.setModel(ProductTableResetModel);
					
					//Obtengo el Binding de la TABLA 1
					var oBindingTable1 = ProductsTable1.getBinding();
					
					var aFiltersTable1 = oBindingTable1.aFilters;
					
					console.log(oBindingTable1);
					
					//console.log(sValueSavedTable1);
					//console.log(sPathSavedTable1);
					
					//console.log(sPathSaved);
					//console.log(sValueSaved);
					
					var sOperator = "Contains"
						

						
					//Armo Filtro
					var oFilterTable1 = new Filter(sPathSavedFirstFiltered, sOperator, sValueSavedFirstFiltered);
					
					if (aFiltersTable1.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable1.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable1.push(oFilterTable1);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable1.filter(aFiltersTable1);
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable1.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oInitialData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					/////////////////////////////////////////////////////////////////
					
					// Debo guardar el  estado para el FILTRO CONCATENADO
					
					oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					
					
					  
					// Reseteo la estructura para contener los datos despues de filtrar la TABLA
					
					oDataFilter =[
						{
							prodId:1,
							prodName:"elástico",
							prodDescrip:"aaaaa",
							prodPrice:10,
							prodUOM:"metros",
							prodQuantity:200,
							prodWarranty:0,
							prodObservations:"aaaaaaaaaaa"
							
						}
					];
					
						
					//Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					
					console.log(oBindingTable2);
					
					var oData =  oBindingTable2.oList;
					
					console.log(oData);
					
					var aFiltersTable2 = oBindingTable2.aFilters;
					
					
						
					//Armo Filtro
					var oFilterTable2 = new Filter(sPathSaved, sOperator, sValueSaved);
					
					if (aFiltersTable2.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable2.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable2.push(oFilterTable2);
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable2.filter(aFiltersTable2);
					
					console.log(oBindingTable2.aIndices);
					
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable2.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 3
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable1.setModel(ProductsTableFilteredModel);
					ProductsTable3.setModel(ProductsTableFilteredModel);
					
					
					
				}else
					{
					
					
					
					
					//Obtengo el Binding de la TABLA 2
					var oBindingTable2 = ProductsTable2.getBinding();
					//console.log(oBindingTable2);
					
					// Obtengo el Binding de la TABLA 3
					var oBindingTable3 = ProductsTable3.getBinding();
					console.log(oBindingTable3);
					
					var oData = oBindingTable3.oList; //
					
					
					//console.log(oData);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					// Parámetros instroducidos en la columna filtrado TABLA 1
					
					var aFiltersTable3 = oBindingTable3.aFilters;
					
					var oColumn = oEvent.getParameter("column");
					
					//Parámetros
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					
					//Armo Filtro
					var oFilterTable3 = new Filter(sPath, sOperator, sValue);
					
					
					if (aFiltersTable3.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
					{	
						aFiltersTable3.splice(0,1);
					}
					
					//Seteo el Filtro Creado
					aFiltersTable3.push(oFilterTable3);
					
					
					
					
					//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
					oBindingTable3.filter(aFiltersTable3);
					
					console.log(aFiltersTable3);
					console.log(oBindingTable3.aIndices);
					
					
					//Matcheo con el contenido del modelo de datos de la tabla
					
					for (var i=0;i<oBindingTable3.aIndices.length;i++){
						
						
						//	console.log(oData[oBinding.aIndices[i]]);
						oDataFilter.push(oData[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
						
						}
					
					oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
					
					
					
					//Declaro el Modelo para setear en las TABLAS 1 Y 2
					
					var  ProductsTableFilteredModel = new JSONModel();
					
					
					//SETEO los Datos Filtrados
					ProductsTableFilteredModel.setData(oDataFilter);
					
					// Seteo de los Modelos de las 2 tablas matcheadas
					
					ProductsTable2.setModel(ProductsTableFilteredModel);
					ProductsTable1.setModel(ProductsTableFilteredModel);
					}
				
				
				
					
			}
		
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		//Cambio a TABLA 1
	
		
		if ((firstFiltered3)&&(filterFlag1)&&(!filterFlag2))
		{
			console.log("Cambio a Tabla 1");
			
			
			oDataFilterTable1_3 =[ 		
			{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}];
			
			//console.log(oDataFilterTable1_3);
			
			
			firstFiltered3 = false; //Seteo los FLags correspondientes para situarme correctamente en el nuevo estado
			firstFiltered1 = true;
			tableFirstFilteredChange = true;
			
			
			//Declaro el Modelo para Resetear las TABLAS 1 y 3
			
			var  ProductsTableResetModel = new JSONModel();
			
			
			//SETEO los Datos Iniciales en el Modelo
			ProductsTableResetModel.setData(oInitialData);
			
			// Reseteo de los Modelos de las 2 tablas 
			
			ProductsTable1.setModel(ProductsTableResetModel);
			ProductsTable3.setModel(ProductsTableResetModel);
			
			
			// Obtengo el Binding de la TABLA 1
			var oBindingTable1 = ProductsTable1.getBinding();
			
			//console.log(oBindingTable2);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Estos parametro tienen que se los de la nueva TABLA
			
			var aFilters = oBindingTable1.aFilters;
			//console.log(aFilters);
			
			//var oColumn = oEvent.getParameter("column");
			var oColumn = sColumn;
			
			//var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sPath =	sPathSaved;
			
			var sOperator = "Contains";
			//var sValue = oEvent.getParameter("value");
			var sValue = sValueSaved;
			
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
			aFilters.splice(0,1);
			}
			
			
			aFilters.push(oFilter);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable1.filter(aFilters);
			console.log(aFilters);
			
			
			for (var i=0;i<oBindingTable1.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oInitialData[oBindingTable1.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilterPreviousState);
			
			//Declaro el Modelo para setear en las TABLAS 2 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable2.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			////////////////////////////////////////////////////////////
			
			// Obtengo el Binding de la TABLA 3
			var oBindingTable3 = ProductsTable3.getBinding();
			
			//console.log(oBindingTable1);
			
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Parámetros instroducidos en la columna filtrado TABLA 1
			
			var aFiltersTable3 = oBindingTable3.aFilters;
			
			//Parámetros
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			
			//Armo Filtro
			var oFilterTable3 = new Filter(sPath, sOperator, sValue);
			
			////////////////////////////////////////
			//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
			
			sValueSaved = sValue;
			sColumn = oColumn;
			sPathSaved = sPath;
			//////////////////////////////////////
			
			//Seteo el Filtro Creado
			aFiltersTable3.push(oFilterTable3);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable3.filter(aFiltersTable3);
			
			console.log(aFiltersTable3);
			console.log(oBindingTable3.aIndices);
			
			
			
			
			
			for (var i=0;i<oBindingTable3.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilterTable1_3.push(oDataFilterPreviousState[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			
			oDataFilterTable1_3.splice(0,1);
			
			console.log(oDataFilterTable1_3);	
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 2
			
			var  ProductsTableFilteredModel2 = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel2.setData(oDataFilterTable1_3);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel2);
			ProductsTable2.setModel(ProductsTableFilteredModel2);
			
			
		}
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
	
	//Cambio a TABLA 2
	if ((firstFiltered3)&&(filterFlag2)&&(!filterFlag1))
		{
			console.log("Cambio a Tabla 2");
			
			
			oDataFilterTable1_3 =[ 		
			{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					prodWarranty:0,
					prodObservations:"aaaaaaaaaaa"
					
				}];
			
			//console.log(oDataFilterTable1_3);
			
			
			firstFiltered3 = false; //Seteo los FLags correspondientes para situarme correctamente en el nuevo estado
			firstFiltered2 = true;
			tableFirstFilteredChange = true;
			
			
			//Declaro el Modelo para Resetear la TABLA 2 
			
			var  ProductsTableResetModel = new JSONModel();
			
			
			//SETEO los Datos Iniciales en el Modelo
			ProductsTableResetModel.setData(oInitialData);
			
			// Reseteo de los Modelos de las 2 tablas 
			
			ProductsTable3.setModel(ProductsTableResetModel);
			ProductsTable2.setModel(ProductsTableResetModel);
			
			
			// Obtengo el Binding de la TABLA 2
			var oBindingTable2 = ProductsTable2.getBinding();
			
			//console.log(oBindingTable2);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Estos parametro tienen que se los de la nueva TABLA
			
			var aFilters = oBindingTable2.aFilters;
			//console.log(aFilters);
			
			//var oColumn = oEvent.getParameter("column");
			var oColumn = sColumn;
			
			//var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sPath =	sPathSaved;
			
			var sOperator = "Contains";
			//var sValue = oEvent.getParameter("value");
			var sValue = sValueSaved;
			
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
			aFilters.splice(0,1);
			}
			
			
			aFilters.push(oFilter);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable2.filter(aFilters);
			console.log(aFilters);
			
			
			for (var i=0;i<oBindingTable2.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oInitialData[oBindingTable2.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilterPreviousState);
			
			//Declaro el Modelo para setear en las TABLAS 1 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable3.setModel(ProductsTableFilteredModel);
			
			//////////////////////////////////////////////////////////
			
			// Obtengo el Binding de la TABLA 3
			var oBindingTable3 = ProductsTable3.getBinding();
			
			//console.log(oBindingTable1);
			
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			// Parámetros instroducidos en la columna filtrado TABLA 1
			
			var aFiltersTable3 = oBindingTable3.aFilters;
			
			//Parámetros
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			
			//Armo Filtro
			var oFilterTable3 = new Filter(sPath, sOperator, sValue);
			
			////////////////////////////////////////
			//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
			
			sValueSaved = sValue;
			sColumn = oColumn;
			sPathSaved = sPath;
			//////////////////////////////////////
			
			//Seteo el Filtro Creado
			aFiltersTable3.push(oFilterTable3);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBindingTable3.filter(aFiltersTable3);
			
			console.log(aFiltersTable3);
			console.log(oBindingTable3.aIndices);
			
			
			
			
			
			for (var i=0;i<oBindingTable3.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilterTable1_3.push(oDataFilterPreviousState[oBindingTable3.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			
			oDataFilterTable1_3.splice(0,1);
			
			console.log(oDataFilterTable1_3);	
			
			//Declaro el Modelo para setear en las TABLAS 2 Y 3
			
			var  ProductsTableFilteredModel2 = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel2.setData(oDataFilterTable1_3);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable2.setModel(ProductsTableFilteredModel2);
			ProductsTable1.setModel(ProductsTableFilteredModel2);
			
			
		}
	
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// Si la TABLA 3 es la primera Filtrada
		if ((firstFiltered3)&&(!tableTripleFilterChange))
		{
			console.log("Ind. TABLA 3");
			
			//Obtengo la vinculación con los datos de la TABLA 1
			
			var oBinding = ProductsTable3.getBinding();
			
			//console.log(oEvent.getParameters().column.mProperties.filterProperty);
			//console.log(oBinding.aIndices);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			
			var aFilters = oBinding.aFilters;
			//console.log(aFilters);
			
			var oColumn = oEvent.getParameter("column");
			
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
			{	
				aFilters.splice(0,1);
			}
			
			//////////////////
			//Guardo los valores del filtrado para posterior combinación con  el Filtro Triple
			
			sValueSavedFirstFiltered = sValue;
			sColumnFirstFiltered = oColumn;
			sPathSavedFirstFiltered = sPath;
			//////////////////
			
			aFilters.push(oFilter);
			
			//Aplico el filtro a los Datos del Modelo actual de la TABLA 1
			oBinding.filter(aFilters);
			
			
			//console.log(oBinding.aIndices);
			
			console.log(aFilters);
			
			for (var i=0;i<oBinding.aIndices.length;i++){
				
				
				//	console.log(oData[oBinding.aIndices[i]]);
				oDataFilter.push(oInitialData[oBinding.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
				
				}
			
			oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
			
			oDataFilterPreviousState = oDataFilter; // Guardo el resultado del filtrado de los datos
			
			console.log(oDataFilterPreviousState);
			
			//Declaro el Modelo para setear en las TABLAS 2 Y 3
			
			var  ProductsTableFilteredModel = new JSONModel();
			
			
			//SETEO los Datos Filtrados
			ProductsTableFilteredModel.setData(oDataFilter);
			
			// Seteo de los Modelos de las 2 tablas matcheadas
			
			ProductsTable1.setModel(ProductsTableFilteredModel);
			ProductsTable2.setModel(ProductsTableFilteredModel);
		
		}//If firstFiltered3
		
		else //Si la TABLA 3 NO ES la PRIMERA en ser filtrada
		{
		
			if ((!tableFirstFilteredChange)&&(!tripleFilter))
				{
				console.log("Concatenado TABLA 3")
				
				//Obtengo la vinculación con los datos de la TABLA 2
				
				var oBinding = ProductsTable3.getBinding();
				
				//console.log(oEvent.getParameters().column.mProperties.filterProperty);
				//console.log(oBinding.aIndices);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFilters = oBinding.aFilters;
				//console.log(aFilters);
				
				var oColumn = oEvent.getParameter("column");
				
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(sPath, sOperator, sValue);
				
				if (aFilters.length==1) //Limpio el Filtro Muy importante que no quede basura de filtrados anteriores.
				{	
					aFilters.splice(0,1);
				}
				
				//Guardo los valores del filtrado para posterior combinación con la columna de otra tabla
				
				sValueSaved = sValue;
				sColumn = oColumn;
				sPathSaved = sPath;
				
				aFilters.push(oFilter);
				
				//Aplico el filtro a los Datos del Modelo actual de la TABLA 2
				oBinding.filter(aFilters);
				
				
				//console.log(oBinding.aIndices);
				console.log(aFilters);
				
				////////////////////////////////////////////////////// 
				// TENGO QUE REALIZAR EL MATCHEO CON EL MODELO ACTUAL DE LA TABLA 2
				
				
				
				for (var i=0;i<oBinding.aIndices.length;i++){
					
					
					//	console.log(oData[oBinding.aIndices[i]]);
					oDataFilter.push(oDataFilterPreviousState[oBinding.aIndices[i]]); // realizo el matcheo para actualizar las otras dos tablas
					
					}
				
				oDataFilter.splice(0,1); // Elimino el  primer elemento que fue agregado para setear la estructura
				
				//////////////////////////////////////////////////////////////////
				console.log(oDataFilter);
				
				
				//Declaro el Modelo para setear en las TABLAS 1 Y 3
				
				var  ProductsTableFilteredModel = new JSONModel();
				
				
				//SETEO los Datos Filtrados
				ProductsTableFilteredModel.setData(oDataFilter);
				
				// Seteo de los Modelos de las 2 tablas matcheadas
				
				ProductsTable1.setModel(ProductsTableFilteredModel);
				ProductsTable2.setModel(ProductsTableFilteredModel);
				
				}// if (tableFirstFilteredChange)
		
		
		
		
		
		}// else
			
	
	
	if (oEvent.getParameter("value")=="")
	{
					
		filterFlag3 = false;  //Indico que se ha limpiado la celda de la columna de filtrado en TABLA 1
		//filtercleanFlag1 = true; // Indico que se ha limpiado la celda de filtrado
		firstFiltered3 = false; // Compruebo si es la primera tabla que se filtro para resetear el flag
		
		tripleFilter = false; //Si la celda del Filtrado es nula tengo que volver al estado Filtro Concatenado
		
	}else
		{
		
		filterFlag3 = true; // Indico que se tiene una condición de filtrado en TABLA 2
		
		}
	
	console.log(filterFlag3);
	console.log(firstFiltered3);
	
	tableFirstFilteredChange = false;
	tableTripleFilterChange = false;
		
}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.test2
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.test2
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.test2
*/
//	onExit: function() {
//
//	}
	});
});