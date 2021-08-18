sap.ui.define([
	"../controller/BaseController",
    "sap/ui/core/routing/History",
	'sap/ui/model/json/JSONModel'	
], function (BaseController, History, JSONModel) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.RequestPEG", {
		onInit: function () 
		{
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("requestpeg").attachPatternMatched(this._onObjectMatched, this);
	
		},

        onNavBack: function () {
			this.navBack();
		},

		_onObjectMatched: function(oEvent)
		{

			var sUsername = oEvent.getParameter("arguments").Username;
			this.getView().bindElement({
				path: "/UserPassSet('" + sUsername + "')"
		    });
		},


		onProjectChange: function(oEvent)
		{
			var SelectedItem = this.byId("input-5").getSelectedItem().getText();
			this.getView().bindElement({
				path: "/UserProjectsSet(Username='',ProjectId='" + SelectedItem + "')"
			  });
		}

	});
});