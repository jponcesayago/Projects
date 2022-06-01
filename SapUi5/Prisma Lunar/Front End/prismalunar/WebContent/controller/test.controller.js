

/* var dataFilterTable2 =[
	{
		prodId:1,
		prodName:"elástico",
		prodDescrip:"aaaaa",
		prodPrice:10,
		prodUOM:"metros",
		prodQuantity:200,
		
	}
];*/
var dataFilterTable2 =[];


var oData =[];

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

	
	
	
	return Controller.extend("prismalunar.controller.test", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.test
*/
onInit: function() {

	var ProductsTable = this.getView().byId("ProductsTable");
	var ProductsTable2 = this.getView().byId("ProductsTable2");
	
	var ProductsTableJson = new JSONModel();
	
	 oData = [
		{
			prodId:1,
			prodName:"elástico",
			prodDescrip:"aaaaa",
			prodPrice:10,
			prodUOM:"metros",
			prodQuantity:200,
			
		},{
			prodId:2,
			prodName:"RJ-45",
			prodDescrip:"jack ethernet",
			prodPrice:30,
			prodUOM:"cantidad",
			prodQuantity:300,
			
		},{
			prodId:3,
			prodName:"notebook dell",
			prodDescrip:"inspiron 5363",
			prodPrice:70000,
			prodUOM:"cantidad",
			prodQuantity:5,
			
		},{
			prodId:4,
			prodName:"tv samsung",
			prodDescrip:"45'",
			prodPrice:10,
			prodUOM:"quantity",
			prodQuantity:15500,
			
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
	
	
	ProductsTableJson.setData(oData);
	console.log(ProductsTableJson);
	
	ProductsTable.setModel(ProductsTableJson);
	ProductsTable2.setModel(ProductsTableJson);
	
	//console.log(ProductsTable);
	
	
	},
	
	hanldeSearchFieldFilterLiveChange : function (){
		
		 dataFilterTable2 =[
				{
					prodId:1,
					prodName:"elástico",
					prodDescrip:"aaaaa",
					prodPrice:10,
					prodUOM:"metros",
					prodQuantity:200,
					
				}
			];
		
		var ProductTable2Json = new JSONModel();
		
		var comboBoxFilter = this.byId("comboBoxFilter");
		var comboBoxFilterKey = comboBoxFilter.getSelectedKey();
		
		var rawMatSearchField = this.byId("rawMatSearchField");
		var rawMatSearchFieldValue = rawMatSearchField.getValue();
		
		var ProductsTable2 = this.getView().byId("ProductsTable2");
		var ProductsTable = this.getView().byId("ProductsTable"),
		
		//mParams = oEvent.getParameters(),
		oBinding = ProductsTable.getBinding("items"),
		aFilters = [];
		
		if (comboBoxFilterKey=="name"){
			var sPath = "prodName";}
		
		if (comboBoxFilterKey=="descrip"){
			var sPath = "prodDescrip";}
			
		if (comboBoxFilterKey=="price"){
			var sPath = "prodPrice";}	


		
		var sOperator = "Contains";
		var sValue1 = rawMatSearchFieldValue;
		var oFilter = new Filter(sPath, sOperator, sValue1);
		
		aFilters.push(oFilter);
		
		// apply filter settings
		oBinding.filter(aFilters);
		
		
		console.log(oBinding.aIndices);
		
		for (var i=0;i<oBinding.aIndices.length;i++){
		
			
		//	console.log(oData[oBinding.aIndices[i]]);
			dataFilterTable2.push(oData[oBinding.aIndices[i]]);
		
		}
		
		console.log(dataFilterTable2);
		
		dataFilterTable2.splice(0,1);
		
		ProductTable2Json.setData(dataFilterTable2);
		ProductsTable2.setModel(ProductTable2Json);
		
		
		
		
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.test
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.test
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.test
*/
//	onExit: function() {
//
//	}


	});
	
});