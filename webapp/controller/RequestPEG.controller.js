sap.ui.define([
   "./BaseController",
   "sap/m/MessageBox"
], function (BaseController, MessageBox) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.RequestPEG", {
      onInit: function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.getRoute("requestpeg").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
         this.navBack();
      },

      _onObjectMatched: function () {
         this.getView().byId("mainInfoContainer").bindElement({
            path: "/UserPassSet('" + this.getCurrentUser() + "')"
         });
      },

      onProjectChange: function () {
         var SelectedItem = this.byId("selectProjectName").getSelectedItem().getKey();
         this.getView().byId("selectManagerInfoContainer").bindElement({
            path: "/UserProjectsSet(Username='',ProjectId='" + SelectedItem + "')"
         });
      },

      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var exceptions = ""
         if (oParams.ProjectId === null) {
            exceptions += oi18nModel.getText("projectNotSelected");
         }
         if (oParams.FromUser === null) {
            exceptions += oi18nModel.getText("managerNotSelected");
         }
         if (oParams.FromUser === this.getCurrentUser()) {
            exceptions += oi18nModel.getText("evaluatorSelfSelect");
         }
         return exceptions
      },

      onSendRequest: function () {
         var params = {
            FeedbackId: "0",
            FromUser: this.byId("selectManager").getSelectedItem() === null ? null : this.byId("selectManager").getSelectedItem().getText(),
            ToUser: this.getCurrentUser(),
            Description: "",
            ProjectId: this.byId("selectProjectName").getSelectedItem() === null ? null : this.byId("selectProjectName").getSelectedItem().getKey(),
            SentAt: new Date(),
            Type: "0",
            Status: "0"
         }
         var exceptions = this._validateData(params);
         if (exceptions !== "") {
            MessageBox.error(exceptions)
         }
         else {
            var oModel = this.getOwnerComponent().getModel();
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            oModel.create('/PegReqSet', params, {
               success: function () {
                  MessageBox.success(oi18nModel.getText("pegRequestSucces"), {
                     onClose: function (oAction) {
                        if (oAction === "OK") {
                           var oRouter = this.getOwnerComponent().getRouter();
                           oRouter.navTo("peglist");
                        }
                     }.bind(this)
                  });

               }.bind(this),
               error: function (oError) { sap.m.MessageToast.show(oi18nModel.getText("pegRequestError")) }
            });
         }
      }
   });
});