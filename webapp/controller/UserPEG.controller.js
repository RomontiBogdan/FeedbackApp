
sap.ui.define([
	"../controller/BaseController",
    "sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	
], function (BaseController, History, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.UserPEG", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("userpeg").attachPatternMatched(this._onObjectMatched, this);

			var oViewModel = new JSONModel([{
                Project  : "Project1",
                Manager : "Manager1",
                Status : true
               
            },
			{
				Project  : "Project2",
                Manager : "Manager2",
                Status : false
            },
			{
				Project  : "ProjectSuper2",
                Manager : "Manager4",
                Status : false
            },
			{
				Project  : "ProjectSuper3",
                Manager : "Manager3",
                Status : true
            },
			{
				Project  : "Project4",
                Manager : "Manager5",
                Status : false
            }]);

			this.getView().setModel(oViewModel, "displayList");
		},

		_onObjectMatched: function(oEvent)
		{
			this.sUsername = oEvent.getParameter("arguments").Username;
			this.getView().bindElement({
				path: "/UserPassSet('" + this.sUsername + "')"
		    });
		},

        onNavBack: function () {
			    this.navBack();
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("main", {Username: this.sUsername}, true);
			
		},

		
		onPEGPress: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("userPEGs");
		},

		onNewRequest: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("requestpeg", {Username: this.sUsername});
		},

		onFilterProject : function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			
			if(this.getView().byId("PendingSwitch").getState())
			{
				aFilter.push(new Filter({
					filters: [
					new Filter("Status", FilterOperator.EQ, false),
					new Filter("Project", FilterOperator.Contains, sQuery),
					],
					and: true,
				}));
			}
			else
				aFilter.push(new Filter("Project", FilterOperator.Contains, sQuery));

			var oList = this.byId("pegTable");
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
					new Filter("Project", FilterOperator.Contains, sInput),
					],
					and: true,
				}));
            }
            else
            {
				aFilter.push(new Filter("Project", FilterOperator.Contains, sInput));
			}
			var oList = this.byId("pegTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
        }

	});
});