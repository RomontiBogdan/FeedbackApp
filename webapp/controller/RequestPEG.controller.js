sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
	'sap/ui/model/json/JSONModel'	
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.RequestPEG", {
		onInit: function () 
		{

			var oData = {
                Projects: [
                    {
                        Id: "0",
                        Name: "Project 1"
                    },
                    {
                        Id: "1",
                        Name: "Project 2"
                        
                    },
                    {
                        Id: "2",
                        Name: "Project 3"
                        
                    },
                    {
                        Id: "3",
                        Name: "Project 4"
                        
                    },
                    {
                        Id: "4",
                        Name: "Project 5"
                    } 
                ]

            };

			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel,"RequestPEGModel");
            
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("requestpeg").attachPatternMatched(this._onObjectMatched, this);
	
		},

        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("displaypeglist", {}, true);
			}
		},

		_onObjectMatched: function(oEvent)
		{

			var sUsername = oEvent.getParameter("arguments").Username;
			this.getView().bindElement({
				path: "/UserPassSet('" + sUsername + "')"
		    });
		}

	});
});