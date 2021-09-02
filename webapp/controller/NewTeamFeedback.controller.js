sap.ui.define([
   "./BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox"
], function (BaseController, JSONModel, MessageBox) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.NewTeamFeedback", {
      onInit: function () {
         this.getView().byId("teamMemberSelect").bindElement({
            path: "/TeamManagersSet('" + sessionStorage.getItem("username") + "')"
         });

         // Set data model for skill on view
         var oData = {
            SkillCollection: [{
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

         var oRouter = this.getRouter();
         oRouter.getRoute("newteamfeedback").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function () {
         // Checks if user is still connected on this page
         // otherwise: redirects him to login page
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         }
      },

      // Take over the selected team member from dropdown
      onUserChange: function () {
         var SelectedItem = this.byId("teamMemberSelect").getSelectedItem().getText();
         this.getView().bindElement({
            path: "/UserPassSet('" + SelectedItem + "')"
         });
      },


      // Validation function that receives an object as parameter 
      // that checks if its properties (field names) are null or invalid.
      // Returns a string with an error message in each case the field is found empty
      _validateData: function (oParams) {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var exceptions = ""
         if (oParams.ProjectId === null) {
            exceptions += oi18nModel.getText("projectNotSelected")
         }
         if (oParams.FromUser === null) {
            exceptions += oi18nModel.getText("evaluatorNotSelected")
         }
         if (oParams.FromUser === sessionStorage.getItem("username")) {
            exceptions += oi18nModel.getText("evaluatorSelfSelect")
         }
         if (oParams.ToUser === null) {
            exceptions += oi18nModel.getText("teamMemberNotSelected")
         }
         if (oParams.Categories === null) {
            exceptions += oi18nModel.getText("skillNotSelected")
         }
         return exceptions
      },

      // Validate inserted fields
      // If valid, then create the desired request
      onSendRequest: function () {
         var oEvaluator = this.byId("evaluatorUserSelect").getSelectedItem();
         var oTeamMember = this.byId("teamMemberSelect").getSelectedItem();
         var oProject = this.byId("userProjectsSelect").getSelectedItem();
         var oSkill = this.byId("skillSelect").getSelectedItem();
         var params = {
            FeedbackId: "0",
            FromUser: oEvaluator === null ? null : oEvaluator.getText(),
            ToUser: oTeamMember === null ? null : oTeamMember.getText(),
            Manager: sessionStorage.getItem("username"),
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
         } else {
            var oModel = this.getOwnerComponent().getModel();
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            oModel.create('/FeedbackTeamSet', params, {
               success: function () {
                  MessageBox.success(oi18nModel.getText("feedbackRequestSucces"), {
                     onClose: function (oAction) {
                        if (oAction === "OK") {
                           var oRouter = this.getRouter();
                           oRouter.navTo("myteam");
                        }
                     }.bind(this)
                  });
               }.bind(this),
               error: function (oError) {
                  sap.m.MessageToast.show(oi18nModel.getText("feedbackRequestError"))
               }
            });
         }
      }
   });
});