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
         
         var exceptions = this._validateData(params);
         if (exceptions !== "") {
            MessageBox.error(exceptions)
         }
         else {
         var oModel = this.getOwnerComponent().getModel();
         oModel.read("/ForgotPassUserSet(Username='" + sUsername + "',Email='" + sEmail + "')", {
            success: function (oSuccess) {
               oModel.update("/ForgotPassUserSet(Username='" + sUsername + "',Email='" + sEmail + "')", {
                  Password: sPassword,
                  Username: sUsername
               }, {
                  success: function (oUpdateSuccess) {
                     sap.m.MessageToast.show("Password changed!")
                  }
               })
            },
            error: function (oError) {
               sap.m.MessageToast.show("Username or email invalid!")
            }
         })

      }
      },
   

      _validateData: function (oParams) {
         var exceptions = ""
         if (oParams.Username === "") {
            exceptions += "You have to enter your username for password recovery!\n"
         }
         

         if (oParams.Email === "") {
            exceptions += "You have to enter your e-mail for password recovery!\n"
         }

         if (oParams.Password === "") {
            exceptions += "You have to enter a new password!\n"
         }
         
         return exceptions

      }

   });
});