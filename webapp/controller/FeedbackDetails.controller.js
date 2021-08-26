sap.ui.define([
   "../controller/BaseController",
   "../model/formatter",
   "sap/ui/model/json/JSONModel"
], function (BaseController, formatter, JSONModel) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.FeedbackDetails", {
      formatter: formatter,
      onInit: function () {
         // Model for anonymous usage
         var oModel = new JSONModel({currentUser: this.getCurrentUser()});
         this.getView().setModel(oModel, "AnonymousModel");

         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.getRoute("feedbackdetails").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
         this.navBack();
      },

      _onObjectMatched: function (oEvent) {
         var sFeedbackID = oEvent.getParameter("arguments").feedbackID;
         this.getView().bindElement({
            path: "/Feedback360Set(" + sFeedbackID + ")"
         });
      }

   });
});