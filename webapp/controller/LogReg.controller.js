sap.ui.define([
   "./BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.LogReg", {
      onLogIn: function (oEvent) {
         var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         var oModel = this.getOwnerComponent().getModel();
         var sUsername = this.getView().byId("UsernameField");
         var sPassword = this.getView().byId("PasswordField");

         oModel.read("/UsersSet(Username='" + sUsername.getValue() + "',Password='" + sPassword.getValue() + "')", {
            success: function (oRetrievedResult) {
               sUsername.setValueState("Success");
               sPassword.setValueState("Success");

               this.getOwnerComponent().getModel("currentUser").setData(sUsername.getValue());

               oRouter.navTo("main", {
                  Username: sUsername.getValue()
               });
            }.bind(this),

            error: function (oError) {
               sUsername.setValueState("Error");
               sPassword.setValueState("Error");
               sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value)
            }
         });
      },
      onRegister: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("register");
      },

      onForgotPass: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("forgotpass");
      }
   });
});