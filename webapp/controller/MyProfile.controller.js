sap.ui.define([
   "./BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox",
   "sap/m/MessageToast",
], function (BaseController, JSONModel, MessageBox, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.MyProfile", {
      onInit: function () {
         // Set data model for career level on view
         var oData = {
            Levels: [{
                  Id: "0",
                  Name: "Junior Consultant"
               },
               {
                  Id: "1",
                  Name: "Consultant"
               },
               {
                  Id: "2",
                  Name: "Senior Consultant"
               },
               {
                  Id: "3",
                  Name: "Manager"
               },
               {
                  Id: "4",
                  Name: "Senior Manager"
               },
               {
                  Id: "5",
                  Name: "Lead Manager"
               }
            ]
         };

         var oModel = new JSONModel(oData);
         this.getView().setModel(oModel, "myProfileModel");
         
         var oRouter = this.getRouter();
         oRouter.getRoute("myprofile").attachPatternMatched(this._onObjectMatched, this);
      },

      // Method triggered by the router in which 
      // we receive an event that checks if there
      // is any user currently connected
      _onObjectMatched: function (oEvent) {
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         } else {
            var sUsername = sessionStorage.getItem("username");
            this.getView().bindElement({
               path: "/UserPassSet('" + sUsername + "')"
            });
         }
      },

      // Function that receives a boolean value as parameter
      // that ensures making fields editable when user clicks on switch
      _setFieldsState: function (bState) {
         var oView = this.getView();
         oView.byId("inputName").setEditable(bState);
         oView.byId("inputEmail").setEditable(bState);
         oView.byId("inputTel").setEditable(bState);
         oView.byId("inputSU").setEditable(bState);
      },

      // Validation function that receives an object parameter 
      // that checks if its properties (field names) are empty.
      // Returns a string with an error message in each case the field is found empty
      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var sExceptions = ""
         if (oParams.FullName === "") {
            sExceptions += oi18nModel.getText("introduceYourName");
         }
         if (oParams.Email === "") {
            sExceptions += oi18nModel.getText("introduceYourEmail");
         }
         if (oParams.PersonalNo === "") {
            sExceptions += oi18nModel.getText("introduceYourPersonalNo");
         }
         if (oParams.Su === "") {
            sExceptions += oi18nModel.getText("introduceServiceUnit");
         }
         return sExceptions
      },

      // Function trigged by the switch that calls setFieldsState method for making fields editable when switch is clicked
      onEdit: function (oEvent) {
         this._setFieldsState(oEvent.getParameter("state"));
      },

      // Saving the current pending changes from the
      // binded fields of the profile
      onPressSave: function () {
         var params = {
            FullName: this.getView().byId("inputName").getValue(),
            Username: "",
            Email: this.getView().byId("inputEmail").getValue(),
            Password: "",
            PersonalNo: this.getView().byId("inputTel").getValue(),
            Su: this.getView().byId("inputSU").getValue(),
            CareerLevel: "",
            FiscalYear: ""
         }

         var sExceptions = this._validateData(params);

         if (sExceptions !== "") {
            MessageBox.error(sExceptions)
         } else {
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            var oModel = this.getView().getModel();
            oModel.setUseBatch(true);
            oModel.submitChanges({
               success: function (oData) {
                  MessageToast.show(oi18nModel.getText("infoUpdated"));
                  oModel.setUseBatch(false);
               }
            });
         }
      }
   });
});