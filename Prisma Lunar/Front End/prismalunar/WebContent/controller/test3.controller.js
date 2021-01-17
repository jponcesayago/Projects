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

//Flags para indicar filtrado por Storage
var filterStorage = false;


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

var updateFilterValue = false;


var filterSaved;

//Variables para concatenación de filtros

var filterSavedTable1;
var filterSavedTable2;
var filterSavedTable3;

var filterSavedTable3_1;
var filterSavedTable3_2;

var filterSavedAuxTable1 = [];
var filterSavedAuxTable2 = [];
var filterSavedAuxTable3 = [];

var sPathSavedTable2;

var firstFilterEntryTable2 = false;
var firstFilterEntryTable3 = false;


////////////////////////

var oSelectNameDataChange = [];

var saveNewCells = [{ index:0, prodName:""}];


/////////////////////////////


//Variables de almacenamiento local

var filterSavedTable1Storage = [];
var filterSavedTable2Storage = [];
var filterSavedTable3Storage = [];

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

	
	
	
	return Controller.extend("prismalunar.controller.test3", {
/**
/**
* Called whe1n a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.test2
* 
* 
*/
		
		
	onInit: function() {
		
		

		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		
		
		var ProductsTableJson = new JSONModel();
		
		// Para agregar correctamente la lista tengo que agregar al json la cantidad de datos disponibles
		
		oInitialData ={
				
				"NameSelectList":[
					{
						"NameId":"elástico",
						"Name":"elástico"
					},
					{
						"NameId":"RJ-45",
						"Name":"RJ-45"
					},
					{
						"NameId":"notebook dell",
						"Name":"notebook dell"
					},
					{
						"NameId":"tv samsung",
						"Name":"tv samsung"
					},
					{
						"NameId":"Zapatillas adidas",
						"Name":"Zapatillas adidas"
					},
					{
						"NameId":"Sommier",
						"Name":"Sommier"
					},{
						"NameId":"Bicicleta Fija",
						"Name":"Bicicleta Fija"
					}

		],
			
			"Products":[
			{
				prodId:1,
				prodName:"elástico",
				prodDescrip:"aaaaa",
				prodPrice:"10",
				prodUOM:"metros",
				prodQuantity:"200",
				prodWarranty:"0",
				prodObservations:"aaaaaaaaaacccc"
				
			},{
				prodId:2,
				prodName:"RJ-45",
				prodDescrip:"jack ethernet",
				prodPrice:"30",
				prodUOM:"cantidad",
				prodQuantity:"300",
				prodWarranty:"0.6",
				prodObservations:"bbbbbbbbbb"
				
			},{
				prodId:3,
				prodName:"notebook dell",
				prodDescrip:"inspiron 5363",
				prodPrice:"7000",
				prodUOM:"cantidad",
				prodQuantity:"5",
				prodWarranty:"1",
				prodObservations:"cccccccccc"
				
			},{
				prodId:4,
				prodName:"tv samsung",
				prodDescrip:"45'",
				prodPrice:"15500",
				prodUOM:"cantidad",
				prodQuantity:"10",
				prodWarranty:"2",
				prodObservations:"dddddddddd"
				
			},
			{
				prodId:5,
				prodName:"Zapatillas adidas",
				prodDescrip:"Ultraboost 19",
				prodPrice:"9899",
				prodUOM:"cantidad",
				prodQuantity:"12",
				prodWarranty:"1",
				prodObservations:"Gris - Corner Deportes"
				
			},
			{
				prodId:6,
				prodName:"Sommier",
				prodDescrip:"Inducol Alanis King",
				prodPrice:"35999",
				prodUOM:"cantidad",
				prodQuantity:"3",
				prodWarranty:"6",
				prodObservations:"200x200cm blanco"
				
			},
			{
				prodId:7,
				prodName:"Bicicleta Fija",
				prodDescrip:"Magnética",
				prodPrice:"20499",
				prodUOM:"cantidad",
				prodQuantity:"20",
				prodWarranty:"10",
				prodObservations:"Visor Y Respaldo - Spinning"
				
			}
			
		]
		
		};
		
		
		//Obtengo la lista de nombres Inicial 
		
		for (var i=0;i<oInitialData.Products.length;i++)
		{
			oSelectNameDataChange[i] = oInitialData.Products[i].prodName;
			
		}
		
		//console.log(oSelectNameDataChange);
		
		///////////////////////////////////////////////////////////
		
		ProductsTableJson.setData(oInitialData);
		//console.log(ProductsTableJson);
		
		ProductsTable1.setModel(ProductsTableJson);
		ProductsTable2.setModel(ProductsTableJson);
		ProductsTable3.setModel(ProductsTableJson);
		
		//console.log(ProductsTable);
		//console.log(oInitialData);
		////////////////////////////////////////////////////////
		
		//Busco los parametros almacenados localmente de los filtros
		
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	  	
	  	
	  	
	  	filterSavedTable1Storage = oStorage.get("filterSavedTable1");
	  	filterSavedTable2Storage = oStorage.get("filterSavedTable2");
	  	filterSavedTable3Storage = oStorage.get("filterSavedTable3");
		
	  	
	  	//INICIALIZO ARRAY DONDE SE ALMACENARAN LOS PARAMETROS DE LOS FILTROS APLICADOS
		
		filterSavedTable1 = [ new Filter("test", "Contains", "")];
		filterSavedTable2 = [ new Filter("test", "Contains", "")];
		filterSavedTable3 = [ new Filter("test", "Contains", "")];
		
		filterSavedAuxTable1 = [ new Filter("test", "Contains", "")];
		filterSavedAuxTable2 = [ new Filter("test", "Contains", "")];
		filterSavedAuxTable3 = [ new Filter("test", "Contains", "")];
	  	
		
		if (!filterSavedTable1Storage) {filterSavedTable1Storage = filterSavedTable1;}
		if (!filterSavedTable2Storage) {filterSavedTable2Storage = filterSavedTable2;}
		if (!filterSavedTable3Storage) {filterSavedTable3Storage = filterSavedTable3;}
		
		//console.log(filterSavedTable1Storage);
		//console.log(filterSavedTable2Storage);
		//console.log(filterSavedTable3Storage);
		
		//console.log(filterSavedTable1);
			
	  	//Si solo se dejaron parametros de la TABLA 1
	  	if ((filterSavedTable1Storage.length>1)&&(filterSavedTable2Storage.length<2)&&(filterSavedTable3Storage.length<2))
	  //	if ((filterSavedTable1Storage!=null)&&(filterSavedTable2Storage==null)&&(filterSavedTable3Storage==null))
			{
	  			
	  			this.handleFilterStorageSimple(filterSavedTable1Storage,1);
	  			
	  			//filterSavedTable1Storage.push(new Filter("test", "Contains", "")); //realizo un push para mantener el formate de las variables de combinacion de filtros de tabla
	  			
	  			filterSavedTable1 = filterSavedTable1Storage;
	  			
	  			//console.log("entro");
	  			//console.log(filterSavedTable1);
	  			
	  			filterFlag1 = true;
	  			
	  		}
	  	
	  	//Si solo se dejaron parametros de la TABLA 2
	  	if ((filterSavedTable1Storage.length<2)&&(filterSavedTable2Storage.length>1)&&(filterSavedTable3Storage.length<2))
	  	//if ((filterSavedTable1Storage==null)&&(filterSavedTable2Storage!=null)&&(filterSavedTable3Storage==null))
	  		{
	  			
	  			this.handleFilterStorageSimple(filterSavedTable2Storage,2);
	  			//filterSavedTable2.push(new Filter("test", "Contains", "")); //realizo un push para mantener el formate de las variables de combinacion de filtros de tabla
	  			filterSavedTable2 = filterSavedTable2Storage;
	  			filterFlag2 = true;
	  			
	  		}
	  	
	  	//Si solo se dejaron parametros de la TABLA 3
	  	if ((filterSavedTable1Storage.length<2)&&(filterSavedTable2Storage.length<2)&&(filterSavedTable3Storage.length>1))
	  	//if ((filterSavedTable1Storage==null)&&(filterSavedTable2Storage==null)&&(filterSavedTable3Storage!=null))
	  		{
	  			
	  			this.handleFilterStorageSimple(filterSavedTable3Storage,3);
	  			//filterSavedTable3.push(new Filter("test", "Contains", "")); //realizo un push para mantener el formate de las variables de combinacion de filtros de tabla
	  			filterSavedTable3 = filterSavedTable3Storage;
	  			filterFlag3 = true;
	  			
	  		}
	  	
	  	
	  	
	  //Si solo se dejaron parametros de la TABLA 1 y TABLA 2
	  	if ((filterSavedTable1Storage.length>1)&&(filterSavedTable2Storage.length>1)&&(filterSavedTable3Storage.length<2))
	  	//if ((filterSavedTable1Storage!=null)&&(filterSavedTable2Storage!=null)&&(filterSavedTable3Storage==null))
	  		{
	  			
	  			this.handleFilterStorageDouble(filterSavedTable1Storage,filterSavedTable2Storage,1);
	  			filterSavedTable1 = filterSavedTable1Storage;
	  			filterSavedTable2 = filterSavedTable2Storage;
	  			filterFlag1 = true;
	  			filterFlag2 = true;
	  		}
	  	
	  	
		
		  //Si se dejaron parametros de lad TABLA 1 y TABLA 2 TABLA 3
		  	if ((filterSavedTable1Storage.length>1)&&(filterSavedTable2Storage.length>1)&&(filterSavedTable3Storage.length>1))
		  //	if ((filterSavedTable1Storage!=null)&&(filterSavedTable2Storage!=null)&&(filterSavedTable3Storage==null))
		  		{
		  			
		  			this.handleFilterStorageTriple(filterSavedTable1Storage,filterSavedTable2Storage,filterSavedTable3Storage);
		  			filterSavedTable1 = filterSavedTable1Storage;
		  			filterSavedTable2 = filterSavedTable2Storage;
		  			filterSavedTable3 = filterSavedTable3Storage;
		  			
		  			filterFlag1 = true;
		  			filterFlag2 = true;
		  			filterFlag3 = true;
		  		}
		  	
		//console.log(filterSavedTable1);
	  	
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Posición del Scroll Vertical
	
	handleGetScrollVertPosition : function(oEvent){
		
		
		var tableId = "#" + oEvent.getSource().getId() + "-vsb";
		var scrollVertPos = $(tableId).scrollTop();
		 
		//console.log(tableId);
		//console.log(scrollVertPos);
		
		 
		 $(".sapUiTableVSb").scrollTop(scrollVertPos);
		 
		/*
		$(".sapUiTableVSb").on('scroll', function () { //Evento de sCroll
		      $(".sapUiTableHSb").scrollLeft($(this).scrollLeft()); //Seteo de posición del otro Scroll
		});*/
		
		
		
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////7
	//Filtro con Storage Triple
	
	handleFilterStorageTriple : function(filterSavedStorage1,filterSavedStorage2,filterSavedStorage3)
	{
		console.log("Filtro Storage Triple");
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		///////////////////////////////7
		//Obtengo las columnas que fueron  filtradas
		var aColumns1 = ProductsTable1.getColumns();
		var aColumns2 = ProductsTable2.getColumns();
		var aColumns3 = ProductsTable3.getColumns();
		
		//console.log(filterSavedStorage1);
		//console.log(filterSavedStorage2);
		//console.log(filterSavedStorage3);
		
		
		////////////////////////////////////////////////////////////////
		//Creo una lista la cual va a contener todos los filtros salvados para luego realizar el filtro combinado
		var listOfFilters = [];
		
		for (var i=1;i<filterSavedStorage1.length;i++)
			{
				listOfFilters.push(filterSavedStorage1[i]);
			
			}
		
		for (var i=1;i<filterSavedStorage2.length;i++)
		{
			listOfFilters.push(filterSavedStorage2[i]);
		
		}
		
		for (var i=1;i<filterSavedStorage3.length;i++)
		{
			listOfFilters.push(filterSavedStorage3[i]);
		
		}
		
		console.log(listOfFilters);
		
		///////////////////////////////////////////////////
		
///////////////////////////////////////////////////////
		//Seteo los parametros de los filtros guardados
		for (var i=0;i<listOfFilters.length;i++)
		{
			
			
			if (listOfFilters[i].sPath=="prodName")
				{	
					aColumns1[1].setFilterValue(listOfFilters[i].oValue1);
					
				}

			if (listOfFilters[i].sPath=="prodDescrip")
				{	
					aColumns1[2].setFilterValue(listOfFilters[i].oValue1);
					
				}
			

			if (listOfFilters[i].sPath=="prodPrice")
				{	
					aColumns1[3].setFilterValue(listOfFilters[i].oValue1);
					
				}
			
			if (listOfFilters[i].sPath=="prodUOM")
			{	
				aColumns2[0].setFilterValue(listOfFilters[i].oValue1);
				
			}
			
			if (listOfFilters[i].sPath=="prodQuantity")
			{	
				aColumns2[1].setFilterValue(listOfFilters[i].oValue1);
				
			}
			
			if (listOfFilters[i].sPath=="prodWarranty")
			{	
				aColumns3[0].setFilterValue(listOfFilters[i].oValue1);
				
			}
			
			if (listOfFilters[i].sPath=="prodObservations")
			{	
				aColumns3[1].setFilterValue(listOfFilters[i].oValue1);
				
			}
			
			
		}
		
		
		//////////////////////////////////////////////////
		//Creo el filtro combinado
		var oCombinedFilter = new sap.ui.model.Filter({
		     
	        filters: listOfFilters ,
	     
	        // set the OR or AND condition between the filters
	        // true for AND, and false for OR
	        // false by default
	        and: true
	     
	      });
		
		
		//Obtengo la vinculación con los datos de la TABLA 1
		
		var oBindingTable1 = ProductsTable1.getBinding();
		
		
		oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
		
		//Obtengo la vinculación con los datos de la TABLA 1
		
		var oBindingTable2 = ProductsTable2.getBinding();
		
		
		oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
		
		//Obtengo la vinculación con los datos de la TABLA 1
		
		var oBindingTable3 = ProductsTable3.getBinding();
		
		
		oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
		
	},
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////7
	//Filtro con Storage Doble
	
	handleFilterStorageDouble : function(filterSavedStorage1,filterSavedStorage2,tableFiltered)
	{
		
		console.log("Filtro Storage Doble");
		
		filterStorage = true;
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		//console.log(filterSavedStorage1);
		//console.log(filterSavedStorage2);
		
		//Analizo que columnas son las filtradas
		switch (tableFiltered){
		
		case 1:
			//Obtengo las columnas de la TABLA 1
			var aColumns1 = ProductsTable1.getColumns();
			var aColumns2 = ProductsTable2.getColumns();

			break;
			
		case 2:
			//Obtengo las columnas de la TABLA 1
			var aColumns1 = ProductsTable1.getColumns();
			var aColumns3 = ProductsTable3.getColumns();
			break;
			
		case 3:
			//Obtengo las columnas de la TABLA 1
			var aColumns2 = ProductsTable2.getColumns();
			var aColumns3 = ProductsTable3.getColumns();
			break;
		
		}
		
		////////////////////////////////////////////////////////////////
		//Creo una lista la cual va a contener todos los filtros salvados para luego realizar el filtro combinado
		var listOfFilters = [];
		
		for (var i=1;i<filterSavedStorage1.length;i++)
			{
				listOfFilters.push(filterSavedStorage1[i]);
			
			}
		
		for (var i=1;i<filterSavedStorage2.length;i++)
		{
			listOfFilters.push(filterSavedStorage2[i]);
		
		}
		
		console.log(listOfFilters);
		
		///////////////////////////////////////////////////////
		//Seteo los parametros de los filtros guardados
		for (var i=0;i<listOfFilters.length;i++)
		{
			
			
			if (listOfFilters[i].sPath=="prodName")
				{	
					aColumns1[1].setFilterValue(listOfFilters[i].oValue1);
					
				}

			if (listOfFilters[i].sPath=="prodDescrip")
				{	
					aColumns1[2].setFilterValue(listOfFilters[i].oValue1);
					
				}
			

			if (listOfFilters[i].sPath=="prodPrice")
				{	
					aColumns1[3].setFilterValue(listOfFilters[i].oValue1);
					
				}
			
			if (listOfFilters[i].sPath=="prodUOM")
			{	
				aColumns2[0].setFilterValue(listOfFilters[i].oValue1);
				
			}
			
			if (listOfFilters[i].sPath=="prodQuantity")
			{	
				aColumns2[1].setFilterValue(listOfFilters[i].oValue1);
				
			}
			
			if (listOfFilters[i].sPath=="prodWarranty")
			{	
				aColumns3[0].setFilterValue(listOfFilters[i].oValue1);
				
			}
			
			if (listOfFilters[i].sPath=="prodObservations")
			{	
				aColumns3[1].setFilterValue(listOfFilters[i].oValue1);
				
			}
			
			
		}
		
		//////////////////////////////////////////////////
		//Creo el filtro combinado
		var oCombinedFilter = new sap.ui.model.Filter({
		     
	        filters: listOfFilters ,
	     
	        // set the OR or AND condition between the filters
	        // true for AND, and false for OR
	        // false by default
	        and: true
	     
	      });
		
		
		//Obtengo la vinculación con los datos de la TABLA 1
		
		var oBindingTable1 = ProductsTable1.getBinding();
		
		
		oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
		
		//Obtengo la vinculación con los datos de la TABLA 1
		
		var oBindingTable2 = ProductsTable2.getBinding();
		
		
		oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
		
		//Obtengo la vinculación con los datos de la TABLA 1
		
		var oBindingTable3 = ProductsTable3.getBinding();
		
		
		oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
		
	},
	
	
	/////////////////////////////////////////////////////////////////////
	//Filtrado con Storage Individual
	
	handleFilterStorageSimple : function(filterSavedStorage,tableFiltered)
	{
		
		
		//console.log(filterSavedStorage);
		
		console.log("Filtro Storage Individual");
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		
		
		switch (tableFiltered){
		
		case 1:
			//Obtengo las columnas de la TABLA 1
			var aColumns = ProductsTable1.getColumns();
			break;
			
		case 2:
			//Obtengo las columnas de la TABLA 2
			var aColumns = ProductsTable2.getColumns();
			break;
			
		case 3:
			//Obtengo las columnas de la TABLA 3
			var aColumns = ProductsTable3.getColumns();
			break;
		
		}
		
		
		//console.log(aColumns);
		
		
		//Obtengo la vinculación con los datos de la TABLA 1
		
		var oBindingTable1 = ProductsTable1.getBinding();
		//console.log(oBindingTable1);
		
		//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
		
		var aFiltersTable1 = oBindingTable1.aFilters;
		//console.log(aFiltersTable1);
		
		//Busco las columnas filtradas y seteo el  valor de la celda de filtrado con el guardado
		
		for (var i=1;i<filterSavedStorage.length;i++)
			{
				aFiltersTable1.push(filterSavedStorage[i]);
				
				if (filterSavedStorage[i].sPath=="prodName")
					{	
						aColumns[1].setFilterValue(filterSavedStorage[i].oValue1);
						
					}

				if (filterSavedStorage[i].sPath=="prodDescrip")
					{	
						aColumns[2].setFilterValue(filterSavedStorage[i].oValue1);
						
					}
				

				if (filterSavedStorage[i].sPath=="prodPrice")
					{	
						aColumns[3].setFilterValue(filterSavedStorage[i].oValue1);
						
					}
				
				if (filterSavedStorage[i].sPath=="prodUOM")
				{	
					aColumns[0].setFilterValue(filterSavedStorage[i].oValue1);
					
				}
				
				if (filterSavedStorage[i].sPath=="prodQuantity")
				{	
					aColumns[1].setFilterValue(filterSavedStorage[i].oValue1);
					
				}
				
				if (filterSavedStorage[i].sPath=="prodWarranty")
				{	
					aColumns[0].setFilterValue(filterSavedStorage[i].oValue1);
					
				}
				
				if (filterSavedStorage[i].sPath=="prodObservations")
				{	
					aColumns[1].setFilterValue(filterSavedStorage[i].oValue1);
					
				}
				
				
			}
		
		
		//console.log(aColumns[1]);
		
		console.log(aFiltersTable1);
		oBindingTable1.filter(aFiltersTable1);
		
		//////////////////////////////////7
		
		//Obtengo la vinculación con los datos de la TABLA 2
		
		var oBindingTable2 = ProductsTable2.getBinding();
		
		oBindingTable2.filter(aFiltersTable1);
		
		//////////////////////////////////7
		
		//Obtengo la vinculación con los datos de la TABLA 2
		
		var oBindingTable3 = ProductsTable3.getBinding();
		
		oBindingTable3.filter(aFiltersTable1);
		
		
		
	}
	,
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Redireccionamiento con template LINK en la tabla
	
	handleLinkPress :function(oEvent){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("test4");
	},
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	handleSearchFieldChange : function(oEvent){
		
		//console.log(oEvent.getSource());
		//console.log(oEvent.getParameters());
		
	},
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Función llamada cuando se dispara el evento suggest del SearchField
	
	handleOnSuggest : function (oEvent)
	{
		//console.log(oEvent.getSource().oParent.oBindingContexts.undefined.sPath);
		//console.log(oEvent.getParameters());
		
		
		
		var sValue = oEvent.getParameter("suggestValue"),
		aFilters = [];
		
		//console.log(sValue);
		
		//Evaluo lo ingresado por el usuario y aplico el filtro a la lista de sugerencias
		if (sValue) {
			aFilters = [
				new Filter([
					new Filter("NameId", function (sText) {
						return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					}),
					new Filter("Name", function (sDes) {
						return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					})
				], false)
			];
		}
		
		//console.log(oEvent.getSource().getBinding("suggestionItems"));
		
		oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
		
		oEvent.getSource().suggest();
	
		
		
		
		
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//Si se presiona el boton GUARDAR
	
	handlesaveNameButton: function(){
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var saveNameButton = this.byId("saveNameButton");
		var selectName = this.byId("selectName");
		
		saveNewCells = [{ index:0, prodName:""}];
		
		var oBindingTable1 = ProductsTable1.getBinding();
		//console.log(oBindingTable1);
		
		var savedNewList = oBindingTable1.oList;
		//console.log(savedNewList);
		
		//Recorre la lista con los parametros actualizado y comparo con la recibida para detectar cambios(posición y contenido)
		for (var i=0;i<savedNewList.length;i++)
		{
			if (oSelectNameDataChange[i]!=savedNewList[i].prodName)
				{
				
					saveNewCells.push({index:i,prodName:savedNewList[i].prodName});
					oSelectNameDataChange[i]=savedNewList[i].prodName;
					
				}
				
		}
		
		
		saveNewCells.splice(0,1);
		
		console.log(saveNewCells);
		//console.log(oSelectNameDataChange);
		
		
		
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	handleInputSuggest: function(oEvent) {
		var sTerm = oEvent.getParameter("suggestValue");
		//console.log(sTerm);
		
		var aFilters = [];
		if (sTerm) {
			aFilters.push(new Filter("Name", sap.ui.model.FilterOperator.Contains, sTerm));
		}
		console.log(aFilters);
		console.log(oEvent.getSource().getBinding("suggestionItems"));
		
		//oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
	},
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	handleSelectProdNameChange : function(oEvent){
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var saveNameButton = this.byId("saveNameButton");
		var selectName = this.byId("selectName");
		
		//console.log(oEvent.getSource());
		//console.log(oEvent.getParameters());
		
		var newSelectedName = oEvent.getSource().mProperties.selectedKey;
		console.log(newSelectedName);
		
		
		//oSelectNameDataChange
		
	},
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	//Evento Filtrado en la TABLA 1
	handleFilter : function(oEvent){
		
		console.log("Filtro TABLA 1");
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		
		////////////////////////////////////////////////////////////////////////////////
		//Actualizo los filtros activos
		
		var filterSavedTable1Found = false;
		
		var sPath = oEvent.getParameters().column.mProperties.filterProperty;
		var sOperator = "Contains";
		var sValue = oEvent.getParameter("value");
		var oFilter = new Filter(sPath, sOperator, sValue);
		
		//console.log(filterSavedTable1);
		
		//Array dinámico
		for (var i=0;i<filterSavedTable1.length;i++)
		{
			
		
			
			if (filterSavedTable1[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
				{
					
					//console.log("encontrado")
					//console.log(filterSavedAuxTable2[i].oValue1);
					
					if (sValue=="") //Si el valor ingresado es nulo borro el filtro
					{
						//console.log("borrado")
						filterSavedTable1.splice(i,1);
						//filterSavedAuxTable2.push(oFilter);
						
					
					}else 
						{
							filterSavedTable1.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
							filterSavedTable1.push(oFilter);
							//filterSavedAuxTable2[i].oValue1 = sValue;
							
						}
				
					filterSavedTable1Found = true;
				}
			
			
		}
	
		if ((!filterSavedTable1Found)&&(sValue)!="") { filterSavedTable1.push(oFilter);}
	
		//console.log(filterSavedTable1);
		
		/////////////////////////////////////////////////////////////////////////////////
		var statusFiltersValues = 0;
		
		//////////////////////////////////////////////////////////////////////////////////////////////
		//Si hay otros filtros activos en las demas TABLAS - TABLA 2
		
		if ((filterFlag2)&&(!filterFlag3))
			{
			//Obtengo la vinculación con los datos de la TABLA 2
			
			console.log("Filtro Concatenado T2-T1");
			
			/*
			var oBindingTable2 = ProductsTable2.getBinding();
			//console.log(oBindingTable2);
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable2 = oBindingTable2.aFilters;
			console.log(ProductsTable2.getBinding().aFilters);
			
			
			//Solo si es la primera vez guardo los datos de lo filtrado en las otras TABLAS
			//if (!firstFilterEntryTable2) { filterSavedTable2 = aFiltersTable2; firstFilterEntryTable2 = true; }
			
			
			
			//console.log(filterSavedTable2);
			
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			var filterFound = false;
			
			for (var i=0;i<filterSavedAuxTable2.length;i++)
				{
					
				
					
					if (filterSavedAuxTable2[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
						{
							
							//console.log("encontrado")
							//console.log(filterSavedAuxTable2[i].oValue1);
							
							if (sValue=="") //Si el valor ingresado es nulo borro el filtro
							{
								//console.log("borrado")
								filterSavedAuxTable2.splice(i,1);
								//filterSavedAuxTable2.push(oFilter);
								
							
							}else 
								{
									filterSavedAuxTable2.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
									filterSavedAuxTable2.push(oFilter);
									//filterSavedAuxTable2[i].oValue1 = sValue;
									
								}
						
							filterFound = true;
						}
					
					
				}
			
			if ((!filterFound)&&(sValue)!="") { filterSavedAuxTable2.push(oFilter);}
			*/
			console.log(filterSavedTable2);
		
				////////////////////////////////////////////////////////////
				//Dependiendo de la cantidad de filtros seteados en la TAblA 3, Armo el filtro Combinado
				if (filterSavedTable2.length==2)
				{
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable2.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				/*
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			
			*/
			
			
			
			
			//console.log(oCombinedFilter);
			
			/////////////////////////////////////////////////////
			
				
			var oBindingTable1 = ProductsTable1.getBinding();
				//console.log(oBindingTable2);
			
			//Aplico el filtro combinado
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			
			
			
			
			///////////////////////////////////////////////////
			
			
////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1, Armo el filtro Combinado
			
			console.log(filterSavedTable1);
			
			if (filterSavedTable1.length==2)
			{
			
			
			
				if (filterSavedTable2.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable1[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable2.length==3)
				{
				//	console.log("filtro 2x1");
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable1[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				/*
				
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	filterSavedAuxTable2[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
		*/
			}
			
			
			
			if (filterSavedTable1.length==3)
				{
				
				
				
				if (filterSavedTable2.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable1[1],
				        	filterSavedTable1[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable2.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable1[1],
				        	filterSavedTable1[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				/*
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	filterSavedAuxTable2[1],
				        	filterSavedAuxTable2[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}*/
			
				}
			
			//////////////////////////////////////////////////////
			
			
			if (filterSavedTable1.length==4)
			{
			
			
			
			if (filterSavedTable2.length==2)
			{
				var oCombinedFilter = new sap.ui.model.Filter({
				     
			        filters: [
			 
			          
			        	filterSavedTable2[1],
			        	filterSavedTable1[1],
			        	filterSavedTable1[2],
			        	filterSavedTable1[3]
			        	
			         
			        ],
			     
			        // set the OR or AND condition between the filters
			        // true for AND, and false for OR
			        // false by default
			        and: true
			     
			      });
				
				
			}
			
			if (filterSavedTable2.length==3)
			{
				var oCombinedFilter = new sap.ui.model.Filter({
				     
			        filters: [
			 
			          // filter for value 1
			        	filterSavedTable2[1],
			        	filterSavedTable2[2],
			        	filterSavedTable1[1],
			        	filterSavedTable1[2],
			        	filterSavedTable1[3]
			         
			        ],
			     
			        // set the OR or AND condition between the filters
			        // true for AND, and false for OR
			        // false by default
			        and: true
			     
			      });
				
				
			}
			
			/*
			if (filterSavedTable3.length==4)
			{
				var oCombinedFilter = new sap.ui.model.Filter({
				     
			        filters: [
			 
			          
			        	filterSavedTable3[1],
			        	filterSavedTable3[2],
			        	filterSavedTable3[3],
			        	filterSavedAuxTable2[1],
			        	filterSavedAuxTable2[2]
			         
			        ],
			     
			        // set the OR or AND condition between the filters
			        // true for AND, and false for OR
			        // false by default
			        and: true
			     
			      });
			}*/
		
			}
			
			
			//////////////////////////////////////////////////////
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable2 = ProductsTable2.getBinding();
			console.log(oBindingTable2);
			
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable3 = ProductsTable3.getBinding();
			console.log(oBindingTable3);
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable3 = oBindingTable3.aFilters;
			console.log(oBindingTable3.aFilters);
			
			//Debo Limpiar los filtros de las TABLAS que no se utilizan sino se concatenan
			
			if (aFiltersTable3.length==1){
				
				aFiltersTable3.splice(0,1);
				
			}
			
			if (aFiltersTable3.length==2){
						
						aFiltersTable3.splice(0,2);
						
					}
	
			if (aFiltersTable3.length==3){
				
				aFiltersTable3.splice(0,3);
				
			}
	
			oBindingTable3.filter(aFiltersTable3);
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			}
		
		
		
		
		
		
		////////////////////////////////////////////////////////////////////////////////////////
		
		//Si hay otros filtros activos en las demas TABLAS - TABLA 3
		
		if ((!filterFlag2)&&(filterFlag3))
			{
			//Obtengo la vinculación con los datos de la TABLA 2
			
			console.log("Filtro Concatenado T1-T3");
		
			
			
			//Solo si es la primera vez guardo los datos de lo filtrado en las otras TABLAS
			//if (!firstFilterEntryTable2) { filterSavedTable2 = aFiltersTable2; firstFilterEntryTable2 = true; }
			
			
			
			//console.log(filterSavedTable2);
			/*
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			var filterFound = false;
			
			for (var i=0;i<filterSavedAuxTable2.length;i++)
				{
					
				
					
					if (filterSavedAuxTable2[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
						{
							
							//console.log("encontrado")
							//console.log(filterSavedAuxTable2[i].oValue1);
							
							if (sValue=="") //Si el valor ingresado es nulo borro el filtro
							{
								//console.log("borrado")
								filterSavedAuxTable2.splice(i,1);
								//filterSavedAuxTable2.push(oFilter);
								
							
							}else 
								{
									filterSavedAuxTable2.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
									filterSavedAuxTable2.push(oFilter);
									//filterSavedAuxTable2[i].oValue1 = sValue;
									
								}
						
							filterFound = true;
						}
					
					
				}
			
			if ((!filterFound)&&(sValue)!="") { filterSavedAuxTable2.push(oFilter);}
			
			//console.log(filterSavedAuxTable2);*/
		
				////////////////////////////////////////////////////////////
				//Dependiendo de la cantidad de filtros seteados en la TAblA 3, Armo el filtro Combinado
				if (filterSavedTable3.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable3.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				/*
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			
			*/
			
			
			
			
			//console.log(oCombinedFilter);
			
			/////////////////////////////////////////////////////
				
				var oBindingTable1 = ProductsTable1.getBinding();
				//console.log(oBindingTable2);
				
			
			//Aplico el filtro combinado
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			
			
			
			
			///////////////////////////////////////////////////
			
			
////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1, Armo el filtro Combinado
			
			
			if (filterSavedTable1.length==2)
			{
			
			
			
				if (filterSavedTable3.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable1[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable3.length==3)
				{
				//	console.log("filtro 2x1");
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable1[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				/*
				
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	filterSavedAuxTable2[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
		*/
			}
			
			
			
			if (filterSavedTable1.length==3)
				{
				
				
				
				if (filterSavedTable3.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable1[1],
				        	filterSavedTable1[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable3.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable1[1],
				        	filterSavedTable1[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				/*
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	filterSavedAuxTable2[1],
				        	filterSavedAuxTable2[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}*/
			
				}
			
			//////////////////////////////////////////////////////
			
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 2
			
//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable3 = ProductsTable3.getBinding();
			//console.log(oBindingTable3);
			
			
			var oBindingTable2 = ProductsTable2.getBinding();
			//console.log(oBindingTable2);
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable2 = oBindingTable2.aFilters;
			console.log(aFiltersTable2);
			
			
			
			
			//Debo Limpiar los filtros de las TABLAS que no se utilizan sino se concatenan
			
			if (aFiltersTable2.length==1){
				
				aFiltersTable2.splice(0,1);
				
			}
			
			if (aFiltersTable2.length==2){
						
						aFiltersTable2.splice(0,2);
						
					}
	
			if (aFiltersTable2.length==3){
				
				aFiltersTable2.splice(0,3);
				
			}
	
			oBindingTable2.filter(aFiltersTable2);
			
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			}
		
		
		
		
		

		////////////////////////////////////////////////////////////////////////////////////
		// Filtro activos en TABLA 2 y TABLA 3
		
		if  ((filterFlag2)&&(filterFlag3))
		{
			console.log("Tabla Triple");
			
			console.log(filterSavedTable2);
			console.log(filterSavedTable3);
			
			////////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1 y TABLA2, Armo el filtro Combinado
			
			////////////////////////////////////////
			if (filterSavedTable2.length==2)
			{
				
				
				if (filterSavedTable3.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable3[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable3.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
	
				
			}
			//////////////////////////////////
			
			if (filterSavedTable2.length==3)
			{
				if (filterSavedTable3.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable3[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable3.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				
			}
			
			//////////////////////////////////////////
			/*
			if (filterSavedTable2.length==4)
			{
				if (filterSavedTable3.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable2[3],
				        	filterSavedTable3[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable3.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable2[3],
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			}
		*/
		
		
		
		
		
			console.log(oCombinedFilter);
			
			////////////////////////////////////////////////////////////
			
			
			var oBindingTable1 = ProductsTable1.getBinding();
			//console.log(oBindingTable1);
			
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la  TABLA 3, Armo el filtro Combinado
			
			if (filterSavedTable1.length==2)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 -1
			////////////////////////////////////////////////////////
			
			if (filterSavedTable1.length==3)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 - 2
			
			/////////////////////////////////////////////////////////
			
			
			if (filterSavedTable1.length==4)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 - 3
			
			
		
			
			//////////////////////////////////////////////////////
			
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 1
			
			var oBindingTable3 = ProductsTable3.getBinding();
			//console.log(oBindingTable1);
			
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable2 = ProductsTable2.getBinding();
			//console.log(oBindingTable3);
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
		}
		
		
		
		
		
		
		
		////////////////////////////////////////////////////////////////////////////////
		//Solo se filtra TABLA 1
		
		if ((!filterFlag2)&&(!filterFlag3))
		{
			
			if (!filterStorage)
				{
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBindingTable1 = ProductsTable1.getBinding();
				//console.log(oBindingTable1);
				
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable1 = oBindingTable1.aFilters;
				console.log(aFiltersTable1);
				
				
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(sPath, sOperator, sValue);
			
				//Guardo el filtro para utiizar en combinacion de tablas
				
				filterSaved = oFilter;
			
				//Compruebo si hay qie actualizar algun parametro del filtro, si ese es el  caso, borro el antiguo parametro e inserto el nuevo
				for (var i=0;i<aFiltersTable1.length;i++)
				{
					if (aFiltersTable1[i].sPath==sPath) 
					{
						
						aFiltersTable1.splice(i,1);
					}
					
				}
				
				//Agrego el filtro creado y despues aplico el filtrado a la tabla
				aFiltersTable1.push(oFilter);
				
				console.log(aFiltersTable1);
				
				oBindingTable1.filter(aFiltersTable1);
				
				////////////////////////////////////////////////////
				
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBindingTable2 = ProductsTable2.getBinding();
				//console.log(oBindingTable2);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable2 = oBindingTable2.aFilters;
				//console.log(aFiltersTable2);
				
				//////////////////////////////////////////
				//Si el filtro vinculado no es igual al construido para filtrar la TABLA 1 copio el modelo de la misma
				if (aFiltersTable2.length!=aFiltersTable1.length)
					{
					aFiltersTable2=aFiltersTable1;
					
					}
				
				//////////////////////////////////////
				//Compruebo si hay que actualizar algun parametro del filtro, si ese es el  caso borro el antiguo parametro e inserto el nuevo
				for (var i=0;i<aFiltersTable2.length;i++)
				{
					if (aFiltersTable2[i].sPath==sPath) 
					{
						
						aFiltersTable2.splice(i,1);
					}
					
				}
				
			
				//Agrego el filtro creado y despues aplico el filtrado a la tabla
				aFiltersTable2.push(oFilter);
				
				
				oBindingTable2.filter(aFiltersTable2);
				
				console.log(aFiltersTable2);
				///////////////////////////////////////////////////
				
				
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBindingTable3 = ProductsTable3.getBinding();
				//console.log(oBindingTable3);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable3 = oBindingTable3.aFilters;
				//console.log(aFiltersTable3);
				
				///////////////////////////////////////////77
				//Importante para configuración correcta
				//Si el filtro vinculado no es igual al construido para filtrar la TABLA 1 copio el modelo de la misma
				if (aFiltersTable3.length!=aFiltersTable1.length)
					{
					aFiltersTable3=aFiltersTable1;
					
					}
				///////////////////////////////////
				
				
				
				for (var i=0;i<aFiltersTable3.length;i++)
				{
					if (aFiltersTable3[i].sPath==sPath) 
					{
						
						aFiltersTable3.splice(i,1);
					}
					
				}
				
				
			
				//Agrego el filtro creado y despues aplico el filtrado a la tabla
				aFiltersTable3.push(oFilter);
				
				oBindingTable3.filter(aFiltersTable3);
				
				} //if filterStorage
			else
				{
				
					console.log("Filtro Individual Despues del Storage");
					
					
					//Obtengo la vinculación con los datos de la TABLA 1
					
					var oBindingTable1 = ProductsTable1.getBinding();
					console.log(oBindingTable1);
					
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					
					var aFiltersTable1 = oBindingTable1.aFilters;
					//console.log(aFiltersTable1);
					
					
					var sPath = oEvent.getParameters().column.mProperties.filterProperty;
					
					var sOperator = "Contains";
					var sValue = oEvent.getParameter("value");
					var oFilter = new Filter(sPath, sOperator, sValue);
				
					//Compruebo si hay qie actualizar algun parametro del filtro, si ese es el  caso, borro el antiguo parametro e inserto el nuevo
					for (var i=0;i<aFiltersTable1.length;i++)
					{
						if (aFiltersTable1[i].sPath==sPath) 
						{
							
							aFiltersTable1.splice(i,1);
						}
						
					}
					
					//Agrego el filtro creado y despues aplico el filtrado a la tabla
					aFiltersTable1.push(oFilter);
					
					console.log(aFiltersTable1);
					
					oBindingTable1.filter(aFiltersTable1);
					///////////////////////////////////////////
					
					//Obtengo la vinculación con los datos de la TABLA 1
					
					var oBindingTable2 = ProductsTable2.getBinding();
					//console.log(oBindingTable2);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					
					var aFiltersTable2 = oBindingTable2.aFilters;
					
					
					
					for (var i=1;i<filterSavedTable1.length;i++)
					{
						
						aFiltersTable2.push(filterSavedTable1[i]);
						
						
					}
					
					console.log(aFiltersTable2);
					
					oBindingTable2.filter(aFiltersTable2);
					
					//////////////////////////////////////////////
					
					//Obtengo la vinculación con los datos de la TABLA 1
					
					var oBindingTable3 = ProductsTable3.getBinding();
					//console.log(oBindingTable2);
					
					//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
					
					var aFiltersTable3 = oBindingTable3.aFilters;
					
					
					
					for (var i=1;i<filterSavedTable1.length;i++)
					{
						
						aFiltersTable3.push(filterSavedTable1[i]);
						
						
					}
					
					console.log(aFiltersTable3);
					
					oBindingTable3.filter(aFiltersTable3);
					
					///////////////////////////////////
					filterStorage = false;
				}
			
		}
		
		//console.log()
		console.log(filterSavedTable1);
		/////////////////////////////////////////
		
		//Guardo el estado de los Filtros de la TABLA 1 utilizando un Almacenamiento LOCAL!
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	  	 
	  	

	  	oStorage.put("filterSavedTable1",filterSavedTable1); //Actualizo la lista con el dato eliminado
	  	
	  	
	  	//////////////////////////////////////////////////////////
	  	//Seteo de Flag para indicar si la tabla tiene filtros activos
		if (filterSavedTable1.length>1) {filterFlag1 = true;}
		if (filterSavedTable1.length==1) {filterFlag1 = false;}
		
		console.log(filterFlag1);
		
		
	},
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	handleFilter2 : function(oEvent){
		
		console.log("Filtro TABLA 2");
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		
		//////////////////////////////////////////////////////////////////////////////////////
		
		//Actualizo los filtros activos
		
		var filterSavedTable2Found = false;
		
		var sPath = oEvent.getParameters().column.mProperties.filterProperty;
		var sOperator = "Contains";
		var sValue = oEvent.getParameter("value");
		var oFilter = new Filter(sPath, sOperator, sValue);
		
		//Array dinámico
		for (var i=0;i<filterSavedTable2.length;i++)
		{
			
		
			
			if (filterSavedTable2[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
				{
					
					//console.log("encontrado")
					//console.log(filterSavedAuxTable2[i].oValue1);
					
					if (sValue=="") //Si el valor ingresado es nulo borro el filtro
					{
						//console.log("borrado")
						filterSavedTable2.splice(i,1);
						//filterSavedAuxTable2.push(oFilter);
						
					
					}else 
						{
							filterSavedTable2.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
							filterSavedTable2.push(oFilter);
							//filterSavedAuxTable2[i].oValue1 = sValue;
							
						}
				
					filterSavedTable2Found = true;
				}
			
			
		}
	
		if ((!filterSavedTable2Found)&&(sValue)!="") { filterSavedTable2.push(oFilter);}
	
		
		
		
		//////////////////////////////////////////////////////////////////////////////////////
		
		var statusFiltersValues = 0; //Contador para chequear si los filtros estan limpios
		
		
		
		//////////////////////////////////////////////////////////////////////////////////////////////
		// Filtro activos en TABLA 1 y TABLA 2
		
		if  ((filterFlag1)&&(filterFlag3))
		{
			console.log("Tabla Triple");
			
			console.log(filterSavedTable1);
			console.log(filterSavedTable3);
			
			////////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1 y TABLA2, Armo el filtro Combinado
			
			////////////////////////////////////////
			if (filterSavedTable1.length==2)
			{
				
				
				if (filterSavedTable3.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable3[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable3.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
	
				
			}
			//////////////////////////////////
			
			if (filterSavedTable1.length==3)
			{
				if (filterSavedTable3.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable3[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable3.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				
			}
			
			//////////////////////////////////////////
			if (filterSavedTable1.length==4)
			{
				if (filterSavedTable3.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	filterSavedTable3[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable3.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			}
		
		
		
		
		
		
			console.log(oCombinedFilter);
			
			////////////////////////////////////////////////////////////
			
			
			var oBindingTable2 = ProductsTable2.getBinding();
			//console.log(oBindingTable1);
			
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la  TABLA 3, Armo el filtro Combinado
			
			if (filterSavedTable1.length==2)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 -1
			////////////////////////////////////////////////////////
			
			if (filterSavedTable1.length==3)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 - 2
			
			/////////////////////////////////////////////////////////
			
			
			if (filterSavedTable1.length==4)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 - 3
			
			
		
			
			//////////////////////////////////////////////////////
			
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 1
			
			var oBindingTable1 = ProductsTable1.getBinding();
			//console.log(oBindingTable1);
			
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable3 = ProductsTable3.getBinding();
			//console.log(oBindingTable3);
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
		}
		
		
		
		
		//////////////////////////////////////////////////////////////////////////////
		
		//Si hay otros filtros activos en las demas TABLAs - TABLA 3
		
		if ((!filterFlag1)&&(filterFlag3))
			{
			console.log("Filtro Concatenado T2-T3")
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable2 = ProductsTable2.getBinding();
			//console.log(oBindingTable2);
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable2 = oBindingTable2.aFilters;
			console.log(ProductsTable2.getBinding().aFilters);
			
			
			//Solo si es la primera vez guardo los datos de lo filtrado en las otras TABLAS
			//if (!firstFilterEntryTable2) { filterSavedTable2 = aFiltersTable2; firstFilterEntryTable2 = true; }
			
			
			
			//console.log(filterSavedTable2);
			/*
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			var filterFound = false;
			
			for (var i=0;i<filterSavedAuxTable2.length;i++)
				{
					
				
					
					if (filterSavedAuxTable2[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
						{
							
							//console.log("encontrado")
							//console.log(filterSavedAuxTable2[i].oValue1);
							
							if (sValue=="") //Si el valor ingresado es nulo borro el filtro
							{
								//console.log("borrado")
								filterSavedAuxTable2.splice(i,1);
								//filterSavedAuxTable2.push(oFilter);
								
							
							}else 
								{
									filterSavedAuxTable2.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
									filterSavedAuxTable2.push(oFilter);
									//filterSavedAuxTable2[i].oValue1 = sValue;
									
								}
						
							filterFound = true;
						}
					
					
				}
			
			if ((!filterFound)&&(sValue)!="") { filterSavedAuxTable2.push(oFilter);} */
			
			//console.log(filterSavedAuxTable2);
		
				////////////////////////////////////////////////////////////
				//Dependiendo de la cantidad de filtros seteados en la TAblA 3, Armo el filtro Combinado
				if (filterSavedTable3.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable3.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				/*
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			
			*/
			
			
			
			
			//console.log(oCombinedFilter);
			
			/////////////////////////////////////////////////////
			
			//Aplico el filtro combinado
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			
			
			
			
			///////////////////////////////////////////////////
			
			
////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1, Armo el filtro Combinado
			
			
			if (filterSavedTable2.length==2)
			{
			
			
			
				if (filterSavedTable3.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable2[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable3.length==3)
				{
				//	console.log("filtro 2x1");
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable2[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				/*
				
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	filterSavedAuxTable2[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
		*/
			}
			
			
			
			if (filterSavedTable2.length==3)
				{
				
				
				
				if (filterSavedTable3.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable2[1],
				        	filterSavedTable2[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable3.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable2[1],
				        	filterSavedTable2[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				/*
				if (filterSavedTable3.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable3[1],
				        	filterSavedTable3[2],
				        	filterSavedTable3[3],
				        	filterSavedAuxTable2[1],
				        	filterSavedAuxTable2[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}*/
			
				}
			
			//////////////////////////////////////////////////////
			
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 1
			
			var oBindingTable1 = ProductsTable1.getBinding();
			//console.log(oBindingTable1);
			
			//Obtengo la vinculación con los datos de la TABLA 3
			
			var oBindingTable3 = ProductsTable3.getBinding();
			//console.log(oBindingTable3);
			
			
			/////////////////////////////////////////////////
			
		
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable1 = oBindingTable1.aFilters;
			console.log(aFiltersTable1);
			
			
			
			
			//Debo Limpiar los filtros de las TABLAS que no se utilizan sino se concatenan
			
			if (aFiltersTable1.length==1){
				
				aFiltersTable1.splice(0,1);
				
			}
			
			if (aFiltersTable1.length==2){
						
						aFiltersTable1.splice(0,2);
						
					}
	
			if (aFiltersTable1.length==3){
				
				aFiltersTable1.splice(0,3);
				
			}
	
			oBindingTable1.filter(aFiltersTable1);
			
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			///////////////////////////////////////// 
			
			
			console.log(filterSavedAuxTable2);
			
			
	
			
			
			}
		
		
		
		//////////////////////////////////////////////////////////////////////////
		//Si hay otros filtros activos en las demas TABLAs - TABLA 1
		
		if ((filterFlag1)&&(!filterFlag3))
			{
			
			console.log("Filtro Concatenado T1-T2");
			
			
			/*
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable2 = oBindingTable2.aFilters;
			console.log(ProductsTable2.getBinding().aFilters);
			*/
			
			//Solo si es la primera vez guardo los datos de lo filtrado en las otras TABLAS
			//if (!firstFilterEntryTable2) { filterSavedTable2 = aFiltersTable2; firstFilterEntryTable2 = true; }
			
			
			
			//console.log(filterSavedTable2);
			
			/*
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			var filterFound = false;
			
			for (var i=0;i<filterSavedTable2.length;i++)
				{
					
				
					
					if (filterSavedTable2[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
						{
							
							//console.log("encontrado")
							//console.log(filterSavedAuxTable2[i].oValue1);
							
							if (sValue=="") //Si el valor ingresado es nulo borro el filtro
							{
								//console.log("borrado")
								filterSavedTable2.splice(i,1);
								//filterSavedAuxTable2.push(oFilter);
								
							
							}else 
								{
								filterSavedTable2.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
								filterSavedTable2.push(oFilter);
									//filterSavedAuxTable2[i].oValue1 = sValue;
									
								}
						
							filterFound = true;
						}
					
					
				}
			
			if ((!filterFound)&&(sValue)!="") { filterSavedTable2.push(oFilter);} */
			
			//console.log(filterSavedAuxTable2);
		
				////////////////////////////////////////////////////////////
				//Dependiendo de la cantidad de filtros seteados en la TAblA 1, Armo el filtro Combinado
				if (filterSavedTable1.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable1.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				
				if (filterSavedTable1.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable2[3],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			
			
			
			
			
			
			//console.log(oCombinedFilter);
			
			/////////////////////////////////////////////////////
			
				//Obtengo la vinculación con los datos de la TABLA 2
				
			var oBindingTable2 = ProductsTable2.getBinding();
				//console.log(oBindingTable2);
				
			//Aplico el filtro combinado
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			
			
			
			
			///////////////////////////////////////////////////
			
			
////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1, Armo el filtro Combinado
			
			
			if (filterSavedTable2.length==2)
			{
			
			
			
				if (filterSavedTable1.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable2[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable1.length==3)
				{
				//	console.log("filtro 2x1");
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable2[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				
				if (filterSavedTable1.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	filterSavedTable2[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
		
			}
			
			
			
			if (filterSavedTable2.length==3)
				{
				
				
				
				if (filterSavedTable1.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable2[1],
				        	filterSavedTable2[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable1.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable2[1],
				        	filterSavedTable2[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				
				if (filterSavedTable1.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	filterSavedTable2[1],
				        	filterSavedTable2[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			
				}
			
			//////////////////////////////////////////////////////
			
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable1 = ProductsTable1.getBinding();
			//console.log(oBindingTable1);
			
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable3 = ProductsTable3.getBinding();
			//console.log(oBindingTable3);
			
			
			
			//////////////////////////////////////////////////////
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable3 = oBindingTable3.aFilters;
			console.log(aFiltersTable3);
			
			
			
			
			//Debo Limpiar los filtros de las TABLAS que no se utilizan sino se concatenan
			
			if (aFiltersTable3.length==1){
				
				aFiltersTable3.splice(0,1);
				
			}
			
			if (aFiltersTable3.length==2){
						
						aFiltersTable3.splice(0,2);
						
					}
	
			if (aFiltersTable3.length==3){
				
				aFiltersTable3.splice(0,3);
				
			}
	
			oBindingTable3.filter(aFiltersTable3);
			
			
			////////////////////////////////////////////////////
			
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			///////////////////////////////////////// 
			//Activación de Flags
			
			console.log(filterSavedTable2);
			
			
	
			
			
			}
		
		
		////////////////////////////////////////////////////////////////////////////////
		//Solo se filtra TABLA 2
		
		if ((!filterFlag1)&&(!filterFlag3))
		
		{	
			
			if (!filterStorage)
			{
				
				console.log("Tabla Individual");
				//Obtengo la vinculación con los datos de la TABLA 2
				
				var oBindingTable2 = ProductsTable2.getBinding();
				//console.log(oBindingTable2);
				
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable2 = oBindingTable2.aFilters;
				//console.log(aFiltersTable2);
				
				
				oBindingTable2.filter(aFiltersTable2);
				
				
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(sPath, sOperator, sValue);
				
				
				//console.log(oFilter);
			

			
				
				
				//Compruebo si hay que actualizar algun parametro del filtro, si ese es el  caso borro el antiguo parametro e inserto el nuevo
				for (var i=0;i<aFiltersTable2.length;i++)
				{
					if (aFiltersTable2[i].sPath==sPath) 
					{
						
						aFiltersTable2.splice(i,1);
					}
					
				}
				
				//Agrego el filtro creado y despues aplico el filtrado a la tabla
				aFiltersTable2.push(oFilter);
				
				oBindingTable2.filter(aFiltersTable2);

				
				////////////////////////////////////////////////////
				
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBindingTable1 = ProductsTable1.getBinding();
				//console.log(oBindingTable1);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable1 = oBindingTable1.aFilters;
				console.log(aFiltersTable1);
				
				////////////////////////////////////
				//Importante para configuración correcta
				//Si el filtro vinculado no es igual al construido para filtrar la TABLA 1 copio el modelo de la misma
				if (aFiltersTable1.length!=aFiltersTable2.length)
					{
					aFiltersTable1=aFiltersTable2;
					
					}
				///////////////////////////////////
				
				//Compruebo si hay qie actualizar algun parametro del filtro, si ese es el  caso borro el antiguo parametro e inserto el nuevo
				for (var i=0;i<aFiltersTable1.length;i++)
				{
					if (aFiltersTable1[i].sPath==sPath) 
					{
						
						aFiltersTable1.splice(i,1);
					}
					
				}
				
			
				//Agrego el filtro creado y despues aplico el filtrado a la tabla
				aFiltersTable1.push(oFilter);
				
				oBindingTable1.filter(aFiltersTable1);
				
				
				///////////////////////////////////////////////////
				
				
				//Obtengo la vinculación con los datos de la TABLA 3
				
				var oBindingTable3 = ProductsTable3.getBinding();
				//console.log(oBindingTable3);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable3 = oBindingTable3.aFilters;
				console.log(aFiltersTable3);
				
				
				//Importante para configuración correcta
				//Si el filtro vinculado no es igual al construido para filtrar la TABLA 1 copio el modelo de la misma
				if (aFiltersTable3.length!=aFiltersTable2.length)
					{
					aFiltersTable3=aFiltersTable2;
					
					}
				///////////////////////////////////
				
				
				for (var i=0;i<aFiltersTable3.length;i++)
				{
					if (aFiltersTable3[i].sPath==sPath) 
					{
						
						aFiltersTable3.splice(i,1);
					}
					
				}
				
				
			
				//Agrego el filtro creado y despues aplico el filtrado a la tabla
				aFiltersTable3.push(oFilter);
				
				oBindingTable3.filter(aFiltersTable3);
			}
		
			else 
			{
				console.log("Filtro Individual despues del Storage");
				
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBindingTable2 = ProductsTable2.getBinding();
				console.log(oBindingTable2);
				
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable2 = oBindingTable2.aFilters;
				//console.log(aFiltersTable1);
				
				
				var sPath = oEvent.getParameters().column.mProperties.filterProperty;
				
				var sOperator = "Contains";
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(sPath, sOperator, sValue);
			
				//Compruebo si hay qie actualizar algun parametro del filtro, si ese es el  caso, borro el antiguo parametro e inserto el nuevo
				for (var i=0;i<aFiltersTable2.length;i++)
				{
					if (aFiltersTable2[i].sPath==sPath) 
					{
						
						aFiltersTable2.splice(i,1);
					}
					
				}
				
				//Agrego el filtro creado y despues aplico el filtrado a la tabla
				aFiltersTable2.push(oFilter);
				
				console.log(aFiltersTable2);
				
				oBindingTable2.filter(aFiltersTable2);
				///////////////////////////////////////////
				
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBindingTable1 = ProductsTable1.getBinding();
				//console.log(oBindingTable2);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable1 = oBindingTable1.aFilters;
				
				
				
				for (var i=1;i<filterSavedTable2.length;i++)
				{
					
					aFiltersTable1.push(filterSavedTable2[i]);
					
					
				}
				
				console.log(aFiltersTable1);
				
				oBindingTable1.filter(aFiltersTable1);
				
				//////////////////////////////////////////////
				
				//Obtengo la vinculación con los datos de la TABLA 1
				
				var oBindingTable3 = ProductsTable3.getBinding();
				//console.log(oBindingTable2);
				
				//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
				
				var aFiltersTable3 = oBindingTable3.aFilters;
				
				
				
				for (var i=1;i<filterSavedTable2.length;i++)
				{
					
					aFiltersTable3.push(filterSavedTable2[i]);
					
					
				}
				
				console.log(aFiltersTable3);
				
				oBindingTable3.filter(aFiltersTable3);
				
				///////////////////////////////////
				
				
				
				///////////////////////////////////
				filterStorage = false;
				
				
			}
			
			
			
			///////////////////////////////////////// 
			
			
			//console.log(aFiltersTable2);
			
			
			
			
		}
		
	
		
		console.log(filterSavedTable2);
		//////////////////////////////7
		
		//Guardo el estado de los Filtros de la TABLA 1 utilizando un Almacenamiento LOCAL!
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	  	
	
	  	oStorage.put("filterSavedTable2",filterSavedTable2); //Actualizo la lista con el dato eliminado
	  	
	  	///////////////////////////////////////////
	  	//Seteo de Flags para indicar si hay filtros activos
		
		if (filterSavedTable2.length>1) {filterFlag2 = true;}
		if (filterSavedTable2.length==1) {filterFlag2 = false;}
		
		console.log(filterFlag2);	
	},
	
//////////////////////////////////////////////////////////////////
	
	
handleFilter3 : function(oEvent){
		
		console.log("Filtro TABLA 3");
		
		
		var ProductsTable1 = this.getView().byId("ProductsTable");
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable3 = this.getView().byId("ProductsTable3");
		///////////////////////////////////////////////////////////////////////
		
		//Actualizo los filtros activos
		
		var filterSavedTable3Found = false;
		
		var sPath = oEvent.getParameters().column.mProperties.filterProperty;
		var sOperator = "Contains";
		var sValue = oEvent.getParameter("value");
		var oFilter = new Filter(sPath, sOperator, sValue);
		
		//Array dinámico
		for (var i=0;i<filterSavedTable3.length;i++)
		{
			
		
			
			if (filterSavedTable3[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
				{
					
					//console.log("encontrado")
					//console.log(filterSavedAuxTable2[i].oValue1);
					
					if (sValue=="") //Si el valor ingresado es nulo borro el filtro
					{
						//console.log("borrado")
						filterSavedTable3.splice(i,1);
						//filterSavedAuxTable2.push(oFilter);
						
					
					}else 
						{
						filterSavedTable3.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
						filterSavedTable3.push(oFilter);
							//filterSavedAuxTable2[i].oValue1 = sValue;
							
						}
				
					filterSavedTable3Found = true;
				}
			
			
		}
	
		if ((!filterSavedTable3Found)&&(sValue)!="") { filterSavedTable3.push(oFilter);}
		
		
		
		/////////////////////////////////////////////////////////////////////////
		
		// Filtro activos en TABLA 1 y TABLA 2
		
		if  ((filterFlag1)&&(filterFlag2))
		{
			console.log("Tabla Triple");
			
			console.log(filterSavedTable1);
			console.log(filterSavedTable2);
			
			////////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1 y TABLA2, Armo el filtro Combinado
			
			////////////////////////////////////////
			if (filterSavedTable1.length==2)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable2[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable2.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
	
				
			}
			//////////////////////////////////
			
			if (filterSavedTable1.length==3)
			{
				if (filterSavedTable2.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable2[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable2.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				
			}
			
			//////////////////////////////////////////
			if (filterSavedTable1.length==4)
			{
				if (filterSavedTable2.length==2){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	filterSavedTable2[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
				
				if (filterSavedTable2.length==3){
					
					
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			}
		
		
		
		
		
		
			console.log(oCombinedFilter);
			
			////////////////////////////////////////////////////////////
			
			var oBindingTable3 = ProductsTable3.getBinding();
			//console.log(oBindingTable3);
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
		
			
			////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la  TABLA 3, Armo el filtro Combinado
			
			if (filterSavedTable1.length==2)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 -1
			////////////////////////////////////////////////////////
			
			if (filterSavedTable1.length==3)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 - 2
			
			/////////////////////////////////////////////////////////
			
			
			if (filterSavedTable1.length==4)
			{
				
				
				if (filterSavedTable2.length==2){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					
				} //If filterSavedTable2-1
				
				///////////////////////////////////
				
				if (filterSavedTable2.length==3){
					
					
					if (filterSavedTable3.length==2){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
					
					if (filterSavedTable3.length==3){
						
						var oCombinedFilter = new sap.ui.model.Filter({
						     
					        filters: [
					 
					          
					        	filterSavedTable1[1],
					        	filterSavedTable1[2],
					        	filterSavedTable1[3],
					        	filterSavedTable2[1],
					        	filterSavedTable2[2],
					        	filterSavedTable3[1],
					        	filterSavedTable3[2]
					         
					        ],
					     
					        // set the OR or AND condition between the filters
					        // true for AND, and false for OR
					        // false by default
					        and: true
					     
					      });
						
						
					}
				} // If filterSavedTable2 -2
	
				
			}//If filterSavedTable1 - 3
			
			
		
			
			//////////////////////////////////////////////////////
			
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 1
			
			var oBindingTable1 = ProductsTable1.getBinding();
			//console.log(oBindingTable1);
			
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable2 = ProductsTable2.getBinding();
			//console.log(oBindingTable3);
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
		}
		
		
		
//////////////////////////////////////////////////////////////////////////
		//Si hay otros filtros activos en las demas TABLAS
		//Filtros Activos TABLA 1
		
		if ((filterFlag1)&&(!filterFlag2))
			{
			console.log("Filtro Concactenado T1-T3");
			//Obtengo la vinculación con los datos de la TABLA 3
			
			var oBindingTable3 = ProductsTable3.getBinding();
			console.log(oBindingTable3);
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable3 = oBindingTable3.aFilters;
			console.log(oBindingTable3.aFilters);
			
			
			//Solo si es la primera vez guardo los datos de lo filtrado en las otras TABLAS
			//if (!firstFilterEntryTable3) { filterSavedTable3 = aFiltersTable3; firstFilterEntryTable3 = true; }
			
			
			
			//console.log(filterSavedTable2);
			//Obtengo los parámetros del filtro y lo armo
			
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			var filterFound = false;
			
			//Creo un array dinámico conteniendo solo los filtros activos de la TABLA 3 
			for (var i=0;i<filterSavedAuxTable3.length;i++)
				{
					
				
					
					if (filterSavedAuxTable3[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
						{
							
							//console.log("encontrado")
							//console.log(filterSavedAuxTable2[i].oValue1);
							
							if (sValue=="") //Si el valor ingresado es nulo borro el filtro
							{
								console.log("borrado")
								filterSavedAuxTable3.splice(i,1);
								//filterSavedAuxTable3.push(oFilter);
								
							
							}else 
								{
									filterSavedAuxTable3.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
									filterSavedAuxTable3.push(oFilter);
									//filterSavedAuxTable3[i].oValue1 = sValue;
									
								}
						
							filterFound = true;
						}
					
					
				}
			
			if ((!filterFound)&&(sValue)!="") { filterSavedAuxTable3.push(oFilter);}
			
			console.log(filterSavedAuxTable3);
		
			
			////////////////////////////////////////////////////////////////
				//Dependiendo de la cantidad de filtros seteados en la TAblA 1, Armo el filtro Combinado
				if (filterSavedTable1.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable1.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				
				if (filterSavedTable1.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			
			
			
			
			
			
			//console.log(oCombinedFilter);
			
			/////////////////////////////////////////////////////
			
			//Aplico el filtro combinado
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			
			
			
			
			///////////////////////////////////////////////////
			
			
			////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1, Armo el filtro Combinado
			
			
			if (filterSavedAuxTable3.length==2)
			{
			
			
			
				if (filterSavedTable1.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedAuxTable3[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable1.length==3)
				{
					console.log("filtro 2x1");
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedAuxTable3[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				
				if (filterSavedTable1.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	filterSavedAuxTable3[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
		
			}
			
			
			
			if (filterSavedAuxTable3.length==3)
				{
				
				
				
				if (filterSavedTable1.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedAuxTable3[1],
				        	filterSavedAuxTable3[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable1.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedAuxTable3[1],
				        	filterSavedAuxTable3[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				
				if (filterSavedTable1.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable1[1],
				        	filterSavedTable1[2],
				        	filterSavedTable1[3],
				        	filterSavedAuxTable3[1],
				        	filterSavedAuxTable3[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}
			
				}
			
			//////////////////////////////////////////////////////
			
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 1
			
			var oBindingTable1 = ProductsTable1.getBinding();
			//console.log(oBindingTable1);
			
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable2 = ProductsTable2.getBinding();
			//console.log(oBindingTable3);
			
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable2 = oBindingTable2.aFilters;
			console.log(aFiltersTable2);
			
			
			//////////////////////////////////////////////
			
			//Debo Limpiar los filtros de las TABLAS que no se utilizan sino se concatenan
			
			if (aFiltersTable2.length==1){
				
				aFiltersTable2.splice(0,1);
				
			}
			
			if (aFiltersTable2.length==2){
						
						aFiltersTable2.splice(0,2);
						
					}
	
			if (aFiltersTable2.length==3){
				
				aFiltersTable2.splice(0,3);
				
			}
	
			oBindingTable2.filter(aFiltersTable2);
			
			
			////////////////////////////////////////////////////
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			}
		
		////////////////////////////////////////////////////////////////////////////////////////////////
		
		//Si hay otros filtros activos en las demas TABLAS
		//Filtros Activos TABLA 2
		
		if ((!filterFlag1)&&(filterFlag2))
			{
			console.log("Filtro Concatenado T2-T3");
			//Obtengo la vinculación con los datos de la TABLA 3
			
			var oBindingTable3 = ProductsTable3.getBinding();
			//console.log(oBindingTable3);
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable3 = oBindingTable3.aFilters;
			//console.log(oBindingTable3.aFilters);
			
			
			//Solo si es la primera vez guardo los datos de lo filtrado en las otras TABLAS
			//if (!firstFilterEntryTable3) { filterSavedTable3 = aFiltersTable3; firstFilterEntryTable3 = true; }
			
			
			
			//console.log(filterSavedTable2);
			//Obtengo los parámetros del filtro y lo armo
			
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(sPath, sOperator, sValue);
			
			var filterFound = false;
			
			//Creo un array dinámico conteniendo solo los filtros activos de la TABLA 3 
			for (var i=0;i<filterSavedAuxTable3.length;i++)
				{
					
				
					
					if (filterSavedAuxTable3[i].sPath==sPath) //Si ya hay un filtro creado con ese sPath actualizo el valor
						{
							
							//console.log("encontrado")
							//console.log(filterSavedAuxTable2[i].oValue1);
							
							if (sValue=="") //Si el valor ingresado es nulo borro el filtro
							{
								console.log("borrado")
								filterSavedAuxTable3.splice(i,1);
								//filterSavedAuxTable3.push(oFilter);
								
							
							}else 
								{
									filterSavedAuxTable3.splice(i,1); //Borro e inserto de nuevo el filtro solo por funcionalidad de los filtros
									filterSavedAuxTable3.push(oFilter);
									//filterSavedAuxTable3[i].oValue1 = sValue;
									
								}
						
							filterFound = true;
						}
					
					
				}
			
			if ((!filterFound)&&(sValue)!="") { filterSavedAuxTable3.push(oFilter);}
			
			console.log(filterSavedAuxTable3);
		
			
			////////////////////////////////////////////////////////////////
				//Dependiendo de la cantidad de filtros seteados en la TAblA 2, Armo el filtro Combinado
				if (filterSavedTable2.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable2.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				/*
				if (filterSavedTable2.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable2[3],
				        	oFilter
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}*/
			
			
			
			
			
			
			//console.log(oCombinedFilter);
			
			/////////////////////////////////////////////////////
			
			//Aplico el filtro combinado
			oBindingTable3.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			
			
			
			
			///////////////////////////////////////////////////
			
			
			////////////////////////////////////////////////////////////
			//Dependiendo de la cantidad de filtros seteados en la TAblA 1, Armo el filtro Combinado
			
			
			if (filterSavedAuxTable3.length==2)
			{
			
			
			
				if (filterSavedTable2.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedAuxTable3[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable2.length==3)
				{
					console.log("filtro 2x1");
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedAuxTable3[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				/*
				if (filterSavedTable2.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable2[3],
				        	filterSavedAuxTable3[1]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}*/
		
			}
			
			
			
			if (filterSavedAuxTable3.length==3)
				{
				
				
				
				if (filterSavedTable2.length==2)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedAuxTable3[1],
				        	filterSavedAuxTable3[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				
				if (filterSavedTable2.length==3)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          // filter for value 1
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedAuxTable3[1],
				        	filterSavedAuxTable3[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
					
					
				}
				/*
				
				if (filterSavedTable2.length==4)
				{
					var oCombinedFilter = new sap.ui.model.Filter({
					     
				        filters: [
				 
				          
				        	filterSavedTable2[1],
				        	filterSavedTable2[2],
				        	filterSavedTable2[3],
				        	filterSavedAuxTable3[1],
				        	filterSavedAuxTable3[2]
				         
				        ],
				     
				        // set the OR or AND condition between the filters
				        // true for AND, and false for OR
				        // false by default
				        and: true
				     
				      });
				}*/
			
				}
			
			//////////////////////////////////////////////////////
			
			
			console.log(oCombinedFilter);
			//Obtengo la vinculación con los datos de la TABLA 1
			
			var oBindingTable1 = ProductsTable1.getBinding();
			//console.log(oBindingTable1);
			
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable2 = ProductsTable2.getBinding();
			//console.log(oBindingTable3);
			
			//////////////////////////////////////////////////
			
			//Obtengo los filtros activos de la TABLA 1
			var aFiltersTable1 = oBindingTable1.aFilters;
			console.log(aFiltersTable1);
			
			
			
			
			//Debo Limpiar los filtros de las TABLAS que no se utilizan sino se concatenan
			
			if (aFiltersTable1.length==1){
				
				aFiltersTable1.splice(0,1);
				
			}
			
			if (aFiltersTable1.length==2){
						
						aFiltersTable1.splice(0,2);
						
					}
	
			if (aFiltersTable1.length==3){
				
				aFiltersTable1.splice(0,3);
				
			}
	
			oBindingTable1.filter(aFiltersTable1);
			
			
			////////////////////////////////////////////////////
			
			////////////////////////////////////////////////////
			//Aplico los filtros a las otras dos TABLAS
			oBindingTable1.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			oBindingTable2.filter(oCombinedFilter,sap.ui.model.FilterType.Application);
			
			
			}
		
		//////////////////////////////////////////////////////////////////////////
		//Solo Filtro TABLA 3
		
		if ((!filterFlag1)&&(!filterFlag2))
			{
			console.log("Tabla Individual");
			
			//Obtengo la vinculación con los datos de la TABLA 3
			
			var oBindingTable3 = ProductsTable3.getBinding();
			console.log(oBindingTable3);
			
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			
			var aFiltersTable3 = oBindingTable3.aFilters;
			console.log(aFiltersTable3);
			
			
			var sPath = oEvent.getParameters().column.mProperties.filterProperty;
			
			var sOperator = "Contains";
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(sPath, sOperator, sValue);
		
		
			//Compruebo si hay qie actualizar algun parametro del filtro, si ese es el  caso borro el antiguo parametro e inserto el nuevo
			for (var i=0;i<aFiltersTable3.length;i++)
			{
				if (aFiltersTable3[i].sPath==sPath) 
				{
					
					aFiltersTable3.splice(i,1);
				}
				
			}
			
			//Agrego el filtro creado y despues aplico el filtrado a la tabla
			aFiltersTable3.push(oFilter);
			
			oBindingTable3.filter(aFiltersTable3);
			
			////////////////////////////////////////////////////
			
			//Obtengo la vinculación con los datos de la TABLA 2
			
			var oBindingTable2 = ProductsTable2.getBinding();
			console.log(oBindingTable2);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			
			var aFiltersTable2 = oBindingTable2.aFilters;
			console.log(aFiltersTable2);
			
			///////////////////////////////////////////
			//Importante para configuración correcta
			//Si el filtro vinculado no es igual al construido para filtrar la TABLA 1 copio el modelo de la misma
			if (aFiltersTable2.length!=aFiltersTable3.length)
				{
				aFiltersTable2=aFiltersTable3;
				
				}
			///////////////////////////////////
			
			//Compruebo si hay qie actualizar algun parametro del filtro, si ese es el  caso borro el antiguo parametro e inserto el nuevo
			for (var i=0;i<aFiltersTable2.length;i++)
			{
				if (aFiltersTable2[i].sPath==sPath) 
				{
					
					aFiltersTable2.splice(i,1);
				}
				
			}
			
		
			//Agrego el filtro creado y despues aplico el filtrado a la tabla
			aFiltersTable2.push(oFilter);
			
			oBindingTable2.filter(aFiltersTable2);
			
			
			///////////////////////////////////////////////////
			
			
			//Obtengo la vinculación con los datos de la TABLA 1
			
			var oBindingTable1 = ProductsTable1.getBinding();
			console.log(oBindingTable1);
			
			//Configuro y obtengo los parámetros del  filtro introducidos por el usuario en la columna de filtrado
			
			var aFiltersTable1 = oBindingTable1.aFilters;
			console.log(aFiltersTable1);
			
			
			///////////////////////////////////////////
			//Importante para configuración correcta
			//Si el filtro vinculado no es igual al construido para filtrar la TABLA 1 copio el modelo de la misma
			if (aFiltersTable1.length!=aFiltersTable3.length)
				{
				aFiltersTable1=aFiltersTable3;
				
				}
			///////////////////////////////////
			
			
			for (var i=0;i<aFiltersTable1.length;i++)
			{
				if (aFiltersTable1[i].sPath==sPath) 
				{
					
					aFiltersTable1.splice(i,1);
				}
				
			}
			
			
		
			//Agrego el filtro creado y despues aplico el filtrado a la tabla
			aFiltersTable1.push(oFilter);
			
			oBindingTable1.filter(aFiltersTable1);
			
			
			
			}
		
		
		/////////////////////////////////
		
		console.log(filterSavedTable3);
		
		//////////////////////////////7
		
		//Guardo el estado de los Filtros de la TABLA 1 utilizando un Almacenamiento LOCAL!
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	  	
	  /*	var filterSavedTable3AuxStorage = filterSavedTable3;
	  	
	  	for (var i=0;i<filterSavedTable3AuxStorage.length;i++)
  		{
  			if (filterSavedTable3AuxStorage[i].sPath=="test")
  				{
  					filterSavedTable3AuxStorage.splice(0,1);
  				}
  		
  		}*/
	  	
	  	
	  	oStorage.put("filterSavedTable3",filterSavedTable3); //Actualizo la lista con el dato eliminado
	  	
	  	///////////////////////////////////////////
	  	//Seteo de Flags para indicar si hay filtros activos
	  	
		if (filterSavedTable3.length>1) {filterFlag3 = true;}
		if (filterSavedTable3.length==1) {filterFlag3 = false;}
		
		console.log(filterFlag3);
	},


	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf prismalunar.test3
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf prismalunar.test3
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf prismalunar.test3
*/
//	onExit: function() {
//
//	}
	});
	
});