sap.ui.define([
   "./BaseController",
   "../model/formatter",
   "sap/m/MessageToast"
], function (BaseController, formatter, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.ReviewTeamMember", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getRouter();
         oRouter.getRoute("reviewteammember").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         // Checks if user is connected on this view
         // otherwise: redirects him to the login page
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         } else {
            var sFromUser, sPath, sUserPath, sStatus, sStatusPath, oModel;
            this._sFeedbackId = oEvent.getParameter("arguments").feedbackID;
            this.getView().bindElement({
               path: "/FeedbackTeamSet(" + this._sFeedbackId + ")",
               events: {
                  dataReceived: function (oData) {
                     sFromUser = oData.getParameter("data").FromUser;
                     this._restrictEditable(sFromUser === sessionStorage.getItem("username"));
                  }.bind(this),
                  change: function (oData) {
                     oModel = this.getView().getModel();
                     sPath = oData.getSource().getBoundContext().sPath;
                     sUserPath = sPath + "/FromUser";
                     sStatusPath = sPath + "/Status";
                     sFromUser = oModel.getProperty(sUserPath);
                     sStatus = oModel.getProperty(sStatusPath);

                     // Restricts edit access according to the currently logged in user
                     this._restrictEditable(sFromUser === sessionStorage.getItem("username"));
                     if (sFromUser == sessionStorage.getItem("username")) {
                        this._changeStatusIfNew(sStatus);
                     }
                  }.bind(this)
               }
            });
         }
      },

      // Receives boolean parameter that restricts editing of fields
      _restrictEditable: function (bValue) {
         this.getView().byId("ReviewTextArea").setEditable(bValue);
         this.getView().byId("RatingTeamMember").setEditable(bValue);
         this.getView().byId("teamFeedbackSendButton").setVisible(bValue);
         this.getView().byId("completedCheckBox").setVisible(bValue);
      },

      // Update current status to Pending if it is New
      _changeStatusIfNew: function (sStatus) {
         if (sStatus === "0") {
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            var oModel = this.getView().byId("teamFeedbackVBox").getModel();
            oModel.update("/FeedbackTeamSet(" + this._sFeedbackId + ")", {
               Status: "1"
            }, {
               merge: true,
               success: function () {
                  MessageToast.show(oi18nModel.getText("toPendingFeedback"));
               }
            });
         }
      },

      // Navigate back to the previous view.
      // Reset all pending changes first.
      onNavBack: function () {
         var oModel = this.getView().getModel();
         oModel.resetChanges();
         this.navBack();
      },

      // Toggle binded object Status according to the checkbox
      // if checked: Completed
      // if not checked: Pending
      onToggleStatus: function (oEvent) {
         var oModel = this.getView().byId("teamFeedbackVBox").getModel()
         oModel.setProperty("/FeedbackTeamSet(" + this._sFeedbackId + "l)/Status",
            oEvent.getParameters().selected ? "2" : "1")
      },

      // Updates the current opened feedback with the specified
      // values from the binded fields
      onSendFeedback: function () {
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var oModel = this.getView().getModel()
         if (!oModel.hasPendingChanges()) {
            return;
         }

         var oPendingChanges = oModel.getPendingChanges();
         var oFirstProperty = Object.keys(oPendingChanges)[0]
         var oChangedProperties = oPendingChanges[oFirstProperty]
         if (oChangedProperties.Rating !== undefined) {
            oModel.setProperty("/" + oFirstProperty + "/Rating", oChangedProperties.Rating + '') // convert to string
         }

         oModel.setUseBatch(true)
         oModel.submitChanges({
            success: function (oData) {
               MessageToast.show(oi18nModel.getText("infoUpdated"));
               oModel.setUseBatch(false)
            }
         })
      }
   });
});