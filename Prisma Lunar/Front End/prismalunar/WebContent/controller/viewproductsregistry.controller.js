
////////////////// Tabla Almacena informacion de los materias primas que componen un producto

var RawMatProductDataArray = [{
	
	prodId : 0,
	matId : 0,
	
	
	
	
}];





//////////// Tabla para almacenamiento temporal de los datos de las materias primas de un producto 

var addRawMatDataArray = [
	  		{
	  			matId:0,
	  			name:"",
	  			priceUnitMt:0,
	  			quantityRawMat:0,
	  			costRawMat:0
	  		}
	  	];


var saveNewProductButtonFlag = false;

var emptyRawMatItems = true;


///////////////////////////////// Tabla que almacena la informacion de materios primas

var rawMaterialDataArray  = [];


//////////////////////// tabla para almacenamiento de productos 

var productsDataArray  = [];


////////////////////////////////////777



var firstLoadData=true;

var allItemsDeleted = false;

var allProductsItemsDeleted = false;

var productId = 0;

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox',
	"sap/ui/unified/DateTypeRange",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
], function(Controller, JSONModel,MessageBox,DateTypeRange, MessageToast, DateFormat,Export, ExportTypeCSV) {
	"use strict";

	
	
	
	return Controller.extend("prismalunar.controller.viewproductsregistry", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.viewproductsregistry
*/
	onInit: function() {
		
		var ProductsTable= this.byId("ProductsTable");
		
		
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
	  	rawMaterialDataArray = oStorage.get("rawmaterial"); // Cargos los productos en el array para el manejo de los datos
	  	console.log(rawMaterialDataArray);
	  	
	  	
	  	if (rawMaterialDataArray!=null) { 
	  		
	  		
	  		this.byId("viewNewProductButton").setEnabled(true);
	  	}
	  	
	  	var productsData = new sap.ui.model.json.JSONModel();  // MOdelo JSON para inserar datos en la tabla
	  	
	  	
	  	
	  	productsDataArray = oStorage.get("products"); // Cargos los productos en el array para el manejo de los datos
		    //rawMaterialModel.setData(oData);
	  	//console.log(productsDataArray);
	  	 
	  	if (productsDataArray!=null) { 
	  		
	  		productId =  productsDataArray[productsDataArray.length-1].prodId;
	  		//productsData.setData(productsDataArray);
		  	//ProductsTable.setModel(productsData);
		  	
	  		}
	  	
	  	if (productsDataArray==null) { 
	  		
	  		allProductsItemsDeleted = true;
	  		
	  		productsDataArray = [
	  			{
	  				prodId : productId,
	  				prodName : "",
	  				prodDescrip:"",
	  				prodPrice:0
	  				
	  			}
	  			
	  		]
	  		
	  	}
	  	
	  	//console.log(productId);
	  	//console.log(productsDataArray);
	  	
	  	
	  	
	  	
	},
	
	
	////////////////////// NUEVO PRODUCTO ////////////////////////////
	
	
	handleNewProductButton : function(){
		
		var addRawMatTable = this.byId("addRawMatTable");
		
		var addRawMatTableJson = new JSONModel();
		
		addRawMatTable.setModel(addRawMatTableJson);
		
	/*	jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
	  	
	  	
	  	rawMaterialDataArray = oStorage.get("rawmaterial"); // Cargos los productos en el array para el manejo de los datos
	  	
	  	
	  	console.log(rawMaterialDataArray);
	  	*/
	  	
	  	/*
		var oDataSelect ={
				"SelectedRawMat":"meters",
				"Materials":[
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
		
		
		*/
		
		
		var oModelSelect = new JSONModel(rawMaterialDataArray);
		//this.getView().setModel(oModelSelect);
		
		var rawMaterialSelect= this.getView().byId("rawMaterialSelect");
		
		rawMaterialSelect.setModel(oModelSelect);
		
		rawMaterialSelect.setSelectedKey(rawMaterialDataArray[0].matId);
		
		var oItemSelected= rawMaterialSelect.getSelectedItem();
			
		//console.log(oItemSelected);
		
		var matId = oItemSelected.mProperties.key;
		
		//console.log(matId);
		var priceUnitRawMat = this.byId("priceUnitRawMat");
		var quantTotalRawMat = this.byId("quantTotalRawMat");
		var priceUnitRawMatLabel = this.byId("priceUnitRawMatLabel");
		var quantTotalRawMatLabel = this.byId("quantTotalRawMatLabel");
		
		for (var i=0;i<rawMaterialDataArray.length;i++){
			
			if (rawMaterialDataArray[i].matId==matId){ 
				
				
			var	priceUnit = rawMaterialDataArray[i].priceUnitMt;
			
			priceUnitRawMat.setValue(priceUnit);
			
			if(rawMaterialDataArray[i].unit=="meters") {
				
				priceUnitRawMatLabel.setText("Precio/mt:");
				priceUnitRawMat.setTooltip("Precio por metro del material ingresado");
				quantTotalRawMatLabel.setText("Longitud: ");
				quantTotalRawMat.setTooltip("Ingrese la longitud total a utilizar");
				
			}
			else {
				
				priceUnitRawMatLabel.setText("Precio/uni.: ");
				priceUnitRawMat.setTooltip("Precio por unidad del material ingresado");
				quantTotalRawMatLabel.setText("Cantidad: ");
				quantTotalRawMat.setTooltip("Ingrese la cantidad de unidades a utilizar")
			}
			
			
			}
			
		}
		
		var newProductDialog = this.byId("newProductDialog");
		newProductDialog.open();
		
		
		
		
		
	},
	
	
	
	handleCalculCost : function(){
		
		var quantTotalRawMat = this.byId("quantTotalRawMat");
		var costRawMat = this.byId("costRawMat");
		var priceUnitRawMat = this.byId("priceUnitRawMat");
		
		var costRawMatSet = (priceUnitRawMat.getValue()*quantTotalRawMat.getValue()).toFixed(2);
		costRawMat.setValue(costRawMatSet);
		
	},
	
	handleAddRawMatDialog: function(){
		
		var quantTotalRawMat = this.byId("quantTotalRawMat");
		var costRawMat = this.byId("costRawMat");
		
			
		var addRawMatTable = this.byId("addRawMatTable");
		var addRawMatTableJson = new JSONModel();
		
		var rawMaterialSelect = this.byId("rawMaterialSelect"); 
		
		//console.log(rawMaterialSelect.getSelectedKey());
		
		var matId = rawMaterialSelect.getSelectedKey();
		
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
	   // rawMaterialDataArray = oStorage.get("rawmaterial"); // Cargos los productos en el array para el manejo de los datos
		
	  	//console.log(quantTotalRawMat.getValue());
	  	
	  	if ((quantTotalRawMat.getValue()=="")||(quantTotalRawMat.getValue()<=0)){
	  		
	  		sap.m.MessageBox.error("El valor ingresado en Cantidad/Longitud debe ser mayor a 0", {
				actions:[MessageBox.Action.OK],
				title: "Error",                                      // default
			    onClose: null,                                       // default
			    styleClass: "",                                      // default
			    initialFocus: null,                                  // default
			    textDirection: sap.ui.core.TextDirection.Inherit     // default
			});
	  		
	  		quantTotalRawMat.setValueState(sap.ui.core.ValueState.Error);
	  		
	  	} //IF
	  	else {
		
	  		saveNewProductButtonFlag=true;
	  		
	  		var saveNewProdDialog = this.byId("saveNewProdDialog");
	  		saveNewProdDialog.setEnabled(true);
	  		
	  		for (var i=0;i<rawMaterialDataArray.length;i++){
				
				if (rawMaterialDataArray[i].matId==matId){ 
					
					addRawMatDataArray.push({
						matId : matId,
						name : rawMaterialDataArray[i].name,
						priceUnitMt :rawMaterialDataArray[i].priceUnitMt,
						quantityRawMat : quantTotalRawMat.getValue() ,
						costRawMat : costRawMat.getValue()
						
					});
					
					
			
				
				}
		
				
			}
			
			if (emptyRawMatItems==true)
				{
				
				addRawMatDataArray.splice(0,1);
				
				emptyRawMatItems=false;
				}
			
			console.log(addRawMatDataArray);
			
			
			addRawMatTableJson.setData(addRawMatDataArray);
			addRawMatTable.setModel(addRawMatTableJson);
			
			quantTotalRawMat.setValue(0);
			costRawMat.setValue(0);
			
			quantTotalRawMat.setValueState(sap.ui.core.ValueState.None);
			
	  	
	  	}// Else
	  	
		
	},
	
	handleSaveNewProductDialog : function(){
		
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	  	
	  	
	  	
		var ProductsTable= this.byId("ProductsTable");
		var ProductsTableJson = new JSONModel();
		var newProductDialog = this.byId("newProductDialog");
		
		var nameProduct = this.byId("nameProduct");
		var descProduct = this.byId("descProduct");
		var priceTotalRawMat = this.byId("priceTotalRawMat");
		var priceUnitRawMat = this.byId("priceUnitRawMat");
		var quantTotalRawMat= this.byId("quantTotalRawMat");
		var newRawSelect = this.byId("rawMaterialSelect"); 
		var costRawMat = this.byId("costRawMat");
		
		
		//var priceTotalRawMatOk=true;
		var nameProductOk=true;
		//var quantTotalRawMatOk=true;
		
		//console.log(nameRawMat.getValue());
		//console.log(descRawMat.getValue());
		
		productId+=1;
		var totalProductPrice = 0;
		
		//console.log(addRawMatDataArray);
		
		
		for (var i=0;i<addRawMatDataArray.length;i++)
			{
			
			totalProductPrice = totalProductPrice + parseInt(addRawMatDataArray[i].costRawMat,10);
			
			
			}
		
		//console.log(totalProductPrice);
		
		productsDataArray.push({
			
				prodId : productId,
				prodName : nameProduct.getValue(),
				prodDescrip: descProduct.getValue(),
				prodPrice: totalProductPrice
				
		});
		
		
		if (allProductsItemsDeleted==true){ allProductsItemsDeleted = false; productsDataArray.splice(0,1);}
		
		
		ProductsTableJson.setData(productsDataArray);
		ProductsTable.setModel(ProductsTableJson);
		//console.log(ProductsTableJson);
		
		newProductDialog.close();
		
		
		nameProduct.setValue("");
		descProduct.setValue("");
		rawMaterialSelect.setSelectedKey(addRawMatDataArray[0].matId);
		quantTotalRawMat.setValue(0);
		costRawMat.setValue(0);
		
		
		oStorage.put("rawMatProduct",addRawMatDataArray); // Guardo la información del producto en la tabla Materias Primas por Producto
		
		oStorage.put("products",productsDataArray); // Guardo la información del producto
		
		
		
	},
	
		////////////////////////////////////////////////////////////////////////////////////////
	
	handleRawMatDeleteItem : function(oEvent){
		
		var addRawMatTable= this.byId("addRawMatTable");
		var addRawMatTableJson = new JSONModel();
		
		var rawMatIDRemoveItem = parseInt(oEvent.getParameters().listItem.mAggregations.cells[0].mProperties.title,10); // Obtengo el matId del elemento a eliminar
		
		//console.log(rawMatIDRemoveItem);
		
		for (var i=0;i<addRawMatDataArray.length;i++){ //Busco a que numero de Index corrersponde ese ID
			
			if (addRawMatDataArray[i].matId==rawMatIDRemoveItem){
				
				var rawMatIndexRemoveItem = i;
				
				
			}
				
		}
		
		//console.log(rawMatIndexRemoveItem);
		
		addRawMatDataArray.splice(rawMatIndexRemoveItem,1); // Elimino el valor del Storage
		
		console.log(addRawMatDataArray);
		
		addRawMatTableJson.setData(addRawMatDataArray);
		addRawMatTable.setModel(addRawMatTableJson);
		
		
		if (addRawMatDataArray.length==0){
			
			//console.log("entro");
			
			var saveNewProdDialog = this.byId("saveNewProdDialog");
	  		saveNewProdDialog.setEnabled(false);
	  		
			//emptyRawMatItems=true;
			
			/*addRawMatDataArray = [
		  		{
		  			matId:0,
		  			name:"",
		  			priceUnitMt:0,
		  			quantityRawMat:0,
		  			costRawMat:0
		  		}
		  	];*/
			
		}
	},
	
	
	
	
	handleSelectRawMatChange : function(oEvent){
		
		var quantTotalRawMatLabel = this.byId("quantTotalRawMatLabel");
		var priceUnitRawMatLabel = this.byId("priceUnitRawMatLabel");
		var priceUnitRawMat = this.byId("priceUnitRawMat");
		var quantTotalRawMat = this.byId("quantTotalRawMat");
		
		
		//jQuery.sap.require("jquery.sap.storage");
	  	//var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		
	  	//rawMaterialDataArray = oStorage.get("rawmaterial"); // Cargos los productos en el array para el manejo de los datos
	  	
	  	
		//console.log(oEvent.getParameters());
		
		var matId = oEvent.getParameters().selectedItem.mProperties.key; // Obtengo el Id de la materia prima seleccionada 
		//console.log(matId);
		
		

		for (var i=0;i<rawMaterialDataArray.length;i++){
			
			if (rawMaterialDataArray[i].matId==matId){ 
				
				
			var	priceUnit = rawMaterialDataArray[i].priceUnitMt;
			
			priceUnitRawMat.setValue(priceUnit);
			
			if(rawMaterialDataArray[i].unit=="meters") {
				
				priceUnitRawMatLabel.setText("Precio/mt:");
				priceUnitRawMat.setTooltip("Precio por metro del material ingresado");
				quantTotalRawMatLabel.setText("Longitud: ");
				quantTotalRawMat.setTooltip("Ingrese la longitud total a utilizar");
				
			}
			else {
				
				priceUnitRawMatLabel.setText("Precio/uni.: ");
				priceUnitRawMat.setTooltip("Precio por unidad del material ingresado");
				quantTotalRawMatLabel.setText("Cantidad: ");
				quantTotalRawMat.setTooltip("Ingrese la cantidad de unidades a utilizar")
			}
			
			}
			
		}
		
		
	},
	
	

	handlecloseNewProductDialog : function(){
		
		var costRawMat = this.byId("costRawMat");
		var quantTotalRawMat = this.byId("quantTotalRawMat");
		
		
		
		
		 addRawMatDataArray = [
			  		{
			  			matId:0,
			  			name:"",
			  			priceUnitMt:0,
			  			quantityRawMat:0,
			  			costRawMat:0
			  		}
			  	];
		
		 emptyRawMatItems = true;
		 
		var newProductDialog = this.byId("newProductDialog");
		newProductDialog.close();
		
		costRawMat.setValue(0);
		quantTotalRawMat.setValue(0);
		
	},
	
	handleViewProductsNavButton : function(){
		
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("homePage");
		
		
	}
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.viewproductsregistry
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.viewproductsregistry
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.viewproductsregistry
*/
//	onExit: function() {
//
//	}

	});
	
});