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
         var oRouter = this.getRouter();
         oRouter.getRoute("peglist").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         // Checks if user is connected on this view
         // otherwise: redirects him to the login page
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
            
         } else {
            this.getView().bindElement({
               path: "/UserPassSet('" + sessionStorage.getItem("username") + "')"
            });

            // Create filter array
            this._aFilter = [];

            // Fill the index 0 and 1 of the array with 2 filters based on "To User" and "From User" 
            this._aFilter.push(new Filter({
               filters: [
                  new Filter("ToUser", FilterOperator.EQ, sessionStorage.getItem("username")),
                  new Filter("FromUser", FilterOperator.EQ, sessionStorage.getItem("username")),
               ],
               and: true
            }));

            // Filter binding
            var oList = this.byId("PegTableManager");
            var oBinding = oList.getBinding("items");
            oBinding.filter(this._aFilter);

            // Make PEG Request button functionality invisible for team leaders
            if (sessionStorage.getItem("careerLevel") === "5") {
               this.getView().byId("newPegRequest").setVisible(false);
            } else {
               this.getView().byId("newPegRequest").setVisible(true);
            }

            this.byId("PegTableManager").getModel().updateBindings(true);
         }
      },

      // Filter function for icon tab bars 
      onFilterSelect: function (oEvent) {

         // sKey stores the value of the icon tab bar
         var sKey = oEvent.getParameter("key");

         // Initialize an auxiliar filter with the previous declared filter array
         var auxFilter = this._aFilter[0];
         
         // Fill the index 2 of the array with a filter based on status 
         if (sKey === "New") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "0")
         } else if (sKey === "Pending") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "1")
         } else if (sKey === "Completed") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "2")
         } else if (auxFilter.aFilters.length > 2) {
            auxFilter.aFilters.pop(2);
         }

         // Filter binding
         var oList = this.byId("PegTableManager");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      // Navigate to edit PEG page with feedback id attached to the navigation route
      onPegPress: function (oEvent) {
         var oItem = oEvent.getSource();
         var oBindingObject = oItem.getBindingContext().getObject();
         var oRouter = this.getRouter();
         oRouter.navTo("editpeg", {
            pegID: oBindingObject.FeedbackId
         });
      },

      // Navigate to PEG request view
      onNewRequest: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("requestpeg");
      }
   });
});