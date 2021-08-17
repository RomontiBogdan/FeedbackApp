sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
	
], function (Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.ManagerFeedback", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("managerFeedback").attachPatternMatched(this._onObjectMatched, this);



		},

		_onObjectMatched: function (oEvent) {

		    var sPegID = oEvent.getParameter("arguments").pegID;
			this.getView().bindElement({
				path: "/PegReqSet(" + sPegID + ")"
		    });
		},

        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("managerpeg", {}, true);
			}
		}

	});
});