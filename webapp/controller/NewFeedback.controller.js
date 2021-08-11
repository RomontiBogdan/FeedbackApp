sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History",
  'sap/ui/model/json/JSONModel'

], function (Controller, History, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.NewFeedback", {
      onInit: function () {
         
        var oData = {
          UsersCollection: [
              {
                  Id: "0",
                  Name: "User"
              },
              {
                  Id: "1",
                  Name: "Random"      
              },
              {
                  Id: "2",
                  Name: "Adgfdg"      
              },
              {
                  Id: "3",
                  Name: "Lalalala"        
              },
              {
                  Id: "4",
                  Name: "Neata buna"
              },
              {
                  Id: "5",
                  Name: "Auf Wiedersehen"
              }   
          ],

          SkillCollection:[
            {
              Id: "0",
              Name: "Cognitive"
          },
          {
              Id: "1",
              Name: "Interpersonal"      
          },
          {
            Id: "2",
            Name: "Self-leadership"      
          },
          {
              Id: "3",
              Name: "Tehnical"      
          }
          ]
      };

        var oModel = new JSONModel(oData);
			  this.getView().setModel(oModel);
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("newfeedback").attachPatternMatched(this._onObjectMatched, this);
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
    });
  }
);
