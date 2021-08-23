sap.ui.define([
    "../controller/BaseController",
    
 
 ], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.walkthrough.controller.MyTeamFeedback", {
     
       onInit: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("feedbackdetails").attachPatternMatched(this._onObjectMatched, this);
       },
 
       onNavBack: function () {
          this.navBack();
       },
 
       
 
    });
 });