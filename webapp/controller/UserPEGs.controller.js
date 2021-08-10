sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
	
], function (Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.UserPEGs", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("userPEGs").attachPatternMatched(this._onObjectMatched, this);
		},

        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("displaypeglist", {}, true);
			}
		}

	});
});