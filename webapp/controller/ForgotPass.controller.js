sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"

], function (Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.ForgotPass", {
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},

		onPressForgotPass: function () {
			var sUsername = this.getView().byId("usernameTextFP").getValue();
			var sEmail = this.getView().byId("emailTextFP").getValue();
			var sPassword = this.getView().byId("passwordTextFP").getValue();
			var oModel = this.getOwnerComponent().getModel();
			oModel.read("/ForgotPassUserSet(Username='" + sUsername + "',Email='" + sEmail + "')", {
				success: function (oSuccess) {
					oModel.update("/ForgotPassUserSet(Username='" + sUsername + "',Email='" + sEmail + "')", {
						Password: sPassword,
						Username: sUsername
					}, {
						success: function (oUpdateSuccess) {
							sap.m.MessageToast.show("Password changed!")
						}
					})
				},
				error: function (oError) {
					sap.m.MessageToast.show("Username or email invalid!")
				}
			})
		}

	});
});