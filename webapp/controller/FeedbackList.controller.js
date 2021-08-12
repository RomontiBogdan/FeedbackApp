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
		},

		_onObjectMatched: function(oEvent)
		{
			this.sUsername = oEvent.getParameter("arguments").Username;
			this.getView().bindElement({
				path: "/UserPassSet('" + this.sUsername + "')"
		    });

			this.sFilter = []; 
			this.sFilter.push(new Filter({
						filters: [
						new Filter("ToUser", FilterOperator.EQ, this.sUsername),
						new Filter("FromUser", FilterOperator.EQ, this.sUsername),
						],
						and: true,
			}));
			
			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(this.sFilter);

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
        },

		onFilterSelect: function (oEvent) {
			var sKey = oEvent.getParameter("key");
			var aFilter = [];
			if (sKey === "Sent")
			{	
				aFilter.push(new Filter("FromUser", FilterOperator.EQ, this.sUsername))
			}
			else if (sKey === "Received")
			{	
				aFilter.push(new Filter("ToUser", FilterOperator.EQ, this.sUsername))
			}

			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);

		}

	});
});