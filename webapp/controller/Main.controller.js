sap.ui.define([
   "./BaseController",
   "sap/m/MessageBox"
], function (BaseController, MessageBox) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.Main", {
      onInit: function () {
         var oRouter = this.getRouter();
         oRouter.getRoute("main").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function () {
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         } else {
            this.getView().bindElement({
               path: "/UserPassSet('" + sessionStorage.getItem("username") + "')",
               events: {
                  dataReceived: function (oData) {
                     sessionStorage.setItem("careerLevel", oData.getParameter("data").CareerLevel);
                  }.bind(this),
                  change: function (oData) {
                     var sCareerLvl = this.getView().getModel().getProperty(oData.getSource().getPath() + "/CareerLevel");
                     sessionStorage.setItem("careerLevel", sCareerLvl);
                  }.bind(this)
               }
            });
         }
      },

      onFeedback: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("feedbacklist");
      },

      onProfile: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("myprofile");
      },

      onPEG: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("peglist");
      },

      onTeamFeedback: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("myteam");
      },


      onLogOut: function () {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         MessageBox.confirm(oModel.getText("logOutConfirm"), {
            title: oModel.getText("logOut"),
            onClose: function (oAction) {
               if (oAction == "OK") {
                  sessionStorage.removeItem("username");
                  var oRouter = this.getRouter();
                  oRouter.navTo("overview");
               }
            }.bind(this),
         });
      },
   });
}
);
