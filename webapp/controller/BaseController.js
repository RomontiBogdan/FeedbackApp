sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/routing/History"
], function (Controller,
   History) {
   "use strict";
   return Controller.extend("sap.ui.demo.walkthrough.controller.BaseController", {
      navBack: function () {

         var oHistory = History.getInstance();
         var sPreviousHash = oHistory.getPreviousHash();

         if (sPreviousHash !== undefined) {
            window.history.back();

         }
      },

      getRouter: function () {
         // return sap.ui.core.UIComponent.getRouterFor(this);
         var oRouter = this.getOwnerComponent().getRouter();
      },

      getCurrentUser: function () {
         return this.getOwnerComponent().getModel("currentUser").getData();
      },

      getUserCareerLevel: function () {
         return this.getOwnerComponent().getModel("userCareerLevel").getData();
      }

   });
});