sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"

], function (Controller, History, MessageBox) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Register", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("register").attachPatternMatched(this._onObjectMatched, this);

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
		},

		onCreateRegister: function (oEvent) {

			var params =
			{
				FullName: "",
				Username: this.getView().byId("UsernameRegisterField").getValue(),
				Email: this.getView().byId("EmailRegisterField").getValue(),
				Password: this.getView().byId("PasswordRegisterField").getValue(),
				PersonalNo: "",
				Su: "",
				CareerLevel: "",
				FiscalYear: ""

			}
			var oModel = this.getOwnerComponent().getModel();

			oModel.create('/UserPassSet', params, {
				success: function (oCreatedEntry) {
					MessageBox.information("You have successfully registered!", {
						onClose: function (oAction) {
							if (oAction == "OK") {
								var oRouter = this.getOwnerComponent().getRouter();
								oRouter.navTo("overview");
							}
						}.bind(this)
					});

				}.bind(this),
				error: function (oError) {
					sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value)
				}
			});
		}
	});
});