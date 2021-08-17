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

		_onObjectMatched: function(oEvent)
		{
			this.sUsername = oEvent.getParameter("arguments").Username;
			this.getView().bindElement({
				path: "/UserPassSet('" + this.sUsername + "')"
		    });

			this.aFilter = [];
			this.aFilter.push(new Filter({
				filters: [
					new Filter("ToUser", FilterOperator.EQ, this.sUsername),
					new Filter("FromUser", FilterOperator.EQ, this.sUsername),
				],
				and: true,
			}));

			var oList = this.byId("pegTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(this.aFilter);
		},

        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("main", {Username: this.sUsername}, true);
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
        },

		onFilterSelect: function (oEvent) {
			var sKey = oEvent.getParameter("key");
			var auxFilter = this.aFilter[0];
			if (sKey === "Pending")
			{	
				auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, " ")
			}
			else if (sKey === "Completed")
			{	
				auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "X")
			}
			else{
				auxFilter.aFilters.pop(2);
			}

			var oList = this.byId("pegTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(auxFilter);
		},

		onPegPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oBindingObject = oItem.getBindingContext().getObject();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("managerFeedback", {
				pegID: oBindingObject.FeedbackId
			});
		}


	});
});