sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
	
], function (Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Main", {
		_onObjectMatched: function (oEvent) {
			var oModel = this.getOwnerComponent().getModel();
			var sUsername = oEvent.getParameter("arguments").Username;
			var sPassword = oEvent.getParameter("arguments").Password;

			oModel.read("/UsersSet(Username='"+sUsername+"',Password='"+sPassword+"')", {
                success: function(oRetrievedResult) { console.log("yes") },
                error: function(oError) { 
                    var oHistory = History.getInstance();
                    var sPreviousHash = oHistory.getPreviousHash();
 
                    if (sPreviousHash !== undefined) {
                        window.history.go(-1);
                    } else {
                        var oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("overview", {}, true);
                    }
                    console.log(oError.message)
					sap.m.MessageToast.show("Login failed")
                }.bind(this)
              });

			/*this.getView().bindElement({
				path: "/UsersSet(Username='"+sUsername+"',Password='"+sPassword+"')"
				
			});*/

			//this.getView().byId("panelSuppliers").bindElement("/SuppSet('"+sProductId+"')");

		},
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("main").attachPatternMatched(this._onObjectMatched, this);
		}

	});
});