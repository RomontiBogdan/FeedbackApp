sap.ui.define([
   "./BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox",
   "sap/m/MessageToast",

], function (BaseController, JSONModel, MessageBox, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.MyProfile", {
      onInit: function () {
         var oData = {
            Levels: [
               {
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

      _onObjectMatched: function (oEvent) {
         var sUsername = this.getCurrentUser();
         this.getView().bindElement({
            path: "/UserPassSet('" + sUsername + "')"
         });
      },

      onNavBack: function () {
         this.navBack();
      },


      _setFieldsState: function (bState) {
         var oView = this.getView();
         oView.byId("inputName").setEditable(bState);
         oView.byId("inputEmail").setEditable(bState);
         oView.byId("inputTel").setEditable(bState);
         oView.byId("inputSU").setEditable(bState);
      },


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


      onEdit: function (oEvent) {

         this._setFieldsState(oEvent.getParameter("state"));

      },


      onPressSave: function () {


         var params =  {
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
         }
         else {
     
        var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
        var oModel = this.getView().getModel();
        oModel.setUseBatch(true);
   
         oModel.submitChanges({
            success: function (oData) {
               sap.m.MessageToast.show(oi18nModel.getText("infoUpdated"));
               oModel.setUseBatch(false);
            }
         });
         
 
      }

      }
    
   });
});