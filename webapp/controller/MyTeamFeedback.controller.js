sap.ui.define([
    "../controller/BaseController",
    
 
 ], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.walkthrough.controller.MyTeamFeedback", {
     
       onInit: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("feedbackdetails").attachPatternMatched(this._onObjectMatched, this);
       },

       _onObjectMatched: function (oEvent) {
         this.getView().bindElement({
            path: "/UserPassSet('" + this.getCurrentUser() + "')"
         });

         // this._aFilter = [];
         // this._aFilter.push(new Filter({
         //    filters: [
         //       new Filter("ToUser", FilterOperator.EQ, this.getCurrentUser()),
         //       new Filter("FromUser", FilterOperator.EQ, this.getCurrentUser()),
         //    ],
         //    and: true,
         // }));

         // var oList = this.byId("MyTeamTable");
         // var oBinding = oList.getBinding("items");
         // oBinding.filter(this._aFilter);
      },
 
       onNavBack: function () {
          this.navBack();
       },
 
       
 
    });
 });