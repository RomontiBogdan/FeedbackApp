sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
	
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.DisplayPEGList", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("displaypeglist").attachPatternMatched(this._onObjectMatched, this);

			var oViewModel = new JSONModel([{
                Project  : "Project1",
                Manager : "Manager1",
                Status : "completed",
               
            },{
				Project  : "Project2",
                Manager : "Manager2",
                Status : "pending",
            }]);

			this.getView().setModel(oViewModel, "displayList");
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

		
		onPress: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("userPEGs");
		},

		onNewRequest: function (oEvenet) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("requestpeg");
		},



	});
});