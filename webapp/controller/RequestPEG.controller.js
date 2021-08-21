sap.ui.define([
	"../controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.RequestPEG", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("requestpeg").attachPatternMatched(this._onObjectMatched, this);
		},

		onNavBack: function () {
			this.navBack();
		},

		_onObjectMatched: function (oEvent) {
			var sUsername = this.getView().getModel("currentUser").getData();
			this.getView().bindElement({
				path: "/UserPassSet('" + sUsername + "')"
			});
		},


		onProjectChange: function (oEvent) {
			var SelectedItem = this.byId("inputProjectName").getSelectedItem().getKey();
			this.getView().byId("inputManager").bindElement({
				path: "/UserProjectsSet(Username='',ProjectId='" + SelectedItem + "')"
			});
		}
	});
});