sap.ui.define([
   "../controller/BaseController",
   "../model/formatter",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"
], function (BaseController, formatter, Filter, FilterOperator) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.MyTeamFeedback", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.getRoute("myteam").attachPatternMatched(this._onObjectMatched, this);
         if(this.getUserCareerLevel() !== "5")
            this.getView().byId("buttonbar").setVisible(false);
         else
         this.getView().byId("buttonbar").setVisible(true);
      },

      _onObjectMatched: function (oEvent) {
         this.getView().bindElement({
            path: "/UserPassSet('" + this.getCurrentUser() + "')"
         });

         this._aFilter = [];
         var sCriteria;
         if(this.getView().byId("myteambutton").getType() == "Emphasized")
            sCriteria = "Manager";
         else
            sCriteria = "FromUser";
         this._aFilter.push(new Filter({
            filters: [
               new Filter(sCriteria, FilterOperator.EQ, this.getCurrentUser()),
            ],
            and: true,
         }));

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(this._aFilter);
      },

      onNavBack: function () {
         this.navBack();
      },


      onFilterSelect: function (oEvent) {
         var sKey = oEvent.getParameter("key");
         var auxFilter = this._aFilter[0];
         if (sKey === "New") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "0")
         }
         else if (sKey === "Pending") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "1")
         }
         else if (sKey === "Completed") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "2")
         }
         else if (auxFilter.aFilters.length > 1) {
            auxFilter.aFilters.pop(1);
         }

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      onPressTeamFeedback: function(oEvent)
      {
         var oItem = oEvent.getSource();
         var oBindingObject = oItem.getBindingContext().getObject();
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("reviewteammember", {
            feedbackID: oBindingObject.FeedbackId
         });
      },

      onNewFeedback :function()
     {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("newteamfeedback"); 
     },

     onMyTeam: function(oEvent)
      {
         this.getView().byId("myteambutton").setType("Emphasized");
         this.getView().byId("otherteamsbutton").setType("Default");
         var auxFilter = this._aFilter[0];
         auxFilter.aFilters[0] = new Filter("Manager", FilterOperator.EQ, this.getCurrentUser());

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

     onOtherTeams: function(oEvent)
      {
         this.getView().byId("otherteamsbutton").setType("Emphasized");
         this.getView().byId("myteambutton").setType("Default");
         var auxFilter = this._aFilter[0];
         auxFilter.aFilters[0] = new Filter("FromUser", FilterOperator.EQ, this.getCurrentUser());

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      }
     
   });
});