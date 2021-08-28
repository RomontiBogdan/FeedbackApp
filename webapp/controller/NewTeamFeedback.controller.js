sap.ui.define([
   "../controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox"
], function (BaseController, JSONModel, MessageBox) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.NewTeamFeedback", {
      onInit: function () {
         this.getView().byId("teamMemberSelect").bindElement({
            path: "/TeamManagersSet('" + this.getCurrentUser() + "')"
         });
         var oData = {
            SkillCollection: [
               {
                  Id: "0",
                  Name: "Technical",
               },
               {
                  Id: "1",
                  Name: "Soft",
               },
               {
                  Id: "2",
                  Name: "Other",
               },
            ],
         };

         var oModel = new JSONModel(oData);
         this.getView().setModel(oModel, "newTeamFeedbackModel");
      },

      onNavBack: function () {
         this.navBack();
      },

      onUserChange: function () {
         var SelectedItem = this.byId("teamMemberSelect").getSelectedItem().getText();
         this.getView().bindElement({
            path: "/UserPassSet('" + SelectedItem + "')"
         });
      },

      _validateData: function (oParams) {
         var exceptions = ""
         if (oParams.ProjectId === null) {
            exceptions += "Please select a project!\n"
         }
         if (oParams.FromUser === null) {
            exceptions += "Please select an evaluator!\n"
         }
         if (oParams.FromUser === this.getCurrentUser()) {
            exceptions += "You cannot select yourself to be the Evaluator!\n"
         }
         if (oParams.ToUser === null) {
            exceptions += "Please select a team member!\n"
         }
         if (oParams.Categories === null) {
            exceptions += "Please select a skill!\n"
         }
         return exceptions
      },

      onSendRequest: function () {
         var oEvaluator = this.byId("evaluatorUserSelect").getSelectedItem();
         var oTeamMember = this.byId("teamMemberSelect").getSelectedItem();
         var oProject = this.byId("userProjectsSelect").getSelectedItem();
         var oSkill = this.byId("skillSelect").getSelectedItem();
         var params = {
            FeedbackId: "0",
            FromUser: oEvaluator === null ? null : oEvaluator.getText(),
            ToUser: oTeamMember === null ? null : oTeamMember.getText(),
            Manager: this.getCurrentUser(),
            Description: "",
            ProjectId: oProject === null ? null : oProject.getKey(),
            SentAt: new Date(),
            Type: "1",
            Categories: oSkill === null ? null : oSkill.getKey(),
            Rating: "0",
            Status: "0"
         }
         var exceptions = this._validateData(params);
         if (exceptions !== "") {
            MessageBox.error(exceptions)
         }
         else {
            var oModel = this.getOwnerComponent().getModel();

            oModel.create('/FeedbackTeamSet', params, {
               success: function () {
                  MessageBox.success("Feedback has been successfully requested!", {
                     onClose: function (oAction) {
                        if (oAction === "OK") {
                           var oRouter = this.getRouter();
                           oRouter.navTo("myteam");
                        }
                     }.bind(this)
                  });
               }.bind(this),
               error: function (oError) { 
                  sap.m.MessageToast.show("Fail to request PEG!") 
               }
            });
         }
      }
   });
});