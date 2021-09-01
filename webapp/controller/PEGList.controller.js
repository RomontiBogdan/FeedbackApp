sap.ui.define([
   "./BaseController",
   "../model/formatter",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"
], function (BaseController, formatter, Filter, FilterOperator) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.PEGList", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getRouter();
         oRouter.getRoute("peglist").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         if(sessionStorage.getItem("username") === null)
         {
            this.userValidator();
         }
         else
         {
            this.getView().bindElement({
               path: "/UserPassSet('" + sessionStorage.getItem("username") + "')"
            });

            this._aFilter = [];
            this._aFilter.push(new Filter({
               filters: [
                  new Filter("ToUser", FilterOperator.EQ, sessionStorage.getItem("username")),
                  new Filter("FromUser", FilterOperator.EQ, sessionStorage.getItem("username")),
               ],
               and: true,
            }));

            var oList = this.byId("PegTableManager");
            var oBinding = oList.getBinding("items");
            oBinding.filter(this._aFilter);

            if(sessionStorage.getItem("careerLevel") === "5")
               this.getView().byId("newPegRequest").setVisible(false);
            else
               this.getView().byId("newPegRequest").setVisible(true);

            this.byId("PegTableManager").getModel().updateBindings(true);                   
         }
      },

      onNavBack: function () {
         this.navBack();
      },

      onFilterSelect: function (oEvent) {
         var sKey = oEvent.getParameter("key");
         var auxFilter = this._aFilter[0];
         if (sKey === "New") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "0")
         }
         else if (sKey === "Pending") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "1")
         }
         else if (sKey === "Completed") {
            auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "2")
         }
         else if (auxFilter.aFilters.length > 2) {
            auxFilter.aFilters.pop(2);
         }

         var oList = this.byId("PegTableManager");
         var oBinding = oList.getBinding("items");
         oBinding.filter(auxFilter);
      },

      onPegPress: function (oEvent) {
         var oItem = oEvent.getSource();
         var oBindingObject = oItem.getBindingContext().getObject();
         var oRouter = this.getRouter();
         oRouter.navTo("managerFeedback", {
            pegID: oBindingObject.FeedbackId
         });
      },

      onNewRequest: function (oEvent) {
         var oRouter = this.getRouter();
         oRouter.navTo("requestpeg");

      }
      //,


      // onPEGFilter: function (oEvent) {
      //    var auxFilter = this._aFilter[0];
      //    var sKey = oEvent.getParameter("newValue");
        

      //    var oList = this.byId("PegTableManager");
      //    var oBinding = oList.getBinding("items");
      //    oBinding.filter(auxFilter);
      // }

     

   });
});