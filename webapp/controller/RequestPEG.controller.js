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
         var exceptions = ""
         if (oParams.ProjectId === null) {
            exceptions += "Please select a project!\n"
         }
         if (oParams.FromUser === null) {
            exceptions += "Please select a manager!\n"
         }
         if (oParams.FromUser === this.getCurrentUser()) {
            exceptions += "You cannot select yourself to be the Evaluator!\n"
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

            oModel.create('/PegReqSet', params, {
               success: function () {
                  MessageBox.success("PEG has been successfully requested!", {
                     onClose: function (oAction) {
                        if (oAction === "OK") {
                           var oRouter = this.getOwnerComponent().getRouter();
                           oRouter.navTo("peglist");
                        }
                     }.bind(this)
                  });

               }.bind(this),
               error: function (oError) { sap.m.MessageToast.show("Fail to request PEG!") }
            });
         }
      }
   });
});