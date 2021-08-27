sap.ui.define([
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel",
    
 
 ], function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap.ui.demo.walkthrough.controller.NewTeamFeedback", {
     
       onInit: function () {
       
         this.getView().byId("inputToMember").bindElement({
            path: "/TeamManagersSet('"+ this.getCurrentUser() +"')"
            });


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
            this.getView().setModel(oModel, "newTeamFeedbackModel");

            
       },

     
 
       onNavBack: function () {
          this.navBack();
       },
 
       onUserChange: function() {
        var SelectedItem = this.byId("inputToMember").getSelectedItem().getText();
        this.getView().bindElement({
           path: "/UserPassSet('" + SelectedItem + "')"
        });
     }


     
 
    });
 });