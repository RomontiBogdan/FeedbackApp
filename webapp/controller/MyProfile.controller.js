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
		},

		onEdit: function(oEvent)
		{
			if (oEvent.getParameter("state")==true)
			{
			this.getView().byId("inputText").setEditable(true);
			this.getView().byId("inputUser").setEditable(true);
			this.getView().byId("inputEmail").setEditable(true);
			this.getView().byId("inputTel").setEditable(true);
			this.getView().byId("inputSU").setEditable(true);
			this.getView().byId("inputLevel").setEditable(true);
			this.getView().byId("inputFiscalYear").setEditable(true);
			}
			

			else
			{
			this.getView().byId("inputText").setEditable(false);
			this.getView().byId("inputUser").setEditable(false);
			this.getView().byId("inputEmail").setEditable(false);
			this.getView().byId("inputTel").setEditable(false);
			this.getView().byId("inputSU").setEditable(false);
			this.getView().byId("inputLevel").setEditable(false);
			this.getView().byId("inputFiscalYear").setEditable(false);
			}
		}

	});
});