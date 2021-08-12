sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  function (Controller, History, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Main", {
      _onObjectMatched: function (oEvent) {
        this.sUsername = oEvent.getParameter("arguments").Username;
      },
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("main")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview", {}, true);
        }
      },

      onRequestNewPEG: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("requestpeg");
      },


		onFeedback: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("feedbacklist");
		},

		onRequestNewPEG: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("requestpeg"); 
		  },

      onDisplayPEGList: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("displaypeglist");
      },


      onListSentReceived: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("sentreceived");
      },

      onProfile: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("myprofile", { Username: this.sUsername });
      },

      onNewFeedback: function (oEvent) {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("newfeedback");
      },

      onPEG: function (oEvent) {

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("managerpeg");

        //oRouter.navTo("displaypeglist");

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
