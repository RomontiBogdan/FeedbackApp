sap.ui.define([
   "./BaseController",
   "../model/formatter",
   "sap/m/MessageToast"

], function (BaseController, formatter, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.ReviewTeamMember", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.getRoute("reviewteammember").attachPatternMatched(this._onObjectMatched, this);
      },

       _onObjectMatched: function (oEvent) {
        var sFromUser, sPath, sUserPath, sStatus, sStatusPath, oModel;
        this.sFeedbackID = oEvent.getParameter("arguments").feedbackID;
        this.getView().bindElement({
           path: "/FeedbackTeamSet(" + this.sFeedbackID + ")",
           events: {
              dataReceived: function (oData) {
                  sFromUser= oData.getParameter("data").FromUser; 
                  this._restrictEditable(sFromUser);          
              }.bind(this),
              change: function(oData) { 
                  oModel = this.getView().getModel();
                  sPath = oData.getSource().getBoundContext().sPath;
                  sUserPath = sPath + "/FromUser";
                  sStatusPath = sPath + "/Status";
                  sFromUser = oModel.getProperty(sUserPath);
                  sStatus = oModel.getProperty(sStatusPath);
                  this._restrictEditable(sFromUser);
                  if(sFromUser == this.getCurrentUser())
                     this._changeStatusIfOpened(sStatus);
              }.bind(this)
        }});

     },

     _restrictEditable: function(sFromUser){
         if(sFromUser == this.getCurrentUser())
         {
         this.getView().byId("ReviewTextArea").setEditable(true);
         this.getView().byId("RatingTeamMember").setEditable(true);
         }
         else
         {
            this.getView().byId("ReviewTextArea").setEditable(false);
            this.getView().byId("RatingTeamMember").setEditable(false);
         }
      },

      _changeStatusIfOpened: function (sStatus) {
         if (sStatus === "0") {
            var oModel = this.getView().byId("teamFeedbackVBox").getModel();
            oModel.update("/FeedbackTeamSet(" + this.sFeedbackID + ")", { Status: "1" }, {
               merge: true,
               success: function () {
                  MessageToast.show("This Feedback is now on Pending!");
               }
            });
         }
      },


     
     onNavBack: function () {
         this.navBack();
      }
 
    });
 });

