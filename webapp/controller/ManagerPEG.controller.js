sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

	
], function (Controller, History, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.ManagerPEG", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("managerpeg").attachPatternMatched(this._onObjectMatched, this);

			var oViewModel = new JSONModel([{
                Employee  : "Employee1",
                Project : "Project1",
                Status : true
            },
			{
				Employee  : "Employee2",
                Project : "Project2",
				Status : false            
            },
			{
				Employee  : "EmployeeSuper3",
                Project : "Project3",
				Status : false            
            },
			{
				Employee  : "EmployeeSuper2",
                Project : "Project3",
				Status : true            
            },
			{
				Employee  : "Employee5",
                Project : "Project4",
				Status : false            
            }]);

			this.getView().setModel(oViewModel, "employee");

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
			oRouter.navTo("managerFeedback");
		},

		onFilterEmployee : function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			
			if(this.getView().byId("PendingSwitch").getState())
			{
				aFilter.push(new Filter({
					filters: [
					new Filter("Status", FilterOperator.EQ, false),
					new Filter("Employee", FilterOperator.Contains, sQuery),
					],
					and: true,
				}));
			}
			else
				aFilter.push(new Filter("Employee", FilterOperator.Contains, sQuery));

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
					new Filter("Employee", FilterOperator.Contains, sInput),
					],
					and: true,
				}));
            }
            else
            {
				aFilter.push(new Filter("Employee", FilterOperator.Contains, sInput));
			}
			var oList = this.byId("pegTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
        }


	});
});