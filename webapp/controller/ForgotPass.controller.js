sap.ui.define([
   "./BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox",
   "sap/ui/model/SimpleType",
   "sap/ui/model/ValidateException",
   "sap/ui/core/Core",
], function (BaseController, JSONModel, MessageBox, SimpleType, ValidateException, Core) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.ForgotPass", {
      onInit: function () {
         var oView = this.getView();
         var oMM = Core.getMessageManager();

         oView.setModel(new JSONModel({
            username: "",
            email: "",
            newpassword: ""
         }));

         // attach handlers for validation errors
         oMM.registerObject(oView.byId("usernameTextFP"), true);
         oMM.registerObject(oView.byId("emailTextFP"), true);
         oMM.registerObject(oView.byId("passwordTextFP"), true);
      },

      
      onPressForgotPass: function () {
         var oUsernameField = this.getView().byId("usernameTextFP");
         var oEmailField = this.getView().byId("emailTextFP");
         var oPasswordField = this.getView().byId("passwordTextFP");

         var sUsername = oUsernameField.getValue();
         var sEmail = oEmailField.getValue();
         var sPassword = oPasswordField.getValue();

         var params = {
            Username: sUsername,
            Email: sEmail,
            Password: sPassword
         }

         var aInputs = [
            oUsernameField.getBinding("value").getType(),
            oEmailField.getBinding("value").getType(),
            oPasswordField.getBinding("value").getType()
         ]

         var sExceptions = this._validateData(params);

         if (sExceptions === "") {
            sExceptions += this._validateInputFormat(aInputs);
         }

         if (sExceptions !== "") {
            MessageBox.error(sExceptions)
         } else {
            var oModel = this.getOwnerComponent().getModel();
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            oModel.read("/ForgotPassUserSet(Username='" + sUsername + "',Email='" + sEmail + "')", {
               success: function (oSuccess) {
                  oModel.update("/ForgotPassUserSet(Username='" + sUsername + "',Email='" + sEmail + "')", {
                     Password: sPassword,
                     Username: sUsername
                  }, {
                     success: function (oUpdateSuccess) {
                        sap.m.MessageToast.show(oi18nModel.getText("passChanged"))
                     }
                  })
               },
               error: function (oError) {
                  sap.m.MessageToast.show(oi18nModel.getText("invalidUserEmail"))
               }
            })

         }
      },


      //validation function that receives an object and returns a string with an error message in each case the field is found empty
      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var sExceptions = ""
         if (oParams.Username === "") {
            sExceptions += oi18nModel.getText("introduceUsernamePassRecovery")
         }
         if (oParams.Email === "") {
            sExceptions += oi18nModel.getText("introduceEmailPassRecovery")
         }
         if (oParams.Password === "") {
            sExceptions += oi18nModel.getText("introducePasswordRecovery")
         }
         return sExceptions
      },

        //receives an array as paramater and returns a string with an error message
      _validateInputFormat: function (aInputs) {
         var oUsernameFieldValue = this.getView().byId("usernameTextFP").getValue();
         var oEmailFieldValue = this.getView().byId("emailTextFP").getValue();
         var oPasswordFieldValue = this.getView().byId("passwordTextFP").getValue();

         var sExceptions = "";
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
      
         try {
            aInputs[0].validateValue(oUsernameFieldValue);
         } catch (oException) {
            sExceptions += oi18nModel.getText("inputInvalidUsername")
         }

         try {
            aInputs[1].validateValue(oEmailFieldValue);
         } catch (oException) {
            sExceptions += "'" + oEmailFieldValue + "'" + oi18nModel.getText("inputInvalidEmail")
         }

         try {
            aInputs[2].validateValue(oPasswordFieldValue);
         } catch (oException) {
            sExceptions += oi18nModel.getText("inputInvalidPassword")
         }

         return sExceptions;
      },

   //Custom model type for validating an username
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


   //Custom model type for validating an Email
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
      }),

      //Custom model type for validating a password
      customNewPasswordType: SimpleType.extend("newpassword", {
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
   });
});