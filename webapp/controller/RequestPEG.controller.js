sap.ui.define([
   "./BaseController",
   "sap/m/MessageBox"
], function (BaseController, MessageBox) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.RequestPEG", {
      onInit: function () {
         var oRouter = this.getRouter();
         oRouter.getRoute("requestpeg").attachPatternMatched(this._onObjectMatched, this);
      },

      // Checks if user is connected
      _onObjectMatched: function () {
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         } else {
            this.getView().bindElement({
               path: "/UserPassSet('" + sessionStorage.getItem("username") + "')"
            });
         }
      },

      // Binding new managers for the currently selected project
      onProjectChange: function () {
         var SelectedItem = this.byId("selectProjectName").getSelectedItem().getKey();
         this.getView().byId("selectManager").bindElement({
            path: "/UserProjectsSet(Username='',ProjectId='" + SelectedItem + "')"
         });
      },

      // Validation function that receives an object as parameter 
      // that checks if its properties (field names) are null or invalid.
      // Returns a string with an error message in each case the field is found empty
      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var exceptions = ""
         if (oParams.ProjectId === null) {
            exceptions += oi18nModel.getText("projectNotSelected");
         }
         if (oParams.FromUser === null) {
            exceptions += oi18nModel.getText("managerNotSelected");
         }
         if (oParams.FromUser === sessionStorage.getItem("username")) {
            exceptions += oi18nModel.getText("evaluatorSelfSelect");
         }
         return exceptions
      },

      // Sending new PEG request
      onSendRequest: function () {
         var oManagerSelection = this.byId("selectManager").getSelectedItem();
         var oProjectNameSelection = this.byId("selectProjectName").getSelectedItem();
         var params = {
            FeedbackId: "0",
            FromUser: oManagerSelection === null ? null : oManagerSelection.getText(),
            ToUser: sessionStorage.getItem("username"),
            Description: "",
            ProjectId: oProjectNameSelection === null ? null : oProjectNameSelection.getKey(),
            SentAt: new Date(),
            Type: "0",
            Status: "0"
         }

         var exceptions = this._validateData(params);
         if (exceptions !== "") {
            MessageBox.error(exceptions)
         } else {
            var oModel = this.getOwnerComponent().getModel();
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            oModel.create('/PegReqSet', params, {
               success: function () {
                  MessageBox.success(oi18nModel.getText("pegRequestSucces"), {
                     onClose: function (oAction) {
                        if (oAction === "OK") {
                           var oRouter = this.getRouter();
                           oRouter.navTo("peglist");
                        }
                     }.bind(this)
                  });
               }.bind(this),
               error: function (oError) {
                  sap.m.MessageToast.show(oi18nModel.getText("pegRequestError"))
               }
            });
         }
      }
   });
});