sap.ui.define([
   "./BaseController",
   "../model/formatter",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
   "sap/ui/model/json/JSONModel"
], function (BaseController, formatter, Filter, FilterOperator, JSONModel) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.FeedbackList", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.getRoute("feedbacklist").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         // Model for anonymous usage
         var oModel = new JSONModel({currentUser: this.getCurrentUser()});
         this.getView().setModel(oModel, "AnonymousModel");

         this.getView().bindElement({
            path: "/UserPassSet('" + this.getCurrentUser() + "')"
         });

         this._sFilter = [];
         this._sFilter.push(new Filter({
            filters: [
               new Filter("ToUser", FilterOperator.EQ, this.getCurrentUser()),
               new Filter("FromUser", FilterOperator.EQ, this.getCurrentUser()),
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
            aFilter.push(new Filter("FromUser", FilterOperator.EQ, this.getCurrentUser()))
         }
         if (sKey === "Received" || sKey === "All") {
            aFilter.push(new Filter("ToUser", FilterOperator.EQ, this.getCurrentUser()))
         }
         var oList = this.byId("feedbackTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(aFilter);
      }
   });
});