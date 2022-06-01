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

	
	
	
	return Controller.extend("prismalunar.controller.test4", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.test4
*/
	onInit: function() {

	},
	
	handleNaveButtonBack : function(){
		
		
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("test3");
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.test4
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.test4
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.test4
*/
//	onExit: function() {
//
//	}
	});
});