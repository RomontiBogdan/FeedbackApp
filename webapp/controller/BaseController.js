sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/routing/History",
   "sap/ui/model/resource/ResourceModel"
], function (Controller, History, ResourceModel) {
   "use strict";
   return Controller.extend("sap.ui.demo.walkthrough.controller.BaseController", {
      onInit: function () {
      },

      navBack: function () {
         var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getRouter()
				oRouter.navTo("overview", true);
			}
      },

      toMain: function () {
         var oRouter = this.getRouter()
			oRouter.navTo("main", true);
      },

      getRouter: function () {
         return this.getOwnerComponent().getRouter();
      },

      getCurrentUser: function () {
         return this.getOwnerComponent().getModel("currentUser").getData();
      },

      getUserCareerLevel: function () {
         return this.getOwnerComponent().getModel("userCareerLevel").getData();
      },

      errorText: function (oError) {
         return JSON.parse(oError.responseText).error.message.value
      },

      setGermani18n: function(){
         this.getOwnerComponent().setGermani18n();
      },

      setEnglishi18n: function(){
         this.getOwnerComponent().setEnglishi18n();
      }
   });
});