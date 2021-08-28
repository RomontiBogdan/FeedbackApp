sap.ui.define([
   "./BaseController",
   "../model/formatter",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"
], function (BaseController, formatter, Filter, FilterOperator) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.MyTeamFeedback", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getRouter();
         oRouter.getRoute("myteam").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         var sUsername = this.getCurrentUser();
         this.getView().bindElement({
            path: "/UserPassSet('" + sUsername + "')"
         });

         this._aFilter = [];
         this._isTeamManager(sUsername)
               .then(bReturnedValue => this._restrictIfNotTeamManager(bReturnedValue, sUsername))
               .catch(bReturnedValue => this._restrictIfNotTeamManager(bReturnedValue, sUsername))
      },

      _restrictIfNotTeamManager: function(bTeamManager, sUsername){
         var sCriteria;
         if(bTeamManager)
         {
            this.getView().byId("buttonBar").setVisible(true);
            if(this.getView().byId("myTeamButton").getType() === "Emphasized")
               sCriteria = "Manager";
            else
               sCriteria = "FromUser";
         }
         else
         {
            this.getView().byId("buttonBar").setVisible(false);
            sCriteria = "FromUser";
         }
            
         this._aFilter.push(new Filter({
            filters: [
               new Filter(sCriteria, FilterOperator.EQ, sUsername),
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

      _isTeamManager: function (sUsername) {
         var oModel = this.getOwnerComponent().getModel();
         return new Promise((resolve, reject) => {
            oModel.read("/TeamManagersSet('" + sUsername + "')", {
               success: function () {
                  resolve(true);
               }.bind(this),
               error: function () {
                  reject(false);
               }.bind(this)
            })
         })
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

      onPressTeamFeedback: function (oEvent) {
         var oItem = oEvent.getSource();
         var oBindingObject = oItem.getBindingContext().getObject();
         var oRouter = this.getRouter();
         oRouter.navTo("reviewteammember", {
            feedbackID: oBindingObject.FeedbackId
         });
      },

      onNewFeedback: function () {
         var oRouter = this.getRouter();
         oRouter.navTo("newteamfeedback");
      },

      onMyTeam: function (oEvent) {
         this.getView().byId("myTeamButton").setType("Emphasized");
         this.getView().byId("otherTeamsButton").setType("Default");
         var auxFilter = this._aFilter[0];
         auxFilter.aFilters[0] = new Filter("Manager", FilterOperator.EQ, this.getCurrentUser());

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      onOtherTeams: function (oEvent) {
         this.getView().byId("otherTeamsButton").setType("Emphasized");
         this.getView().byId("myTeamButton").setType("Default");
         var auxFilter = this._aFilter[0];
         auxFilter.aFilters[0] = new Filter("FromUser", FilterOperator.EQ, this.getCurrentUser());

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      onUserFilter: function (oEvent) {
         var auxFilter = this._aFilter[0];
         var sKey = oEvent.getParameter("newValue");
         Object.entries(auxFilter.aFilters).forEach(oPath => {
            if(oPath[1].sPath === "ToUser") {
               auxFilter.aFilters.pop(oPath[0])
            }
         })
         auxFilter.aFilters.push(new Filter("ToUser", FilterOperator.EQ, sKey.toUpperCase()));

         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      }

   });
});