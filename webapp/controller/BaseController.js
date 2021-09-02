sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/routing/History",
   "sap/m/MessageBox"
], function (Controller, History, MessageBox) {
   "use strict";
   return Controller.extend("sap.ui.demo.walkthrough.controller.BaseController", {
      onInit: function () {},

      navBack: function () {
         var oHistory = History.getInstance();
         var sPreviousHash = oHistory.getPreviousHash();

         if (sPreviousHash !== undefined) {
            window.history.go(-1);
         } else {
            var oRouter = this.getRouter()
            oRouter.navTo("main", true);
         }
      },

      toMain: function () {
         var oRouter = this.getRouter()
         oRouter.navTo("main", true);
      },

      getRouter: function () {
         return this.getOwnerComponent().getRouter();
      },

      errorText: function (oError) {
         return JSON.parse(oError.responseText).error.message.value
      },

      setGermani18n: function () {
         this.getOwnerComponent().setGermani18n();
      },

      setEnglishi18n: function () {
         this.getOwnerComponent().setEnglishi18n();
      },

      userValidator: function () {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         MessageBox.information(oi18nModel.getText("loginRedirect"), {
            title: "",
            onClose: function (oAction) {
               var oRouter = this.getOwnerComponent().getRouter();
               oRouter.navTo("overview");
            }.bind(this),
         })
      }
   });
});