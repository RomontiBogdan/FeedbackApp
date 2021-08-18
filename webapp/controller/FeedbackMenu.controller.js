sap.ui.define([
	"../controller/BaseController",
    "sap/ui/core/routing/History"
	
], function (BaseController, History) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.FeedbackMenu", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("feedbackmenu").attachPatternMatched(this._onObjectMatched, this);
		},

        onNavBack: function () {
			this.navBack();
		},

	});
});