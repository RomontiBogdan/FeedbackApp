sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.LogReg", {
      onInit: function ()
      {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("overview").attachPatternMatched(this._onObjectMatched, this);

      },
      
      _onObjectMatched: function (oEvent) {
       
      },
      onLogIn : function (oEvent) {

          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

      var oModel = this.getOwnerComponent().getModel();
			var sUsername = this.getView().byId("UsernameField").getValue();
			var sPassword = this.getView().byId("PasswordField").getValue();

			oModel.read("/UsersSet(Username='"+sUsername+"',Password='"+sPassword+"')", {
                success: function(oRetrievedResult) { 
                 
                  oRouter.navTo("main", {
                    Username: sUsername
                  }); 
                  }.bind(this),
                  error: function(oError) { 
                    
					            sap.m.MessageToast.show("Login failed")
                }
              });
       },
       onRegister : function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("register"); 
       },

       onForgotPass : function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("forgotpass"); 
       }
    });
 });