sap.ui.define([
   "./BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox",
   "sap/ui/model/SimpleType",
   "sap/ui/model/ValidateException",
   "sap/ui/core/Core",
], function (BaseController, JSONModel, MessageBox, SimpleType, ValidateException, Core) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.Register", {
      onInit: function () {
         var oView = this.getView(),
            oMM = Core.getMessageManager();

         oView.setModel(new JSONModel({ username: "", password: "", email: "" }));

         // attach handlers for validation errors
         oMM.registerObject(oView.byId("UsernameRegisterField"), true);
         oMM.registerObject(oView.byId("PasswordRegisterField"), true);
         oMM.registerObject(oView.byId("EmailRegisterField"), true);
         
         this.bValidUser = false;
         this.bValidEmail = false;
         this.bValidPassword = false;

         
      },

      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var sExceptions = ""
         if (oParams.Username === "") {
            sExceptions += oi18nModel.getText("introduceUsername");
         }
         else if (!this.bValidUser) {
            sExceptions += oi18nModel.getText("inputInvalidUsername");
         }

         if (oParams.Password === "") {
            sExceptions += oi18nModel.getText("introducePassword");
         }
         else if (!this.bValidPassword) {
            sExceptions += oi18nModel.getText("inputInvalidPassword");
         }

         if (oParams.Email === "") {
            sExceptions += oi18nModel.getText("introduceEmail");
         }
         else if (!this.bValidEmail) {
            sExceptions += "'" + this.getView().byId("EmailRegisterField").getValue() + "' " + oi18nModel.getText("inputInvalidEmail");
         }
         return sExceptions
      },

      onCreateRegister: function (oEvent) {
         var CV = this.customUserType.formatValue("value");
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

         var sExceptions = this._validateData(params);
         if (!this.bValidUser || !this.bValidEmail || !this.bValidPassword || sExceptions !== "") {
            MessageBox.error(sExceptions)
         }
         else {
            sap.m.MessageToast.show("MERGE WTF???")
            // var oModel = this.getOwnerComponent().getModel();

            // oModel.create('/UserPassSet', params, {
            //    success: function (oCreatedEntry) {
            //       var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            //       MessageBox.information(oi18nModel.getText("registerSucces"), {
            //          onClose: function (oAction) {
            //             if (oAction == "OK") {
            //                var oRouter = this.getOwnerComponent().getRouter();
            //                oRouter.navTo("overview");
            //             }
            //          }.bind(this)
            //       });

            //    }.bind(this),
            //    error: function (oError) {
            //       sap.m.MessageToast.show(this.errorText(oError))
            //    }.bind(this)
            // });
         }

      },
      customUserType: SimpleType.extend("username", {
         formatValue: function (oValue) {
            return oValue;
         },

         parseValue: function (oValue) {
            //parsing step takes place before validating step, value could be altered here
            return oValue;
         },

         validateValue: function (oValue) {
            var rexUser = /^[a-z\d]+$/i;
            if (!oValue.match(rexUser)) {
               this.bValidUser = false;
               throw new ValidateException(" ");
            }
            else{
               this.bValidUser = true;
            }
         }
      }),

      customPasswordType: SimpleType.extend("password", {
         formatValue: function (oValue) {
            return oValue;
         },

         parseValue: function (oValue) {
            return oValue;
         },

         validateValue: function (oValue) {
            var rexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (!oValue.match(rexPassword)) {
               this.bValidPassword = false;
               throw new ValidateException(" ");
            }
            else{
               this.bValidPassword = true;
            }
         }
      }),


      customEMailType: SimpleType.extend("email", {
         formatValue: function (oValue) {
            return oValue;
         },

         parseValue: function (oValue) {
            return oValue;
         },

         validateValue: function (oValue) {
            var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
            if (!oValue.match(rexMail)) {
               this.bValidEmail = false;
               throw new ValidateException(" ");
            }
            else{
               this.bValidEmail = true;
            }
         }
      })
   });
});