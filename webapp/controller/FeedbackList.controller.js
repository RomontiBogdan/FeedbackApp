sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	 "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	
], function (Controller, History, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.FeedbackList", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("feedbacklist").attachPatternMatched(this._onObjectMatched, this);
			var oViewModel = new JSONModel([{
                Name : "User1",
				Project : "Project1",
				FeedbackType : "da",
				Status : true
            },{
                Name : "User2",
				Project : "Project2",
				FeedbackType : "nu",
				Status : false
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

		onFeedbackPress: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("feedbackdetails");
		},

		onNewFeedback: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("newfeedback");
		},

		onFilterName : function (oEvent) {

			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}



	});
});