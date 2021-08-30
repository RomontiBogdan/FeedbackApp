sap.ui.define([
   "./BaseController",
   "sap/m/MessageBox"
], function (BaseController, MessageBox) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.Register", {
      onNavBack: function () {
         this.navBack();
      },

      onCreateRegister: function (oEvent) {
         var params = {
            FullName: "",
            Username: this.getView().byId("UsernameRegisterField").getValue(),
            Email: this.getView().byId("EmailRegisterField").getValue(),
            Password: this.getView().byId("PasswordRegisterField").getValue(),
            PersonalNo: "",
            Su: "",
            CareerLevel: "",
            FiscalYear: ""
         }
         var oModel = this.getOwnerComponent().getModel();

         oModel.create('/UserPassSet', params, {
            success: function (oCreatedEntry) {
               var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
               MessageBox.information(oi18nModel.getText("registerSucces"), {
                  onClose: function (oAction) {
                     if (oAction == "OK") {
                        var oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("overview");
                     }
                  }.bind(this)
               });

            }.bind(this),
            error: function (oError) {
               sap.m.MessageToast.show(this.errorText(oError))
            }.bind(this)
         });
      }
   });
});