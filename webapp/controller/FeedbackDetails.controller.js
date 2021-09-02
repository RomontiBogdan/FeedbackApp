sap.ui.define([
   "./BaseController",
   "../model/formatter",
   "sap/ui/model/json/JSONModel"
], function (BaseController, formatter, JSONModel) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.FeedbackDetails", {
      formatter: formatter,
      onInit: function () {
         // Model for anonymous usage
         var oModel = new JSONModel({
            currentUser: sessionStorage.getItem("username")
         });
         this.getView().setModel(oModel, "AnonymousModel");

         var oRouter = this.getRouter();
         oRouter.getRoute("feedbackdetails").attachPatternMatched(this._onObjectMatched, this);
      },

     
      _onObjectMatched: function (oEvent) {
         //checks if user is still connected to this page and otherwise, redirects it to login page
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         } else {
         
            //adds parameter to navigation path
            var sFeedbackID = oEvent.getParameter("arguments").feedbackID;
            this.getView().bindElement({
               path: "/Feedback360Set(" + sFeedbackID + ")"
            });
         }
      }
   });
});