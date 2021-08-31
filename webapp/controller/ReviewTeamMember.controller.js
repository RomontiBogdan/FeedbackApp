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
                  this._restrictEditable(sFromUser === sessionStorage.getItem("username"));
                  if (sFromUser == sessionStorage.getItem("username")) {
                     this._changeStatusIfOpened(sStatus);
                  }
               }.bind(this)
            }
         });
      },

      _restrictEditable: function (bValue) {
         this.getView().byId("ReviewTextArea").setEditable(bValue);
         this.getView().byId("RatingTeamMember").setEditable(bValue);
      },

      _changeStatusIfOpened: function (sStatus) {
         if (sStatus === "0") {
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            var oModel = this.getView().byId("teamFeedbackVBox").getModel();
            oModel.update("/FeedbackTeamSet(" + this._sFeedbackId + ")", { Status: "1" }, {
               merge: true,
               success: function () {
                  MessageToast.show(oi18nModel.getText("toPendingFeedback"));
               }
            });
         }
      },

      onNavBack: function () {
         var oModel = this.getView().getModel();
         oModel.resetChanges();
         this.navBack();
      },

      onToggleStatus: function (oEvent) {
         var oModel = this.getView().byId("teamFeedbackVBox").getModel()
         oModel.setProperty("/FeedbackTeamSet(" + this._sFeedbackId + "l)/Status",
            oEvent.getParameters().selected ? "2" : "1")
      },

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
            success: function(oData) {
               MessageToast.show(oi18nModel.getText("infoUpdated"));
               oModel.setUseBatch(false)
            }
         })
      }

   });
});

