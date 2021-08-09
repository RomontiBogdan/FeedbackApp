sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
	
], function (Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Main", {
		_onObjectMatched: function (oEvent) {
		
			
		},
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("main").attachPatternMatched(this._onObjectMatched, this);
		}

	});
});