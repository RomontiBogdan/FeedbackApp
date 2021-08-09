sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
	
], function (Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.MyProfile", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("myprofile").attachPatternMatched(this._onObjectMatched, this);
		},

        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		}

	});
});