sap.ui.define([
   "./BaseController",
   "sap/m/MessageBox"
], function (BaseController, MessageBox) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.Register", {
      onNavBack: function () {
         this.navBack();
      },

      _validateData: function (oParams) {
         var exceptions = ""
         if (oParams.Username === "") {
            exceptions += "Please introduce a username!\n"
         }
         if (oParams.Password === "") {
            exceptions += "Please introduce a password!\n"
         }

         if (oParams.Email === "") {
            exceptions += "Please introduce an email!\n"
         }
         
         return exceptions
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

         var exceptions = this._validateData(params);
         if (exceptions !== "") {
            MessageBox.error(exceptions)
         }
         else {
         var oModel = this.getOwnerComponent().getModel();

         oModel.create('/UserPassSet', params, {
            success: function (oCreatedEntry) {
               MessageBox.information("You have successfully registered!", {
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

   }




   });
});