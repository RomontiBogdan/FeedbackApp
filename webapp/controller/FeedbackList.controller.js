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
            },
			{
                Name : "User2",
				Project : "Project2",
				FeedbackType : "nu",
				Status : false
            },
			{
                Name : "Manager3",
				Project : "Project2",
				FeedbackType : "ds",
				Status : true
            },
			{
                Name : "User4",
				Project : "Project4",
				FeedbackType : "sa",
				Status : false
            },
			{
                Name : "Manager5",
				Project : "Project4",
				FeedbackType : "as",
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
			var ovar = this.byId("pendingswitch").getBinding("state");
			if (sQuery) {
				
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
				// if(this.getView().getModel('pendingswitch').getProperty("state")==false)this.byId("pendingswitch").getParameter("state")
				// {
					// aFilter.push(new Filter({
					// 	filters: [
					// 	new Filter("Status", FilterOperator.EQ, false),
					// 	new Filter("Name", FilterOperator.Contains, sQuery),
					// 	],
					// 	and: true,
					// }));
				// }
				// else
				// 	aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPendingFilter: function(oEvent)
        {
            if (oEvent.getParameter("state")==true)
            {
				var aFilter = [];
				aFilter.push(new Filter({
					filters: [
					  new Filter("Status", FilterOperator.EQ, false),
					  new Filter("Name", FilterOperator.Contains, "user"),
					],
					and: true,
				  }));						//("Status", FilterOperator.EQ, false));
				
				var oList = this.byId("feedbackTable");
				var oBinding = oList.getBinding("items");
				oBinding.filter(aFilter);
            }
            else
            {
				var aFilter = [];

				var oList = this.byId("feedbackTable");
				var oBinding = oList.getBinding("items");
				oBinding.filter(aFilter);
			}
        }



	});
});