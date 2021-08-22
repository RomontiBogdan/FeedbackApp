sap.ui.define(
  [
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
  ],
  function (BaseController,
    JSONModel,
    MessageBox) {
    "use strict";
    return BaseController.extend("sap.ui.demo.walkthrough.controller.NewFeedback", {
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
      },

      onNavBack: function () {
        this.navBack();
      },

      _validateData: function (oParams) {
        var exceptions = ""
        if (oParams.ToUser === oParams.FromUser) {
          exceptions += "You cannot send a feedback to yourself!\n"
        }
        if (oParams.ToUser === null) {
          exceptions += "Please select an user!\n"
        }
        if (oParams.Description === "") {
          exceptions += "Please insert a description!\n"
        }
        if (oParams.ProjectId === null) {
          exceptions += "Please select a project!\n"
        }
        if (oParams.Categories === null) {
          exceptions += "Please select a skill!\n"
        }
        if (oParams.Rating === "0") {
          exceptions += "Rating cannot be 0!\n"
        }
        return exceptions
      },

      onSend: function () {

        var params = {
          FeedbackId: "0",
          FromUser: this.getCurrentUser(),
          ToUser: this.byId("inputToUser").getSelectedItem() === null ? null : this.byId("inputToUser").getSelectedItem().getText(),
          Description: this.byId("inputDescription").getValue(),
          ProjectId: this.byId("inputToProject").getSelectedItem() === null ? null : this.byId("inputToProject").getSelectedItem().getKey(),
          SentAt: new Date(),
          Type: "X",
          Categories: this.byId("inputSkill").getSelectedItem() === null ? null : this.byId("inputSkill").getSelectedItem().getKey(),
          Rating: this.byId("inputRating").getValue().toString(),
          Anonymous: this.byId("AnonymousCB").getSelected() ? "X" : " "
        }

        var exceptions = this._validateData(params)
        if (exceptions !== "") {
          MessageBox.error(exceptions)
        }
        else {
          var oModel = this.getOwnerComponent().getModel();

          oModel.create('/Feedback360Set', params, {
            success: function (oCreatedEntry) {
              MessageBox.success("Feedback has been successfully sent!", {
                onClose: function (oAction) {
                  if (oAction === "OK") {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("FeedbackList");
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
