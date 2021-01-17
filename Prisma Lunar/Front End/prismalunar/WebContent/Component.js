sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"prismalunar/model/models"
], function (UIComponent, Device, models) {
	
	
	
	
	"use strict";

	return UIComponent.extend("prismalunar.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			var oRouter = this.getRouter();
			if (oRouter) {
				oRouter.initialize();
			}

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	}
	
	
	
	
	);





});