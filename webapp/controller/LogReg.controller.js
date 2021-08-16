sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";
  return Controller.extend("sap.ui.demo.walkthrough.controller.LogReg", {
    onInit: function () {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("overview").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {

    },
    onLogIn: function (oEvent) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      var oModel = this.getOwnerComponent().getModel();
      var sUsername = this.getView().byId("UsernameField");
      var sPassword = this.getView().byId("PasswordField");

      oModel.read("/UsersSet(Username='" + sUsername.getValue() + "',Password='" + sPassword.getValue() + "')", {
        success: function (oRetrievedResult) {
          sUsername.setValueState("Success");
          sPassword.setValueState("Success");
          oRouter.navTo("main", {
            Username: sUsername.getValue()
          });
        }.bind(this),

        error: function (oError) {
          sUsername.setValueState("Error");
          sPassword.setValueState("Error");
          sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value)
        }.bind(this)
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