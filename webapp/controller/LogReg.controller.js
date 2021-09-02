sap.ui.define([
   "./BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.LogReg", {
      
      //
      onLogIn: function (oEvent) {
         var oRouter = this.getRouter();
         var oModel = this.getOwnerComponent().getModel();
         var oView = this.getView();
         var sUsername = oView.byId("UsernameField");
         var sPassword = oView.byId("PasswordField");

         oModel.read("/UsersSet(Username='" + sUsername.getValue() + "',Password='" + sPassword.getValue() + "')", {
            success: function (oRetrievedResult) {
               sUsername.setValueState("Success");
               sPassword.setValueState("Success");

               sessionStorage.setItem("username", sUsername.getValue());

               oRouter.navTo("main");
            }.bind(this),

            error: function (oError) {
               sUsername.setValueState("Error");
               sPassword.setValueState("Error");
               sap.m.MessageToast.show(this.errorText(oError))
            }
         });
      },

      //navigation to Register page
      onRegister: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("register");
      },

      //navigation to Forgot Password page
      onForgotPass: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("forgotpass");
      }
   });
});