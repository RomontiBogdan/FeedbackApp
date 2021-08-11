sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	
], function (Controller, History, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.DisplayPEGList", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("displaypeglist").attachPatternMatched(this._onObjectMatched, this);

			var oViewModel = new JSONModel([{
                Project  : "Project1",
                Manager : "Manager1",
                Status : true
               
            },{
				Project  : "Project2",
                Manager : "Manager2",
                Status : false
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

		
		onPEGPress: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("userPEGs");
		},

		onNewRequest: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("requestpeg");
		},

		onFilterProject : function (oEvent) {

			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Project", FilterOperator.Contains, sQuery));
			}

			var oList = this.byId("pegTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}

	});
});