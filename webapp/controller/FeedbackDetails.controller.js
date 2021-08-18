sap.ui.define([
	"../controller/BaseController",
    "sap/ui/core/routing/History",
	"../model/formatter"
	
], function (BaseController, History, formatter) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.FeedbackDetails", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("feedbackdetails").attachPatternMatched(this._onObjectMatched, this);
		},

        onNavBack: function () {
			this.navBack();
		},

		_onObjectMatched: function (oEvent) {

		    var sFeedbackID = oEvent.getParameter("arguments").feedbackID;
			this.getView().bindElement({
				path: "/Feedback360Set(" + sFeedbackID + ")"
		    });
		}

	});
});