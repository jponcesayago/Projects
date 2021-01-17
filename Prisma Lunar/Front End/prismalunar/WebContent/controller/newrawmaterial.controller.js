


var rawMatId = 0;


var rawMaterialDataArray =	[];

var firstLoadData=true;


sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox',
	"sap/ui/unified/DateTypeRange",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat"
], function(Controller, JSONModel,MessageBox,DateTypeRange, MessageToast, DateFormat) {
	"use strict";

	
	
	
	return Controller.extend("prismalunar.controller.newrawmaterial", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf prismalunar.newrawmaterial
*/
	onInit: function() {
		
		jQuery.sap.require("jquery.sap.storage");
	  	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	  	
	  	//var rawMaterialData = new sap.ui.model.json.JSONModel(); 
	  	
	  	rawMaterialDataArray = oStorage.get("rawmaterial");
	  	
	  	if (rawMaterialDataArray!=null) { rawMatId =  rawMaterialDataArray[rawMaterialDataArray.length-1].matId; }
	  	
	  	console.log(rawMaterialDataArray);
	  	
	  	
	  	if (rawMaterialDataArray==null){
	  		
	  		
	  		 
	  			
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
		    //rawMaterialModel.setData(oData);
		
		
		console.log(rawMaterialDataArray);
		 
	
		
		var priceUnitRawMat = this.byId("priceUnitRawMat");
		
		priceUnitRawMat.setValue(0);
		
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
		
		
		
		
	},
	
	handleNewRawMatNavButton : function(){
		
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("homePage");
		
	},
	
	handleValSaveNewRawMatButton : function(){
		
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
				
				
				rawMaterialDataArray.push(
						
						{	matId: rawMatId,
							name :nameRawMatStore, 
							descrip:descRawMatStore,
							unit: unitRawMat,
							price:priceTotalRawMatStore, 
							quantity : quantTotalRawMatStore,
							priceUnitMt : priceUnitRawMatStore
						});
				
				
				
				if (firstLoadData==true){
			  		
			  		firstLoadData=false;
			  		
			  		rawMaterialDataArray.splice(0,1); 
			  		
			  	}

				console.log(rawMaterialDataArray);
				
				
				
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
		
		
		
	}
	
	
	,
	
	
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
				
				
				priceUnitRawMatLabel.setText("Precio/cantidad: ");
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
		
		priceUnitRawMat.setValue(priceTotalRawMat.getValue()/quantTotalRawMat.getValue());
		
		
	}
	
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf prismalunar.newrawmaterial
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf prismalunar.newrawmaterial
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf prismalunar.newrawmaterial
*/
//	onExit: function() {
//
//	}

	});
	
});