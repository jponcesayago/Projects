

var rawMaterialDataArray  = [];

var firstLoadData=true;

var allItemsDeleted=false;

var rawMatId = 0;

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

	
	
	
	return Controller.extend("prismalunar.controller.viewrawmaterialregistry", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.viewrawmaterialregistry
*/
	onInit: function() {

		var rawMaterialTable= this.byId("rawMaterialTable");
		
		
		
		
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
	  	 
	  	
	  	var rawMaterialData = new sap.ui.model.json.JSONModel(); 
	  	
	  	
	  	let rawMaterialData = this.getRawMaterials();
	  	
	  	
	  	let rawMaterialTableData =
	  		[
	  			{
	  				matId,
	  				name,
	  				descrip,
	  				unit,
	  				price,
	  				quantity,
	  				priceUnitMt,
		  		}
	  		];
	  	
	  	for (var i=0;i<rawMaterialData.length;i++)
	  	{
	  		
	  		rawMaterialTableData.push
	  		(
	  			{
	  				matId: rawMaterialId,
	  				name: rawMaterialName,
	  				descrip: rawMaterialDescrip,
	  				unit: rawMaterialUom,
	  				price: 0,
	  				quantity: rawMaterialQuantity,
	  				priceUnitMt: 0
	  					
	  			}
	  		)
	  	}
	  	
	  	
	  	
	  	rawMaterialDataArray = oStorage.get("rawmaterial");
		    //rawMaterialModel.setData(oData);
	  	console.log(rawMaterialDataArray);
	  	
	  	
	  	
		rawMaterialData.setData(rawMaterialDataArray);
	  	rawMaterialTable.setModel(rawMaterialData);
	  	
	  	 
	  	if (rawMaterialDataArray!=null) { 
	  		
	  		
	  		
	  		rawMatId =  rawMaterialDataArray[rawMaterialDataArray.length-1].matId; 
	  		
	  		this.ReadingRawMatTemplate = this.getView().byId("rawMaterialTable").removeItem(0); //Seteo el template para Lectura de la Tabla
		  	
	  		
	  		console.log(this.ReadingRawMatTemplate);
		  	this.rebindTable(this.ReadingRawMatTemplate, "Navigation"); // Seteo el template de Lectura
	  	}
	  	
	  	if (rawMaterialDataArray==null) { 
	  		
	  		
	  		
	  		allItemsDeleted = true;
	  	
	  		var viewRawMatEditButton = this.byId("viewRawMatEditButton");
	  		
	  		viewRawMatEditButton.setEnabled(false);
	  	
	  	}
	  	
	  	console.log(rawMatId);
	  	
	  
	  	
	  	
	  	
	  	
	  	this.oEditableTemplate = new sap.m.ColumnListItem({ //Template para Ediciòn de Datos
			cells: [
				new sap.m.Input({
					value: "{matId}",
					enabled: false
				}), new sap.m.Input({
					value: "{name}",
					maxLength: 20
				}), new sap.m.Input({
					value: "{descrip}",
					maxLength:40
				}), new sap.m.Input({
					value: "{unit}",
					textAlign:"Center",
					enabled:false
				}), new sap.m.Input({
					value: "{price}",
					maxLength:10,
					textAlign:"Center"
				}), new sap.m.Input({
					value: "{quantity}",
					maxLength:10,
					textAlign:"Center"
				}), new sap.m.Input({
					value: "{priceUnitMt}",
					enabled:false,
					textAlign:"Center"
				}),
			]
		});
	  	
	  	
	  	
	  	 
	  	
	},
	///////////////////// Obtener Materia Prima /////////////////////////////////////
	
	getRawMaterials : function ()
	{
		
		let url = "http://localhost:56668/api/RawMaterials/GetRawMaterials";
		
		
		jQuery.ajax({
			  type: "GET",
			  contentType: "application/json",
			  headers: {"Content-Type": "application/json; charset=utf-8"},
			  //url: "http://10.0.30.250:45464/api/MaintenanceWorkOrders/GetCorrectiveMaintenanceIndex",
			  url:url,
			  dataType: "json",
		//	  data:{index:index,initDate:ValueBegin,endDate:ValueEnd},
			  //async: false,
			  async:false,
			  success: function(data, textStatus, jqXHR) {
			  
			  console.log(data);
				
			  return data;
			  }
			 
			  });
		
	},
	
	/////////////// ORDENAMIENTO DE REGISTROS ///////////////////////
	handleSortButtonPressed : function(){
		
	var ViewSettingsDialogSort = this.byId("ViewSettingsDialogSort");
	
	ViewSettingsDialogSort.open();
	
	
		
	},
	
	
	handleSortDialogConfirm : function(oEvent){
		
		var rawMaterialTable= this.byId("rawMaterialTable"),
		mParams = oEvent.getParameters(),
		oBinding = rawMaterialTable.getBinding("items"),
		sPath,
		bDescending,
		aSorters = [];

		sPath = mParams.sortItem.getKey();
		bDescending = mParams.sortDescending;
		aSorters.push(new Sorter(sPath, bDescending));
	
		// apply the selected sort and group settings
		oBinding.sort(aSorters);	
		
	},
	
	
	////////////////////////////FILTRADO //////////////////////////
	
	handleFilterButtonPressed : function(){
		var ViewSettingsDialogFilter = this.byId("ViewSettingsDialogFilter");
		
		ViewSettingsDialogFilter.open();
		
	},
	
	handleFilterDialogConfirm : function(oEvent){
			
		var rawMaterialTable= this.byId("rawMaterialTable"),
		mParams = oEvent.getParameters(),
		oBinding = rawMaterialTable.getBinding("items"),
		aFilters = [];

		mParams.filterItems.forEach(function(oItem) {
			var aSplit = oItem.getKey().split("___"),
				sPath = aSplit[0],
				sOperator = aSplit[1],
				sValue1 = aSplit[2],
				sValue2 = aSplit[3],
				oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
			aFilters.push(oFilter);
		});

		// apply filter settings
		oBinding.filter(aFilters);
	
		// update filter bar
		//this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
		//this.byId("vsdFilterLabel").setText(mParams.filterString);
		
	},
	
	
	hanldeSearchFieldFilterLiveChange : function(oEvent){
		
		var comboBoxFilter = this.byId("comboBoxFilter");
		var comboBoxFilterKey = comboBoxFilter.getSelectedKey();
		
		var rawMatSearchField = this.byId("rawMatSearchField");
		var rawMatSearchFieldValue = rawMatSearchField.getValue();
		
		
		var rawMaterialTable= this.byId("rawMaterialTable"),
		//mParams = oEvent.getParameters(),
		oBinding = rawMaterialTable.getBinding("items"),
		aFilters = [];
		
		if (comboBoxFilterKey=="name"){
			var sPath = "name";}
		else 
		{
			var sPath = "descrip";
			
		}
		
		var sOperator = "Contains";
		var sValue1 = rawMatSearchFieldValue;
		var oFilter = new Filter(sPath, sOperator, sValue1);
		
		aFilters.push(oFilter);
		
		// apply filter settings
		oBinding.filter(aFilters);
		
	},
	
	
	/////////////////////////////////////////////////////////////////////////////////// 
	
	
	//////////////////////////////// AGRUPAMIENTO ////////////////////////////////////7
	handleGroupButtonPressed : function(){
		
		var ViewSettingsDialogGoup = this.byId("ViewSettingsDialogGoup");
		
		ViewSettingsDialogGoup.open();
		
	},
	
	rebindTable: function(oTemplate, sKeyboardMode) {
		
		var rawMaterialTable = this.byId("rawMaterialTable");
		
		rawMaterialTable.bindItems({
			path: "/",
			template: oTemplate,
			key: "matId"
		}).setKeyboardMode(sKeyboardMode);
	},
	
	/////////////////////////////////////////////////////////////////////////////////////
	
	/////////////////// BOTONES EDICION DE REGISTROS //////////////////////////////////7
	
	handleRawMatEdit : function(){
		
		var rawMaterialTable= this.byId("rawMaterialTable");
		
		var oModel = rawMaterialTable.getModel();
		
		rawMaterialTable.setMode("SingleSelectMaster");
		
		console.log(oModel);
		
		this.rawMaterialsData = jQuery.extend(true, [], oModel.getProperty("/"));
		
		this.byId("textFilter").setVisible(false);
		this.byId("rawMatSearchField").setVisible(false);
		this.byId("comboBoxFilter").setVisible(false);
		this.byId("sortRawMatTable").setVisible(false);
		this.byId("filterRawMatTable").setVisible(false);
		this.byId("groupRawMatTable").setVisible(false);
		
		this.byId("viewRawMatEditButton").setVisible(false);
		this.byId("viewRawMatSaveEditButton").setVisible(true);
		this.byId("viewRawMatCancelEditButton").setVisible(true);
		
		this.byId("viewRawMatNewRawMatButton").setVisible(false);
		this.byId("viewRawMatCSVexport").setVisible(false);
		
		
		this.rebindTable(this.oEditableTemplate, "Edit");
		
		
	},
	
	handleRawMatSaveEdit: function(){
		
		var rawMaterialTable= this.byId("rawMaterialTable");
		
		
		
		
		
		
	},
	
	
	handleRawMatCancelEdit : function (){
		
		var rawMaterialTable = this.byId("rawMaterialTable");
		
		
		
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	  	
	  	rawMaterialDataArray = oStorage.get("rawmaterial");
	  	
	  	var oModel = rawMaterialTable.getModel();
	  	
		console.log(oModel);
		
		rawMaterialTable.setModel(oModel);
		
		
		this.byId("textFilter").setVisible(true);
		this.byId("rawMatSearchField").setVisible(true);
		this.byId("comboBoxFilter").setVisible(true);
		
		this.byId("sortRawMatTable").setVisible(true);
		this.byId("filterRawMatTable").setVisible(true);
		this.byId("groupRawMatTable").setVisible(true);
		
		
		this.byId("viewRawMatEditButton").setVisible(true);
		this.byId("viewRawMatSaveEditButton").setVisible(false);
		this.byId("viewRawMatCancelEditButton").setVisible(false);
		
		this.byId("viewRawMatNewRawMatButton").setVisible(true);
		this.byId("viewRawMatCSVexport").setVisible(true);
		
		rawMaterialTable.setMode("Delete");
		
		
		//this.ReadingRawMatTemplate.removeItem(0);
		
		oModel.setProperty("/",this.rawMaterialsData);
		this.rebindTable(this.ReadingRawMatTemplate, "Navigation");
		
	},
	////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////// BORRADO DE REGISTROS //////////////////////////////
	
	handleRawMatDeleteItem: function(oEvent){ //Método para controlar el evento de click en el boton delete de la tabla
		
		var rawMaterialTable= this.byId("rawMaterialTable");
		var rawMaterialDataJson = new sap.ui.model.json.JSONModel(); 
		
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); 
		
	  	rawMaterialDataArray = oStorage.get("rawmaterial"); //Obtengo todos los datos almacenados
		var rawMatIDRemoveItem = parseInt(oEvent.getParameters().listItem.mAggregations.cells[0].mProperties.title,10); // Obtengo el matId del elemento a eliminar
		
		console.log(rawMatIDRemoveItem);
		
		//var rawMatIndexRemoveItem = oRawMaterialData.findIndex();
		
		
		for (var i=0;i<rawMaterialDataArray.length;i++){ //Busco a que numero de Index corrersponde ese ID
			
			if (rawMaterialDataArray[i].matId==rawMatIDRemoveItem){
				
				var rawMatIndexRemoveItem = i;
				
				
			}
				
		}
		
		console.log(rawMatIndexRemoveItem);
		
		rawMaterialDataArray.splice(rawMatIndexRemoveItem,1); // Elimino el valor del Storage
		
		console.log(rawMaterialDataArray);
		
		rawMaterialDataJson.setData(rawMaterialDataArray);
		rawMaterialTable.setModel(rawMaterialDataJson);
		
		oStorage.put("rawmaterial",rawMaterialDataArray); //Actualizo la lista con el dato eliminado
		
		
		
		//rawMaterialTable.removeItem(oEvent.getParameters().listItem.sId); // Saco el Item de la Tabla ( Toda la fila)
		//console.log(oEvent.getParameters().listItem.sId);
		
		
		
		
		
		
		
	},
	/////////////////////////////////////////////7
	searchMatIdIndex: function(){
		
	},
	
	//////////////////////////////// EXPORTAR DATOS ARCHIVOS CSV EXCEL /////////////////////
	handleCSVExport: function (oEvent){
	
		var rawMaterialTable= this.byId("rawMaterialTable");
		var rawMaterialDataJson = new sap.ui.model.json.JSONModel(); 
		
		rawMaterialDataJson.setData(rawMaterialDataArray);
		
		
		var oExport = new Export({

			// Type that will be used to generate the content. Own ExportType's can be created to support other formats
			exportType : new ExportTypeCSV({
				separatorChar : ";"
			}),

			// Pass in the model created above
			//models : this.getView().getModel(), //FALTA CREAR EL  MODELO
			models: rawMaterialDataJson,
			// binding information for the rows aggregation
			rows : {
				path : "/"
			},

			// column definitions with column name and binding info for the content

			columns : [{
				name : "ID",
				template : {
					content : "{matId}"
				}
			}, {
				name : "Nombre",
				template : {
					content : "{name}"
				}
			}, {
				name : "Descripción",
				template : {
					content : "{descrip}"
				}
			}, {
				name : "Unidad",
				template : {
					content : "{unit}"
					}
				// "{Width} x {Depth} x {Height} {DimUnit}"
				}
			, {
				name : "Precio",
				template : {
					content : "{price}"
				}
			}, {
				name : "Longitud/Cantidad",
				template : {
					content : "{quantity}"
				}	
			},
			{
				name : "Precio(mt/unidad)",
				template : {
					content : "{priceUnitMt}"
				}	
			}
			
			]
		});

		// download exported file
		oExport.saveFile().catch(function(oError) {
			MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
		}).then(function() {
			oExport.destroy();
		});
		
		
	}
	,
	
	///////////////////// AGREGAR REGISTRO DE MATERIALES /////////////////////
	
	handleNewRawMatButton: function(){
		
		var oDataSelect ={
				"SelectedUnit":"meters",
				"Units":[
					{	
						"ItemId":"meters",
						"Item":"Mts"
						
					},
					{	
						"ItemId":"quantity",
						"Item":"Cantidad"
						
					}
				]		
		};
		
		var oModelSelect = new JSONModel(oDataSelect);
		this.getView().setModel(oModelSelect);
		
		var SelectUnit= this.getView().byId("newRawSelect");
		var oItemSelected= SelectUnit.getSelectedItem();
		
		var newRawMatDialog = this.byId("newRawMatDialog");
		
		newRawMatDialog.open();
		
		
		//jQuery.sap.require("jquery.sap.storage");
	  	//var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	  	
	  	//var rawMaterialData = new sap.ui.model.json.JSONModel(); 
	  	
	  	//rawMaterialDataArray = oStorage.get("rawmaterial");
	  	
	  	//if (rawMaterialDataArray!=null) { rawMatId =  rawMaterialDataArray[rawMaterialDataArray.length-1].matId; }
	  	
	  	//console.log(rawMaterialDataArray);
	  	
	  	
	  	if (rawMaterialDataArray==null){ // Si la tabla no tiene items creo uno generico de referencia
	  		
	  		
	  		allItemsDeleted = true; // seteo el flag para reconocimiento de que la lista vacia
	  			
	  		 rawMaterialDataArray =[
					
					{	
						matId:rawMatId,
						name :"", 
						descrip:"",
						unit:"",
						price:"", 
						quantity : "",
						priceUnitMt : 0	
					}
				];
	  		
	  		
	  	}
		
		
		
		
		
	},
	
	handlecloseNewRawMatDialog: function(){
		
		var newRawMatDialog = this.byId("newRawMatDialog");
		
		newRawMatDialog.close();
		
	},
	
	
	handleSaveNewRawMatDialog : function(){
		
		var rawMaterialTable= this.byId("rawMaterialTable");
		
		var nameRawMat = this.byId("nameRawMat");
		var descRawMat = this.byId("descRawMat");
		var priceTotalRawMat = this.byId("priceTotalRawMat");
		var priceUnitRawMat = this.byId("priceUnitRawMat");
		var quantTotalRawMat= this.byId("quantTotalRawMat");
		var newRawSelect = this.byId("newRawSelect"); 
		
		
		
		var priceTotalRawMatOk=true;
		var nameRawMatOk=true;
		var quantTotalRawMatOk=true;
		
		//console.log(nameRawMat.getValue());
		//console.log(descRawMat.getValue());
		
		if	(nameRawMat.getValue().length<=3) {
			
			sap.m.MessageBox.error("El nombre asociado a la nueva materia prima debe contener al menos 4 caracteres", {
				actions:[MessageBox.Action.OK],
				title: "Error",                                      // default
			    onClose: null,                                       // default
			    styleClass: "",                                      // default
			    initialFocus: null,                                  // default
			    textDirection: sap.ui.core.TextDirection.Inherit     // default
			});
			
			nameRawMatOk=false;
			nameRawMat.setValue(" ");
			nameRawMat.setValueState(sap.ui.core.ValueState.Error);
			
		}

		
		if ((!priceTotalRawMat.getValue())&&(nameRawMatOk==true)){
			
			
			sap.m.MessageBox.error("Debe ingresar un precio", {
				actions:[MessageBox.Action.OK],
				title: "Error",                                      // default
			    onClose: null,                                       // default
			    styleClass: "",                                      // default
			    initialFocus: null,                                  // default
			    textDirection: sap.ui.core.TextDirection.Inherit     // default
			});
			
			priceTotalRawMatOk=false;
			
			priceTotalRawMat.setValue(0);
			priceTotalRawMat.setValueState(sap.ui.core.ValueState.Error);
		}
		
		if ((!quantTotalRawMat.getValue())&&(priceTotalRawMatOk==true)&&(nameRawMatOk==true)){
			
			
			sap.m.MessageBox.error("Debe ingresar una cantidad correspondiente a la unidad", {
				actions:[MessageBox.Action.OK],
				title: "Error",                                      // default
			    onClose: null,                                       // default
			    styleClass: "",                                      // default
			    initialFocus: null,                                  // default
			    textDirection: sap.ui.core.TextDirection.Inherit     // default
			});
			
			quantTotalRawMatOk=false;
			
			quantTotalRawMat.setValue(0);
			quantTotalRawMat.setValueState(sap.ui.core.ValueState.Error);
		}
		
		
		if ((priceTotalRawMatOk==true)&&(nameRawMatOk==true)&&(quantTotalRawMatOk==true))
		{
			
			var viewRawMatEditButton = this.byId("viewRawMatEditButton");
	  		
	  		viewRawMatEditButton.setEnabled(true);
	  		
			rawMatId+=1;
			var rawMaterialDataJson = new sap.ui.model.json.JSONModel(); 
			
		
			//Storage
		  	jQuery.sap.require("jquery.sap.storage");
		  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		 
			var priceTotalRawMatStore = priceTotalRawMat.getValue();
			var priceUnitRawMatStore = priceUnitRawMat.getValue();
			var quantTotalRawMatStore = quantTotalRawMat.getValue();
			var nameRawMatStore = nameRawMat.getValue();	
			var descRawMatStore = descRawMat.getValue();
			var unitRawMat = newRawSelect.getSelectedKey();
			
			
			
		  
		  	//console.log(oStorage);
		  /*//Check if there is data into the Storage
		    if (oStorage.get("model/rawmaterial.json")) {
		    console.log("Data is from Storage!");
		    var oData = oStorage.get("model/rawmaterial.json");
		    rawMaterialModel.setData(oData);
		    }
		    */
		  	
		  	
		    
			
			
			var oData =[
						
							{	matId: rawMatId,
								name :nameRawMatStore, 
								descrip:descRawMatStore,
								unit: unitRawMat,
								price:priceTotalRawMatStore, 
								quantity : quantTotalRawMatStore,
								priceUnitMt : priceUnitRawMatStore
							}
						];
			
			
			
			//rawMaterialTable.addItem(oData);
			
			rawMaterialDataArray.push(
					
					{	matId: rawMatId,
						name :nameRawMatStore, 
						descrip:descRawMatStore,
						unit: unitRawMat,
						price:priceTotalRawMatStore, 
						quantity : quantTotalRawMatStore,
						priceUnitMt : priceUnitRawMatStore
					});
			
			//if (rawMaterialDataArray==null) { allItemsDeleted = true;}
			
			if (allItemsDeleted==true){ //Si se habian eliminado todos los items borro la primera posicion que es hardodeada para crer el objeto
		  		
				allItemsDeleted=false;
		  		rawMaterialDataArray.splice(0,1); 
		  		
		  	}
	
			console.log(rawMaterialDataArray);
			
			
			//rawMaterialTable.destroyItems();
			


			rawMaterialDataJson.setData(rawMaterialDataArray);// Cargo el JSON con el nuevo item
			console.log(rawMaterialDataJson);
			
			rawMaterialTable.setModel(rawMaterialDataJson);// seteo el model anterior que contien todos los datos
			
				
			
			
			
			
			
			
			//rawMaterialDataArray.push(oData)
			//console.log(rawMaterialDataJson);
			
			 oStorage.put("rawmaterial",rawMaterialDataArray);
			 
			 
			 var oData = oStorage.get("rawmaterial");
			 console.log(oData);
			 
			 
			  //  rawMaterialModel.setData(oData);
			 
			priceTotalRawMat.setValue(0);
			priceUnitRawMat.setValue(0);
			quantTotalRawMat.setValue(0);
			nameRawMat.setValue("");	
			descRawMat.setValue("");
			newRawSelect.setSelectedItem("Mts");
			
			//nameRawMat.setPlaceHolder("Ingrese nombre del material");
			//descRawMat.setPlaceHolder("Ingrese descripción");
		
			
			
			sap.m.MessageToast.show("Se han guardado con éxito todos los datos ingresados", {
			    duration: 3000,                  // default
			    width: "15em",                   // default
			    my: "center bottom",             // default
			    at: "center bottom",             // default
			    of: window,                      // default
			    offset: "0 0",                   // default
			    collision: "fit fit",            // default
			    onClose: null,                   // default
			    autoClose: true,                 // default
			    animationTimingFunction: "ease", // default
			    animationDuration: 1000,         // default
			    closeOnBrowserNavigation: true   // default
			});
			
		}
		
		
		
	},
	
	
