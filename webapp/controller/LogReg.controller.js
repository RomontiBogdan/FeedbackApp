sap.ui.define([
   "./BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.LogReg", {

      // Ensures user authentication
      onLogIn: function (oEvent) {
         var oRouter = this.getRouter();
         var oModel = this.getOwnerComponent().getModel();
         var oView = this.getView();
         var sUsername = oView.byId("UsernameField");
         var sPassword = oView.byId("PasswordField");

         // If authentication is done successfully, user is redirected to the main menu page
         oModel.read("/UsersSet(Username='" + sUsername.getValue() + "',Password='" + sPassword.getValue() + "')", {
            success: function (oRetrievedResult) {
               sUsername.setValueState("Success");
               sPassword.setValueState("Success");

               sessionStorage.setItem("username", sUsername.getValue());

               oRouter.navTo("main");
            }.bind(this),

            // If authentication fails, an error message is didplayed in a pop-up
            error: function (oError) {
               sUsername.setValueState("Error");
               sPassword.setValueState("Error");
               sap.m.MessageToast.show(this.errorText(oError))
            }
         });
      },

      // Navigation to Register page
      onRegister: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("register");
      },

      // Navigation to Forgot Password page
      onForgotPass: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("forgotpass");
      }
   });
});