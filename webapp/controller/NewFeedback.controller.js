sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
  ],
  function (Controller, History, JSONModel, MessageBox) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.NewFeedback", {
      onInit: function () {
        var oData = {

          SkillCollection: [
            {
              Id: "0",
              Name: "Technical",
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
        oRouter.getRoute("newfeedback").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        this.sUsername = oEvent.getParameter("arguments").Username;
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
          FeedbackId: Math.floor(Math.random() * 1000000000).toString(),
          FromUser: this.sUsername,
          ToUser: this.byId("inputToUser").getSelectedItem().getText(),
          Description: this.byId("inputDescription").getValue(),
          ProjectId: this.byId("inputToProject").getSelectedItem().getKey(),
          SentAt: "",
          Type: "",
          Categories: this.byId("inputSkill").getSelectedItem().getKey(),
          Rating: this.byId("inputRating").getValue().toString(),
          Anonymous: this.byId("AnonymousCB").getSelected() ? "X" : " "
        }

        if (params.ToUser === params.FromUser) {
          sap.m.MessageToast.show("You cannot send a feedback to yourself!")
        }
        else {
          var oModel = this.getOwnerComponent().getModel();

          oModel.create('/Feedback360Set', params, {
            success: function (oCreatedEntry) {
              MessageBox.information("Succes", {
                onClose: function (oAction) {
                  if (oAction === "OK") {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("FeedbackList", {
                      Username: this.sUsername
                    });
                  }
                }.bind(this)
              });

            }.bind(this),
            error: function (oError) { sap.m.MessageToast.show("Feedback failed to send!") }
          });
        }
      },

      onUserChange: function (oEvent) {
        var SelectedItem = this.byId("inputToUser").getSelectedItem().getText();
        this.getView().bindElement({
          path: "/UserPassSet('" + SelectedItem + "')"
        });
      }
    });
  });
