sap.ui.define([
    "../controller/BaseController",
    "../model/formatter"
    
 
 ], function (BaseController, formatter) {
    "use strict";
    return BaseController.extend("sap.ui.demo.walkthrough.controller.ReviewTeamMember", {
        formatter: formatter,
       onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("reviewteammember").attachPatternMatched(this._onObjectMatched, this);
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