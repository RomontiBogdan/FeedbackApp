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
         var oRouter = this.getRouter();
         oRouter.getRoute("feedbacklist").attachPatternMatched(this._onObjectMatched, this);
      },

      // Checks if user is connected on this view
      // otherwise: redirects him to the login page
      _onObjectMatched: function (oEvent) {
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         } else {
            // Model for anonymous usage
            var sUsername = sessionStorage.getItem("username");
            var oModel = new JSONModel({
               currentUser: sUsername
            });
            this.getView().setModel(oModel, "AnonymousModel");

            this.getView().bindElement({
               path: "/UserPassSet('" + sUsername + "')"
            });

            // Build filter array
            this._sFilter = [];
            this._sFilter.push(new Filter({
               filters: [
                  new Filter("ToUser", FilterOperator.EQ, sUsername),
                  new Filter("FromUser", FilterOperator.EQ, sUsername),
               ],
               and: true,
            }));
            // Filter binding
            var oList = this.byId("feedbackTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(this._sFilter);

            this.byId("feedbackTable").getModel().updateBindings(true);
         }
      },

      // Event handler function that ensures navigation
      onFeedbackPress: function (oEvent) {
         var oItem = oEvent.getSource();
         var oBindingObject = oItem.getBindingContext().getObject();
         var oRouter = this.getRouter();
         oRouter.navTo("feedbackdetails", {
            feedbackID: oBindingObject.FeedbackId
         });
      },

      // Navigate to new feedback view
      onNewFeedback: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("newfeedback");
      },

      // Filter function for icon tab bars 
      onFilterSelect: function (oEvent) {
         var sKey = oEvent.getParameter("key");
         // Build filter array
         var aFilter = [];
         
         if (sKey === "Sent" || sKey === "All") {
            aFilter.push(new Filter("FromUser", FilterOperator.EQ, sessionStorage.getItem("username")))
         }
        
         if (sKey === "Received" || sKey === "All") {
            aFilter.push(new Filter("ToUser", FilterOperator.EQ, sessionStorage.getItem("username")))
         }
         // Filter binding
         var oList = this.byId("feedbackTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(aFilter);
      }
   });
});