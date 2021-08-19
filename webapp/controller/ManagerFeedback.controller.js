sap.ui.define([
	"../controller/BaseController",
    "sap/ui/core/routing/History"
	
], function (BaseController, History) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.ManagerFeedback", {
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
			this.navBack();
		}

	});
});