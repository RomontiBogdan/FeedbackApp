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
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         } else {
            var sUsername = sessionStorage.getItem("username");
            this.getView().bindElement({
               path: "/UserPassSet('" + sUsername + "')"
            });

            this._aFilter = [];
            this._isTeamManager(sUsername)
               .then(bReturnedValue => this._restrictIfNotTeamManager(bReturnedValue, sUsername))
               .catch(bReturnedValue => this._restrictIfNotTeamManager(bReturnedValue, sUsername))

            this.byId("MyTeamTable").getModel().updateBindings(true);
         }
      },

      //receives a boolean parameter that checks if the user logged is a manager
      _restrictIfNotTeamManager: function (bTeamManager, sUsername) {
         var sCriteria;
         if (bTeamManager) {
            //if the logged user is a manager, he is able to see the feedbacks requested by him to members from other teams as well
            this.getView().byId("buttonBar").setVisible(true);
            if (this.getView().byId("myTeamButton").getType() === "Emphasized") {
               sCriteria = "Manager";
            } else {
               sCriteria = "FromUser";
            }
            //restrict "Other teams" funcitonality for users that are not managers
         } else {
            this.getView().byId("buttonBar").setVisible(false);
            sCriteria = "FromUser";
         }

         this._aFilter.push(new Filter({
            filters: [
               new Filter(sCriteria, FilterOperator.EQ, sUsername),
            ],
            and: true
         }));

         //filter binding
         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(this._aFilter);
      },

      // check if user logged is manager or not
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

      //filter function for icon tab bars 
      onFilterSelect: function (oEvent) {

         //sKey stores the value of the icon tab bar
         var sKey = oEvent.getParameter("key");

         //initialize an auxiliar filter with the previous declared filter array
         // add on the first position of the previous initialized filter array the auxiliar filter
         var auxFilter = this._aFilter[0];

      
         if (sKey === "New") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "0")
         } else if (sKey === "Pending") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "1")
         } else if (sKey === "Completed") {
            auxFilter.aFilters[1] = new Filter("Status", FilterOperator.EQ, "2")
         } else if (auxFilter.aFilters.length > 1) {
            auxFilter.aFilters.pop(1);
         }

         //filter binding
         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      
      // navigate to review team member page with feedback id attached to the navigation route
      onPressTeamFeedback: function (oEvent) {
         var oItem = oEvent.getSource();
         var oBindingObject = oItem.getBindingContext().getObject();
         var oRouter = this.getRouter();
         oRouter.navTo("reviewteammember", {
            feedbackID: oBindingObject.FeedbackId
         });
      },

      //navigate to new team feedback view
      onNewFeedback: function () {
         var oRouter = this.getRouter();
         oRouter.navTo("newteamfeedback");
      },

      
      //event handler function for My Team button
      onMyTeam: function (oEvent) {
         this.getView().byId("myTeamButton").setType("Emphasized");
         this.getView().byId("otherTeamsButton").setType("Default");
         var auxFilter = this._aFilter[0];

         //creates a filter based on manager 
         auxFilter.aFilters[0] = new Filter("Manager", FilterOperator.EQ, sessionStorage.getItem("username"));

         //filter binding
         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      //event handler function for Other Teams button
      onOtherTeams: function (oEvent) {
         this.getView().byId("otherTeamsButton").setType("Emphasized");
         this.getView().byId("myTeamButton").setType("Default");
         var auxFilter = this._aFilter[0];

         //creates a filter based on "From user"
         auxFilter.aFilters[0] = new Filter("FromUser", FilterOperator.EQ, sessionStorage.getItem("username"));

         //filter binding
         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      //filter for search field by team member
      onUserFilter: function (oEvent) {
         
         var auxFilter = this._aFilter[0];
         //store the value entered in the search field
         var sKey = oEvent.getParameter("newValue");

         //delete filter action after every search value entered 
         Object.entries(auxFilter.aFilters).forEach(oPath => {
            if (oPath[1].sPath === "ToUser") {
               auxFilter.aFilters.pop(oPath[0])
            }
         })
        
         //add auxiliar filter after aFilter, based on "ToUser"
         //the value entered in search field will be taken over as written with uppercase letters
         auxFilter.aFilters.push(new Filter("ToUser", FilterOperator.EQ, sKey.toUpperCase()));

         //filter binding
         var oList = this.byId("MyTeamTable");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      }
   });
});