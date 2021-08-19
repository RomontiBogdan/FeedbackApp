sap.ui.define([
	"../controller/BaseController",
    "sap/ui/core/routing/History"
	
], function (BaseController, History) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.ManagerFeedback", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("managerFeedback").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {

		    // var sPegID = oEvent.getParameter("arguments").pegID;
			// this.getView().bindElement({
			// 	path: "/PegReqSet(" + sPegID + ")"
		    // });

			var sProjectId  = this.byId("GenericTileProjectId").getSubheader();
			var sFeedbackId = oEvent.getParameter("arguments").pegID;

			var oDetailPEG = this.getView().byId("Container2");
		
			oDetailPEG.bindElement({ path:  "/PegReqSet("+ sFeedbackId + ")" ,
			events: {
				dataReceived: function(oData)
				{
					console.log(oData);

					var oUserDetail = this.getView().byId("Container1");

					oUserDetail.bindElement({ path:  "/UserPassSet('TEST')" });
	  
				  
					var oProjectDetail = this.getView().byId("Container3");
					var sProjectId  = oData.getParameter("data").ProjectId;
					oProjectDetail.bindElement({ path: "/ProjectDetailsSet('"+ sProjectId +"')" });

				}.bind(this)
			}
			});
			
		
		},


		// onAfterRendering: function()
		// {
		// 	this.getView().byId("Container2");
		// },

		

        onNavBack: function () {
			this.navBack();
		}

	});
});