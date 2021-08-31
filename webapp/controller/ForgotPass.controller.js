sap.ui.define([
   "../controller/BaseController",
   "sap/ui/core/routing/History",
   "sap/m/MessageBox"

], function (BaseController, History, MessageBox) {
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


         var params = {
            Username: this.getView().byId("usernameTextFP").getValue(),
            Email: this.getView().byId("emailTextFP").getValue(),
            Password: this.getView().byId("passwordTextFP").getValue()
         }
         
         var sExceptions = this._validateData(params);
         if (sExceptions !== "") {
            MessageBox.error(sExceptions)
         }
         else {
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
      },
   

      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var sExceptions = ""
         if (oParams.Username === "") {
            sExceptions += oi18nModel.getText("introduceUsernamePassRecovery")
         }
         

         if (oParams.Email === "") {
            sExceptions += oi18nModel.getText("introduceEmailPassRecovery")
         }

         if (oParams.Password === "") {
            sExceptions += oi18nModel.getText("introducePassword")
         }
         
         return sExceptions

      }

   });
});