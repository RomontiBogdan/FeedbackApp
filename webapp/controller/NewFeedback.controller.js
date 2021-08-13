sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Text",
  ],
  function (Controller, History, JSONModel, Dialog, Text) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.NewFeedback", {
      onInit: function () {
        var oData = {

          SkillCollection: [
            {
              Id: "0",
              Name: "Tehnical",
            },
            {
              Id: "1",
              Name: "Soft",
            },
            {
              Id: "2",
              Name: "Other",
            },
          ],
        };

        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "newFeedbackModel");
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter .getRoute("newfeedback").attachPatternMatched(this._onObjectMatched, this);
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

      onSend: function () {

        var params = {
          FeedbackId: "",
          FromUser: "",
          ToUser:this.getView().byId("inputToUser").getValue(),
          Project: this.getView().byId("inputToProject").getValue(),
          SentAt: "",
          Type: "",
          Anonymous:"",
          Categories: this.getView().byId("inputSkill").getValue(),
          Rating: this.getView().byId("inputRating").getValue(),
          Description: "",
        }


        var oModel = this.getOwnerComponent().getModel();

        oModel.create('/UsernamesSet', params, {
          success: function(oCreatedEntry) {
            MessageBox.information("Succes", {
              onClose: function(oAction) {
                if (oAction == "OK") {
                  var oRouter = this.getOwnerComponent().getRouter();
                  oRouter.navTo("overview");
                }
              }.bind(this)
            });
  
          }.bind(this),
          error: function(oError) { sap.m.MessageToast.show("Feedback failed to send") }
          });
      },


      onUserChange : function(oEvent)
      {
        var SelectedItem = this.getView().byId("inputToUser").getSelectedItem().getText();
        this.getView().bindElement({
          path: "/UserPassSet('" +  SelectedItem + "')"
          });
      }
    });
  });
