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
                Name : "REUser1",
				Project : "Project1",
				FeedbackType : "da",
				Status : true
            },
			{
                Name : "REUser2",
				Project : "Project2",
				FeedbackType : "nu",
				Status : false
            },
			{
                Name : "REManager3",
				Project : "Project2",
				FeedbackType : "ds",
				Status : true
            },
			{
                Name : "REUser4",
				Project : "Project4",
				FeedbackType : "sa",
				Status : false
            },
			{
                Name : "REManager5",
				Project : "Project4",
				FeedbackType : "as",
				Status : false
            }]);

			var oViewModel2 = new JSONModel([{
                Name : "SEUser1",
				Project : "Project1",
				FeedbackType : "da",
				Status : true
            },
			{
                Name : "SEUser2",
				Project : "Project2",
				FeedbackType : "nu",
				Status : false
            },
			{
                Name : "SEManager3",
				Project : "Project2",
				FeedbackType : "ds",
				Status : true
            },
			{
                Name : "SEUser4",
				Project : "Project4",
				FeedbackType : "sa",
				Status : false
            },
			{
                Name : "SEManager5",
				Project : "Project4",
				FeedbackType : "as",
				Status : false
            }]);
            this.getView().setModel(oViewModel, "received");
			this.getView().setModel(oViewModel2, "sent");
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
			
			if(this.getView().byId("PendingSwitch").getState())
			{
				aFilter.push(new Filter({
					filters: [
					new Filter("Status", FilterOperator.EQ, false),
					new Filter("Name", FilterOperator.Contains, sQuery),
					],
					and: true,
				}));
			}
			else
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));

			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPendingFilter: function(oEvent)
        {
			var aFilter = [];
			var sInput = this.getView().byId("sfInput").getValue()
            if (oEvent.getParameter("state")==true)
            {
				aFilter.push(new Filter({
					filters: [
					new Filter("Status", FilterOperator.EQ, false),
					new Filter("Name", FilterOperator.Contains, sInput),
					],
					and: true,
				}));
            }
            else
            {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sInput));
			}
			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
        }



	});
});