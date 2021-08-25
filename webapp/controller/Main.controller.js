sap.ui.define(
   [
      "../controller/BaseController",
      "sap/m/MessageBox"
   ],
   function (BaseController, MessageBox) {
      "use strict";
      return BaseController.extend("sap.ui.demo.walkthrough.controller.Main", {

         onInit: function () {
            this.getView().bindElement({
               path: "/UserPassSet('" + this.getCurrentUser() + "')",
               events: {
                  dataReceived: function (oData) {
                     this.getOwnerComponent().getModel("userCareerLevel").setData(oData.getParameter("data").CareerLevel);               
                  }.bind(this)
            }});
         },

         onFeedback: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("feedbacklist");
         },

         onProfile: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("myprofile");
         },

         onPEG: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("peglist");
         },


         onLogOut: function () {
            MessageBox.confirm("Are you sure you want to log out?", {
               onClose: function (oAction) {
                  if (oAction == "OK") {
                     var oRouter = this.getOwnerComponent().getRouter();
                     oRouter.navTo("overview");
                  }
               }.bind(this),
            });
         },
      });
   }
);
