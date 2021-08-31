sap.ui.define([
   "./BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox",
   "sap/ui/model/SimpleType",
   "sap/ui/model/ValidateException",
   "sap/ui/core/Core",
], function (BaseController,JSONModel, MessageBox, SimpleType, ValidateException, Core) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.Register", {


      onInit: function () {
			var oView = this.getView(),
				oMM = Core.getMessageManager();

			oView.setModel(new JSONModel({ username: "", password:"", email: "" }));

			// attach handlers for validation errors
			oMM.registerObject(oView.byId("UsernameRegisterField"), true);
			oMM.registerObject(oView.byId("PasswordRegisterField"), true);
         oMM.registerObject(oView.byId("EmailRegisterField"), true);
		},

      onNavBack: function () {
         this.navBack();
      },

      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var exceptions = ""
         if (oParams.Username === "") {
          
           exceptions += oi18nModel.getText("usernameNotEntered");
         }
         if (oParams.Password === "") {
           
           exceptions += oi18nModel.getText("passwordNotEntered");
         }

         if (oParams.Email === "") {
          
           exceptions += oi18nModel.getText("emailNotEntered");
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

   },
   customUserType: SimpleType.extend(" username", {
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
            throw new ValidateException("Username should contain only lowercase and uppercase letters and numbers");
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
            throw new ValidateException("Password must contain minimum six characters, at least one letter and one number");
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
            throw new ValidateException("'" + oValue + "' is not a valid e-mail address");
         }
      }
   })


   });
});