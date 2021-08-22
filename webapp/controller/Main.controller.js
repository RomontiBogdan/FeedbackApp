sap.ui.define(
   [
      "sap/ui/core/mvc/Controller",
      "sap/m/MessageBox"
   ],
   function (Controller, MessageBox) {
      "use strict";
      return Controller.extend("sap.ui.demo.walkthrough.controller.Main", {

         onInit: function () {

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
