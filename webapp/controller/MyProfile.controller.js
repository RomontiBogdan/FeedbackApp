sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/ui/model/json/JSONModel'	
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.MyProfile", {
		onInit: function () {
           
            var oData = {
				"SelectedProduct": "HT-1001",
				"ProductCollection": [
					{
						//"ProductId": "HT-1001",
						"Name": "Junior Consultant",
						
					},
					{
						//"ProductId": "HT-1002",
						"Name": "Consultant",
						
					},
					{
						//"ProductId": "HT-1003",
						"Name": "Senior Consultant",
						
					},
					{
						//"ProductId": "HT-1007",
						"Name": "Manager",
						
					},
					{
						//"ProductId": "HT-1010",
						"Name": "Senior Manager",
						
					}
						
				]
			};

			// set explored app's demo model on this sample
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
            
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("myprofile").attachPatternMatched(this._onObjectMatched, this);
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
		}

	});
});