sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/ui/model/json/JSONModel'
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.MyProfile", {
		onInit: function () {
			var oData = {
				Levels: [
					{
						Id: "0",
						Name: "Junior Consultant"
					},
					{
						Id: "1",
						Name: "Consultant"

					},
					{
						Id: "2",
						Name: "Senior Consultant"

					},
					{
						Id: "3",
						Name: "Manager"

					},
					{
						Id: "4",
						Name: "Senior Manager"
					},
					{
						Id: "5",
						Name: "Lead Manager"
					}
				]
			};


			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "myProfileModel");

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("myprofile").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			this.sUsername = oEvent.getParameter("arguments").Username;
			this.getView().bindElement({
				path: "/UserPassSet('" + this.sUsername + "')"
			});
		},



		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("main", {Username: this.sUsername}, true);
			}
		},


		onPressSave: function () {
			var oModel = this.getView().getModel();
			oModel.setUseBatch(true);
			oModel.submitChanges({
				success: function (oData) {
					sap.m.MessageToast.show("The information was updated successfully!");
					oModel.setUseBatch(false);
				}
			});
		},

		_setFieldsState: function(state) {
			this.getView().byId("inputName").setEditable(state);
			this.getView().byId("inputEmail").setEditable(state);
			this.getView().byId("inputTel").setEditable(state);
			this.getView().byId("inputSU").setEditable(state);
		},

		onEdit: function (oEvent) {
			this._setFieldsState(oEvent.getParameter("state"))
		}

	});
});