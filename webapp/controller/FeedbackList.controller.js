sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function (BaseController, formatter, Filter, FilterOperator) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.FeedbackList", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("feedbacklist").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			this._sUsername = this.getView().getModel("currentUser").getData();
			this.getView().bindElement({
				path: "/UserPassSet('" + this._sUsername + "')"
			});

			this._sFilter = [];
			this._sFilter.push(new Filter({
				filters: [
					new Filter("ToUser", FilterOperator.EQ, this._sUsername),
					new Filter("FromUser", FilterOperator.EQ, this._sUsername),
				],
				and: true,
			}));

			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(this._sFilter);
		},

		onNavBack: function () {
			this.navBack();
		},

		onFeedbackPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oBindingObject = oItem.getBindingContext().getObject();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("feedbackdetails", {
				feedbackID: oBindingObject.FeedbackId
			});
		},

		onNewFeedback: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("newfeedback");
		},

		onFilterSelect: function (oEvent) {
			var sKey = oEvent.getParameter("key");
			var aFilter = [];
			if (sKey === "Sent" || sKey === "All") {
				aFilter.push(new Filter("FromUser", FilterOperator.EQ, this._sUsername))
			}
			if (sKey === "Received" || sKey === "All") {
				aFilter.push(new Filter("ToUser", FilterOperator.EQ, this._sUsername))
			}
			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});