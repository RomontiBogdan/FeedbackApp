sap.ui.define([
   "./BaseController",
   "../model/formatter",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"
], function (BaseController, formatter, Filter, FilterOperator) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.PEGList", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.getRoute("peglist").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         this.getView().bindElement({
            path: "/UserPassSet('" + this.getCurrentUser() + "')"
         });

         this._aFilter = [];
         this._aFilter.push(new Filter({
            filters: [
               new Filter("ToUser", FilterOperator.EQ, this.getCurrentUser()),
               new Filter("FromUser", FilterOperator.EQ, this.getCurrentUser()),
            ],
            and: true,
         }));

         var oList = this.byId("PegTableManager");
         var oBinding = oList.getBinding("items");
         oBinding.filter(this._aFilter);
      },

      onNavBack: function () {
         this.navBack();
      },

      // onPress: function (oEvent) {
      //    var oRouter = this.getOwnerComponent().getRouter();
      //    oRouter.navTo("managerFeedback");
      // },

      onFilterEmployee: function (oEvent) {
         var aFilter = [];
         var sQuery = oEvent.getParameter("query");

         if (this.getView().byId("PendingSwitch").getState()) {
            aFilter.push(new Filter({
               filters: [
                  new Filter("Status", FilterOperator.EQ, false),
                  new Filter("Employee", FilterOperator.Contains, sQuery),
               ],
               and: true,
            }));
         }
         else
            aFilter.push(new Filter("Employee", FilterOperator.Contains, sQuery));

         var oList = this.byId("PegTableManager");
         var oBinding = oList.getBinding("items");
         oBinding.filter(aFilter);
      },

      onPendingFilter: function (oEvent) {
         var aFilter = [];
         var sInput = this.getView().byId("sfInput").getValue()
         if (oEvent.getParameter("state") == true) {
            aFilter.push(new Filter({
               filters: [
                  new Filter("Status", FilterOperator.EQ, false),
                  new Filter("Employee", FilterOperator.Contains, sInput),
               ],
               and: true,
            }));
         }
         else {
            aFilter.push(new Filter("Employee", FilterOperator.Contains, sInput));
         }
         var oList = this.byId("PegTableManager");
         var oBinding = oList.getBinding("items");
         oBinding.filter(aFilter);
      },

      onFilterSelect: function (oEvent) {
         var sKey = oEvent.getParameter("key");
         var auxFilter = this._aFilter[0];
         if (sKey === "New") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "0")
         }
         else if (sKey === "Pending") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "1")
         }
         else if (sKey === "Completed") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "2")
         }
         else if (auxFilter.aFilters.length > 2) {
            auxFilter.aFilters.pop(2);
         }

         var oList = this.byId("PegTableManager");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },




      onPegPress: function (oEvent) {
         var oItem = oEvent.getSource();
         var oBindingObject = oItem.getBindingContext().getObject();
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("managerFeedback", {
            pegID: oBindingObject.FeedbackId
         });
      },

      onNewRequest: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         this.getView().getModel().read("/")
         oRouter.navTo("requestpeg");
      },
   });
});