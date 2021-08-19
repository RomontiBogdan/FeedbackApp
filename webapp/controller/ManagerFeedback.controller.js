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


			var sFeedbackId = oEvent.getParameter("arguments").pegID;

			var oDetailPEG = this.getView().byId("Container2");
			oDetailPEG.attachEvent("attachRequestCompleted", this.loadDetails);
			oDetailPEG.bindElement({ path:  "/PegReqSet("+ sFeedbackId + ")" ,
			events: {
				dataReceived: function(oData)
				{
					console.log(oData);
				}
			}
			});
			
			

			  var oUserDetail = this.getView().byId("Container1");
			  oUserDetail.bindElement({ path:  "/UserPassSet('TEST')" });

			

			  var sProjectId  = this.byId("GenericTileProjectId").getSubheader();
			  var oProjectDetail = this.getView().byId("Container3");
			  oProjectDetail.bindElement({ path: " /ProjectDetailsSet('"+ sProjectId +"')" });
			  


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