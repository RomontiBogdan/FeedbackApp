sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/ui/model/json/JSONModel'	
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.MyProfile", {
		onInit: function () {

           
            var oData = {
                Levels: [
                    {
                        Id: "0",
                        Name: "Junior Consultant"
                    },
                    {
                        Id: "1",
                        Name: "Consultant"
                        
                    },
                    {
                        Id: "2",
                        Name: "Senior Consultant"
                        
                    },
                    {
                        Id: "3",
                        Name: "Manager"
                        
                    },
                    {
                        Id: "4",
                        Name: "Senior Manager"
                    },
                    {
                        Id: "5",
                        Name: "Lead Manager"
                    }   
                ]
            };

		
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel,"myProfileModel");
            
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("myprofile").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent)
		{

			var sUsername = oEvent.getParameter("arguments").Username;
			this.getView().bindElement({
				path: "/UserPassSet('" + sUsername + "')"
		    });
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


		onPressSave: function()
		{
			var oModel = this.getView().getModel();
			oModel.setUseBatch(true);
			oModel.submitChanges({
				success: function(oData)
				{
					sap.m.MessageToast.show("Update successful");
				    oModel.setUseBatch(false);
				}
			});
		}

	});
});