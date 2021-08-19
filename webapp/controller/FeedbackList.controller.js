sap.ui.define([
	"../controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function (BaseController, History, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.FeedbackList", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("feedbacklist").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			this.sUsername = oEvent.getParameter("arguments").Username;
			this.getView().bindElement({
				path: "/UserPassSet('" + this.sUsername + "')"
			});

			this.sFilter = [];
			this.sFilter.push(new Filter({
				filters: [
					new Filter("ToUser", FilterOperator.EQ, this.sUsername),
					new Filter("FromUser", FilterOperator.EQ, this.sUsername),
				],
				and: true,
			}));

			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(this.sFilter);
		},

		onNavBack: function () {
			this.navBack();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("main", { Username: this.sUsername }, true);

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
			oRouter.navTo("newfeedback", {
				Username: this.sUsername
			});
		},

		onFilterSelect: function (oEvent) {
			var sKey = oEvent.getParameter("key");
			var aFilter = [];
			if (sKey === "Sent" || sKey === "All") {
				aFilter.push(new Filter("FromUser", FilterOperator.EQ, this.sUsername))
			}
			if (sKey === "Received" || sKey === "All") {
				aFilter.push(new Filter("ToUser", FilterOperator.EQ, this.sUsername))
			}
			var oList = this.byId("feedbackTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});