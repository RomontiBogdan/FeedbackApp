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
         return this.getOwnerComponent().getRouter();
      },

      getCurrentUser: function () {
         return this.getView().getModel("currentUser").getData();
      },

      errorText: function () {
         return JSON.parse(oError.responseText).error.message.value
      }
   });
});