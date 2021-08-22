sap.ui.define([
   "../controller/BaseController",
   'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
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

         var oRouter = this.getOwnerComponent().getRouter();
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

      onPressSave: function () {
         var oModel = this.getView().getModel();
         oModel.setUseBatch(true);
         oModel.submitChanges({
            success: function (oData) {
               sap.m.MessageToast.show("The information was updated successfully!");
               oModel.setUseBatch(false);
            }
         });
      },

      _setFieldsState: function (bState) {
         this.getView().byId("inputName").setEditable(bState);
         this.getView().byId("inputEmail").setEditable(bState);
         this.getView().byId("inputTel").setEditable(bState);
         this.getView().byId("inputSU").setEditable(bState);
      },

      onEdit: function (oEvent) {
         this._setFieldsState(oEvent.getParameter("state"))
      }
   });
});