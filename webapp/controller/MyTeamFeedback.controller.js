sap.ui.define([
   "./BaseController",
   "../model/formatter",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"
], function (BaseController, formatter, Filter, FilterOperator) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.MyTeamFeedback", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.getRoute("myteam").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         this.getView().bindElement({
            path: "/UserPassSet('" + this.getCurrentUser() + "')"
         });

         this._aFilter = [];
         this._aFilter.push(new Filter({
            filters: [
               new Filter("Manager", FilterOperator.EQ, this.getCurrentUser()),
               
            ],
            and: true,
         }));

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(this._aFilter);
      },

      onNavBack: function () {
         this.navBack();
      },


      onFilterSelect: function (oEvent) {
         var sKey = oEvent.getParameter("key");
         var auxFilter = this._aFilter[0];
         if (sKey === "New") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "0")
         }
         else if (sKey === "Pending") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "1")
         }
         else if (sKey === "Completed") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "2")
         }
         else if (auxFilter.aFilters.length > 1) {
            auxFilter.aFilters.pop(1);
         }

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      // onPressTeamFeedback: function(oEvent)
      // {
      //    var oItem = oEvent.getSource();
      //    var oBindingObject = oItem.getBindingContext().getObject();
      //    var oRouter = this.getOwnerComponent().getRouter();
      //    oRouter.navTo("feedbackdetails", {
      //       feedbackID: oBindingObject.FeedbackId
      //    });
      // }


     
   });
});