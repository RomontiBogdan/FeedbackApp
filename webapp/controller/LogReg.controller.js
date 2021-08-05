sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
      onLogIn : function (oEvent) {
          // read msg from i18n model
          /*var oBundleUsername = this.getView().getModel("i18n").getResourceBundle();
          var sRecipientUsername = this.getView().getModel().getProperty("/recipientUs/nameUs");
          var sMsgUsername = oBundle.getText("helloMsg", [sRecipient]);

          var oBundlePassword = this.getView().getModel("i18n").getResourceBundle();
          var sRecipientPassword = this.getView().getModel().getProperty("/recipientPass/namePass");
          var sMsgPassword = oBundle.getText("helloMsg", [sRecipient]);

          // show message
          MessageToast.show(sMsg);*/

          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("main"); 

       },
       onRegister : function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("register"); 
       },

       onForgotPass : function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("forgotpass"); 
       }
    });
 });