sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Main", {
		_onObjectMatched: function (oEvent) {
		
			var sUsername = oEvent.getParameter("arguments").Username;
			var sPassword = oEvent.getParameter("arguments").Password;

			this.getView().bindElement({
				path: "/UserSet(Username='"+sUsername+"',Password='"+sPassword+"')"
				
			});

			//this.getView().byId("panelSuppliers").bindElement("/SuppSet('"+sProductId+"')");

		},
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("main").attachPatternMatched(this._onObjectMatched, this);
		}

	});
});