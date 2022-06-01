sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox',
	"sap/ui/unified/DateTypeRange",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat"
], function(Controller, JSONModel,MessageBox,DateTypeRange, MessageToast, DateFormat) {
	"use strict";

	
	
	
	return Controller.extend("prismalunar.controller.homePage", {
		
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf prismalunar.homePage
*/
	onInit: function() {
		
		var newmat = this.byId("newmat");
		var viewmat = this.byId("viewmat");
		var newprod = this.byId("newprod");
		
		
		/*newmat.setVisible(false);
		viewmat.setVisible(false);*/
		

	},
	
	homeMenu: function (oEvent){
		
		
		
	if(oEvent.getParameter("item").mProperties.text=="Materias Primas")
		{	
			var mpri = this.byId("mpri");
			
			//mpri.setExpanded(false);
			
			/*var newmat = this.byId("newmat");
			var viewmat = this.byId("viewmat");
			
			newmat.setVisible(!newmat.getVisible());
			viewmat.setVisible(!viewmat.getVisible());*/
			
		}
	
	
	if(oEvent.getParameter("item").mProperties.text=="Productos")
		{	
			var prod = this.byId("prod");
			
			//mpri.setExpanded(false);
			
			/*var newmat = this.byId("newmat");
			var viewmat = this.byId("viewmat");
			
			newmat.setVisible(!newmat.getVisible());
			viewmat.setVisible(!viewmat.getVisible());*/
			
		}
	
		
	},
	
	
	
	newrawmaterial: function(){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("newrawmaterial");
		
	},
	viewrawmaterialregistry:function(){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("viewrawmaterialregistry");
		
		
	},
	
	newproduct : function(){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("newproduct");
		
		
	},
	
	viewproductsregistry : function(){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("viewproductsregistry");
		
		
	},
	
	handleButtonTest : function(){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("test2");
	},
	
	handleButtonTest2 : function(){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("test3");
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf prismalunar.homePage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf prismalunar.homePage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf prismalunar.homePage
*/
//	onExit: function() {
//
//	}
		
	});

});