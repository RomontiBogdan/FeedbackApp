sap.ui.define([
    "../controller/BaseController",
    
 
 ], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.walkthrough.controller.NewTeamFeedback", {
     
       onInit: function () {
        this.getView().byId("inputToMember").bindElement({
            path: "/TeamManagersSet('"+ this.getCurrentUser() +"')"
            });
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