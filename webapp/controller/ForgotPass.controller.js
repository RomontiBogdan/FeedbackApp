sap.ui.define([
   "../controller/BaseController",
   "sap/ui/core/routing/History"

], function (BaseController, History) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.ForgotPass", {
      onNavBack: function () {
         this.navBack();
      },

      onPressForgotPass: function () {
         var oView = this.getView();
         var sUsername = oView.byId("usernameTextFP").getValue();
         var sEmail = oView.byId("emailTextFP").getValue();
         var sPassword = oView.byId("passwordTextFP").getValue();
         var oModel = this.getOwnerComponent().getModel();
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         oModel.read("/ForgotPassUserSet(Username='" + sUsername + "',Email='" + sEmail + "')", {
            success: function (oSuccess) {
               oModel.update("/ForgotPassUserSet(Username='" + sUsername + "',Email='" + sEmail + "')", {
                  Password: sPassword,
                  Username: sUsername
               }, {
                  success: function (oUpdateSuccess) {
                     sap.m.MessageToast.show(oi18nModel.getText("passChanged"))
                  }
               })
            },
            error: function (oError) {
               sap.m.MessageToast.show(oi18nModel.getText("invalidUserEmail"))
            }
         })
      }

   });
});