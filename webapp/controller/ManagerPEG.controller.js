sap.ui.define([
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"


], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
    "use strict";
    return BaseController.extend("sap.ui.demo.walkthrough.controller.ManagerPEG", {
        formatter: formatter,
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("managerpeg").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            this.sUsername = oEvent.getParameter("arguments").Username;
            this.getView().bindElement({
                path: "/UserPassSet('" + this.sUsername + "')"
            });

            this.aFilter = [];
            this.aFilter.push(new Filter({
                filters: [
                    new Filter("ToUser", FilterOperator.EQ, this.sUsername),
                    new Filter("FromUser", FilterOperator.EQ, this.sUsername),
                ],
                and: true,
            }));

            var oList = this.byId("PegTableManager");
            var oBinding = oList.getBinding("items");
            oBinding.filter(this.aFilter);
        },

        onNavBack: function () {
            this.navBack();
        },

        onFilterEmployee: function (oEvent) {
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");

            if (this.getView().byId("PendingSwitch").getState()) {
                aFilter.push(new Filter({
                    filters: [
                        new Filter("Status", FilterOperator.EQ, false),
                        new Filter("Employee", FilterOperator.Contains, sQuery),
                    ],
                    and: true,
                }));
            }
            else
                aFilter.push(new Filter("Employee", FilterOperator.Contains, sQuery));

            var oList = this.byId("PegTableManager");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },

        onPendingFilter: function (oEvent) {
            var aFilter = [];
            var sInput = this.getView().byId("sfInput").getValue()
            if (oEvent.getParameter("state") == true) {
                aFilter.push(new Filter({
                    filters: [
                        new Filter("Status", FilterOperator.EQ, false),
                        new Filter("Employee", FilterOperator.Contains, sInput),
                    ],
                    and: true,
                }));
            }
            else {
                aFilter.push(new Filter("Employee", FilterOperator.Contains, sInput));
            }
            var oList = this.byId("PegTableManager");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },

        onFilterSelect: function (oEvent) {
            var sKey = oEvent.getParameter("key");
            var auxFilter = this.aFilter[0];
            if (sKey === "New") {
                auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "0")
            }
            else if (sKey === "Pending") {
                auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "1")
            }
            else if (sKey === "Completed") {
                auxFilter.aFilters[2] = new Filter("Status", FilterOperator.EQ, "2")
            }
            else if(auxFilter.aFilters.length > 2){
                auxFilter.aFilters.pop(2);
            }

            var oList = this.byId("PegTableManager");
            var oBinding = oList.getBinding("items");
            oBinding.filter(auxFilter);
        },

        onPegPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oBindingObject = oItem.getBindingContext().getObject();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("managerFeedback", {
                pegID: oBindingObject.FeedbackId,
                Username: this.sUsername
            });
        },

        onNewRequest: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("requestpeg", { Username: this.sUsername });
        },


    });
});