sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
	
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.FeedbackList", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("feedbacklist").attachPatternMatched(this._onObjectMatched, this);
			var oViewModel = new JSONModel([{
                Name : "User1",
				Project : "Project1",
				FeedbackType : "da",
				Status : "nuok"
            },{
                Name : "User2",
				Project : "Project2",
				FeedbackType : "nu",
				Status : "ok"
            }]);
            this.getView().setModel(oViewModel, "test");
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



	});
});