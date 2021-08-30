sap.ui.define([
   "./BaseController",
   'sap/ui/model/json/JSONModel',
   "sap/m/MessageBox"

], function (BaseController, JSONModel, MessageBox) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.MyProfile", {
      onInit: function () {
         var oData = {
            Levels: [
               {
                  Id: "0",
                  Name: "Junior Consultant"
               },
               {
                  Id: "1",
                  Name: "Consultant"
               },
               {
                  Id: "2",
                  Name: "Senior Consultant"
               },
               {
                  Id: "3",
                  Name: "Manager"
               },
               {
                  Id: "4",
                  Name: "Senior Manager"
               },
               {
                  Id: "5",
                  Name: "Lead Manager"
               }
            ]
         };


         var oModel = new JSONModel(oData);
         this.getView().setModel(oModel, "myProfileModel");

         var oRouter = this.getRouter();
         oRouter.getRoute("myprofile").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         var sUsername = this.getCurrentUser();
         this.getView().bindElement({
            path: "/UserPassSet('" + sUsername + "')"
         });
      },

      onNavBack: function () {
         this.navBack();
      },


      _setFieldsState: function (bState) {
         var oView = this.getView();
         oView.byId("inputName").setEditable(bState);
         oView.byId("inputEmail").setEditable(bState);
         oView.byId("inputTel").setEditable(bState);
         oView.byId("inputSU").setEditable(bState);
      },


         _validateData: function (oParams) {
         var exceptions = ""
         if (oParams.FullName === "") {
            exceptions += "Please introduce your full name!\n"
         }
         if (oParams.Email === "") {
            exceptions += "Please introduce your email!\n"
         }
         if (oParams.PersonalNo === "") {
            exceptions += "Please introduce your personal number!\n"
         }
         if (oParams.Su === "") {
            exceptions += "Please introduce service unit!\n"
         }
        
         return exceptions
      },


      onEdit: function (oEvent) {
         this._setFieldsState(oEvent.getParameter("state"));

      },


      onPressSave: function () {
         var oModel = this.getView().getModel();
         oModel.setUseBatch(true);


         oModel.submitChanges({
            success: function (oData) {
               sap.m.MessageToast.show("The information was updated successfully!");
               oModel.setUseBatch(false);
            }
         });

         var params =  {
            FullName: this.getView().byId("inputName").getValue(),
            Username: "",
            Email: this.getView().byId("inputEmail").getValue(),
            Password: "",
            PersonalNo: this.getView().byId("inputTel").getValue(),
            Su: this.getView().byId("inputSU").getValue(),
            CareerLevel: "",
            FiscalYear: ""
         }
         var exceptions = this._validateData(params);
         if (exceptions !== "") {
            MessageBox.error(exceptions)
         }
         else {
        // var oModel = this.getOwnerComponent().getModel();

      //   var oModel = this.getView().getModel();
      //    oModel.setUseBatch(true);

         // oModel.create('/UserPassSet', params, {
         //    success: function (oCreatedEntry) {
         //       MessageBox.information("The information was updated successfully!", {
         //          // onClose: function (oAction) {
         //          //    if (oAction == "OK") {
         //          //       var oRouter = this.getOwnerComponent().getRouter();
         //          //       oRouter.navTo("myprofile");
         //          //    }
         //          // }.bind(this)
         //       });

         //    }.bind(this),
         //    error: function (oError) {
         //       sap.m.MessageToast.show(this.errorText(oError))
         //    }.bind(this)
         // });

          


 
      }

      }
     
   });
});