handleSelectNewRawMat: function(){
		
		var SelectUnit= this.getView().byId("newRawSelect");
		var oItemSelected= SelectUnit.getSelectedItem();
		
		var priceUnitRawMatLabel = this.byId("priceUnitRawMatLabel");
		var priceUnitRawMat = this.byId("priceUnitRawMat");
		var quantTotalRawMatLabel = this.byId("quantTotalRawMatLabel");
		
			switch (oItemSelected.mBindingInfos.text.binding.oValue){
			
			case "Mts":
				//var index="category";
			
				priceUnitRawMatLabel.setText("Precio/mt: ");
				priceUnitRawMat.setTooltip("Precio por metro del material ingresado");
				quantTotalRawMatLabel.setText("Longitud: ");
				break;
				
			case "Cantidad":
				//var index="subcategory";
				
				
				priceUnitRawMatLabel.setText("Precio/cant: ");
				priceUnitRawMat.setTooltip("Precio por unidad del material ingresado")
				quantTotalRawMatLabel.setText("Cantidad: ");
				
				break;
				
		
			}
			
		
		
		
	},
	
	handleCalculPriceUnit: function()
	{
		var quantTotalRawMat = this.byId("quantTotalRawMat");
		var priceTotalRawMat = this.byId("priceTotalRawMat");
		var priceUnitRawMat = this.byId("priceUnitRawMat");
		
		var priceTotalRawMatSet = (priceTotalRawMat.getValue()/quantTotalRawMat.getValue()).toFixed(2);
		priceUnitRawMat.setValue(priceTotalRawMatSet);
		
		
	},
	
	////////////////////////////////////////////////
	
	handleViewRawMatNavButton: function(){

		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("homePage");
		
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.viewrawmaterialregistry
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.viewrawmaterialregistry
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.viewrawmaterialregistry
*/
//	onExit: function() {
//
//	}
		
	});

});