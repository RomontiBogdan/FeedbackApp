sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Main", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("main").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
		

		}

	});
});