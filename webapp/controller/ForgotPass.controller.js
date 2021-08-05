sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.ForgotPass", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("forgotpass").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
		

		}

	});
});