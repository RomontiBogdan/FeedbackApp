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
         
      },

      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var sExceptions = ""
         if (oParams.Username === "") {
            sExceptions += oi18nModel.getText("introduceUsername");
         }
         if (oParams.Password === "") {
            sExceptions += oi18nModel.getText("introducePassword");
         }
         if (oParams.Email === "") {
            sExceptions += oi18nModel.getText("introduceEmail");
         }

         return sExceptions
      },

      _validateInputFormat: function (oInputs){
         var oUsernameFieldValue = this.getView().byId("UsernameRegisterField").getValue();
			var oEmailFieldValue = this.getView().byId("EmailRegisterField").getValue();
         var oPasswordFieldValue = this.getView().byId("PasswordRegisterField").getValue();
         var sExceptions = "";
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();

         try {
				oInputs[0].validateValue(oUsernameFieldValue);
			} catch (oException) {
				sExceptions += oi18nModel.getText("inputInvalidUsername")
			}

         try {
            oInputs[1].validateValue(oEmailFieldValue);
         } catch (oException) {
            sExceptions += "'" + oEmailFieldValue + "'" +oi18nModel.getText("inputInvalidEmail")
         }
         
         try {
				oInputs[2].validateValue(oPasswordFieldValue);
			} catch (oException) {
				sExceptions += oi18nModel.getText("inputInvalidPassword")
			}

         return sExceptions;
      },

      onCreateRegister: function (oEvent) {
         var oUsernameField = this.getView().byId("UsernameRegisterField");
			var oEmailField = this.getView().byId("EmailRegisterField");
         var oPasswordField = this.getView().byId("PasswordRegisterField");
         this.getView().byId("EmailRegisterField").getBinding("value").getType().validateValue("asdasd@asda.com")
         var params = {
            FullName: "",
            Username: oUsernameField.getValue(),
            Email: oEmailField.getValue(),
            Password: oPasswordField.getValue(),
            PersonalNo: "",
            Su: "",
            CareerLevel: "",
            FiscalYear: ""
         }

         var oInputs = [
            oUsernameField.getBinding("value").getType(),
			   oEmailField.getBinding("value").getType(),
            oPasswordField.getBinding("value").getType()
         ]

         var sExceptions = this._validateData(params);

         if (sExceptions === "") {
            sExceptions += this._validateInputFormat(oInputs);
         }

         if (sExceptions !== "") {
            MessageBox.error(sExceptions)
         }
         else {
            var oModel = this.getOwnerComponent().getModel();

            oModel.create('/UserPassSet', params, {
               success: function (oCreatedEntry) {
                  var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
                  MessageBox.information(oi18nModel.getText("registerSucces"), {
                     onClose: function (oAction) {
                        if (oAction == "OK") {
                           var oRouter = this.getRouter();
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
               throw new ValidateException(" ");
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
               throw new ValidateException(" ");
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
               throw new ValidateException(" ");
            }
         }
      })
   });
});