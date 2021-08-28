sap.ui.define([
   "./BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/ui/export/Spreadsheet",
   "sap/m/MessageToast",
   "../model/formatter"
], function (BaseController, JSONModel, Spreadsheet, MessageToast, formatter) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.ManagerFeedback", {
      formatter: formatter,
      onInit: function () {
         var oData = {
            EvaluatedDays: [
               {
                  Id: "0",
                  Name: "Less than 90 days",
               },
               {
                  Id: "1",
                  Name: "Between 90 and 180 days",
               },
               {
                  Id: "2",
                  Name: "More than 180 days",
               },
            ],
         };

         var oModel = new JSONModel(oData);
         this.getView().setModel(oModel, "DaysEvaluatedModel");

         var oRouter = this.getRouter();
         oRouter.getRoute("managerFeedback").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         this._sFeedbackId = oEvent.getParameter("arguments").pegID;
         var oDetailPEG = this.getView().byId("pegContainer");

         oDetailPEG.bindElement({
            path: "/PegReqSet(" + this._sFeedbackId + ")",
            events: {
               dataReceived: function (oData) {
                  var oUserDetail = this.getView().byId("userContainer");
                  var sUsername = oData.getParameter("data").ToUser;
                  oUserDetail.bindElement({ path: "/UserPassSet('" + sUsername + "')" });

                  var oProjectDetail = this.getView().byId("projectContainer");
                  var sProjectId = oData.getParameter("data").ProjectId;
                  oProjectDetail.bindElement({ path: "/ProjectDetailsSet('" + sProjectId + "')" });

                  var oCriteriaTable = this.getView().byId("pegTable");
                  oCriteriaTable.bindElement({ path: "/PegReqSet(" + this._sFeedbackId + ")" })

                  var oFieldsForUpdate = this.getView().byId("toUpdateFields");
                  oFieldsForUpdate.bindElement({ path: "/PegReqSet(" + this._sFeedbackId + ")" })

                  this._checkEvaluator(oData.getParameter("data").FromUser);

                  this.getView().byId("exportButton").setVisible(oData.getParameter("data").Status === "2");
               }.bind(this)
            }
         });
      },

      _checkEvaluator: function (sEvaluator) {
         if (sEvaluator !== this.getCurrentUser()) {
            this._toggleRightsToEdit(false);
         } else {
            this._toggleRightsToEdit(true);
            this._currentPegStatus().then(function (bReturnedValue) {
               if (bReturnedValue) {
                  var oModel = this.getView().byId("pegContainer").getModel();
                  oModel.update("/PegReqSet(" + this._sFeedbackId + ")", { Status: "1" }, {
                     merge: true,
                     success: function () {
                        MessageToast.show("This PEG is now on Pending!");
                     }
                  });
               }
            }.bind(this))
         }
      },

      _toggleRightsToEdit: function (bRight) {
         this.byId("gradeIndicator").setEditable(bRight);
         this.byId("recommendationInput").setEditable(bRight);
         this.byId("submitChangesButton").setVisible(bRight);
         this.byId("completedCheckBox").setVisible(bRight);
         this.byId("daysEvaluatedSelect").setVisible(bRight);
      },

      // check if current peg status is new or not
      // returns: true if new ("0"); otherwhise false
      _currentPegStatus: function () {
         var oModel = this.getOwnerComponent().getModel();
         return new Promise((resolve, reject) => {
            oModel.read("/PegReqSet(" + this._sFeedbackId + ")", {
               success: function (oData) {
                  resolve(oData.Status === "0")
               }
            })
         })
      },

      _createColumnConfig: function () {
         return [
            {
               label: ' ',
               property: 'Descr',
               width: '40',
               scale: 0
            },
            {
               label: ' ',
               property: 'Value',
               width: '25'
            },
            {
               label: ' ',
               property: 'Descr_rating',
               width: '25'
            },
            {
               label: ' ',
               property: 'Recommendations',
               width: '25'
            }
         ];
      },

      _fillModel: function () {
         var oUserContainerObj = this.getView().byId("userContainer").getBindingContext().getObject();
         var oPegContainerObj = this.getView().byId("pegContainer").getBindingContext().getObject();
         var oProjectContainerObj = this.getView().byId("projectContainer").getBindingContext().getObject();
         var sFiscal_Year = oUserContainerObj.FiscalYear;
         var sPersonnelNumber = oUserContainerObj.PersonalNo;
         var sCareerLvl = formatter.careerLevel(oUserContainerObj.CareerLevel);
         var sSU = oUserContainerObj.Su;
         var sPegDate = formatter.timestamp(oPegContainerObj.SentAt);
         var sProjectID = oPegContainerObj.ProjectId;
         var sEvaluatorName = oPegContainerObj.FromUser;
         var sDaysEval = formatter.daysEvaluated(oPegContainerObj.DaysEvaluated);
         var sCustomerName = oProjectContainerObj.Customer;
         var sProjectName = oProjectContainerObj.ProjectName;
         var sProjectManName = oProjectContainerObj.ProjectManager;


         var iRowIndex = 0;  // For First row in the table
         var oTable = this.getView().byId("pegTable"),
            oModel = oTable.getModel(),
            aItems = oTable.getItems();

         if (iRowIndex < aItems.length) {
            oModel.getProperty("Grade", aItems[iRowIndex].getBindingContext());
         }
         var iNumberOfCriterias = 6;
         var aRatings = [];
         var aDescr = [];
         var aRecommendations = [];
         var oItemsBindingContext;

         while (iRowIndex < iNumberOfCriterias) {
            oItemsBindingContext = aItems[iRowIndex].getBindingContext();
            aRatings.push(oModel.getProperty("Grade", oItemsBindingContext) + " Stars");
            aDescr.push(formatter.gradeDescription(oModel.getProperty("Grade", oItemsBindingContext)));
            aRecommendations.push(oModel.getProperty("Recommendation", oItemsBindingContext));
            iRowIndex++;
         }

         var oViewModel = new JSONModel([{
            Descr: "Fiscal year",
            Value: sFiscal_Year
         },
         {
            Descr: "Personnel number",
            Value: sPersonnelNumber
         },
         {
            Descr: "Current career level",
            Value: sCareerLvl
         },
         {
            Descr: "Organizational assignment (SU)",
            Value: sSU
         },
         {
            Descr: "Date of PEG",
            Value: sPegDate
         },
         {
            Descr: "Project ID",
            Value: sProjectID
         },
         {
            Descr: "Customer name",
            Value: sCustomerName
         },
         {
            Descr: "Name of the Project",
            Value: sProjectName
         },
         {
            Descr: "Name of the Project Manager",
            Value: sProjectManName
         },
         {
            Descr: "Name of the Evaluator",
            Value: sEvaluatorName
         },
         {
            Descr: "Number of project days evaluated",
            Value: sDaysEval
         },
         {
            Descr: "",
            Value: ""
         },
         {
            Descr: "Criteria",
            Value: "Rating",
            Descr_rating: "Description of the rating",
            Recommendations: "Recommendations / Comments"
         },
         {
            Descr: "Professional and Industry Experience",
            Value: aRatings[0],
            Descr_rating: aDescr[0],
            Recommendations: aRecommendations[0]
         },
         {
            Descr: "Project and Program Management",
            Value: aRatings[1],
            Descr_rating: aDescr[1],
            Recommendations: aRecommendations[1]
         },
         {
            Descr: "Strategy Focus",
            Value: aRatings[2],
            Descr_rating: aDescr[2],
            Recommendations: aRecommendations[2]
         },
         {
            Descr: "Customer Focus",
            Value: aRatings[3],
            Descr_rating: aDescr[3],
            Recommendations: aRecommendations[3]
         },
         {
            Descr: "Employee Focus",
            Value: aRatings[4],
            Descr_rating: aDescr[4],
            Recommendations: aRecommendations[4]
         },
         {
            Descr: "Focus on Excellence",
            Value: aRatings[5],
            Descr_rating: aDescr[5],
            Recommendations: aRecommendations[5]
         }]);

         this.getView().setModel(oViewModel, "DataForExport");

      },

      onExport: function (oEvent) {
         var aCols, aProducts, oSettings, oSheet;
         this._fillModel();

         aCols = this._createColumnConfig();
         aProducts = this.getView().getModel("DataForExport").getProperty('/');

         oSettings = {
            workbook: { columns: aCols },
            dataSource: aProducts,
            fileName: "PEG " + this.getView().byId("projectContainer").getBindingContext().getObject().ProjectName + ".xlsx"
         };

         oSheet = new Spreadsheet(oSettings);
         oSheet.build()
            .then(function () {
               MessageToast.show('Spreadsheet export has finished');
            })
            .finally(oSheet.destroy);
      },

      onNavBack: function () {
         var oModel = this.getView().byId("pegTable").getModel();
         oModel.resetChanges();
         this.navBack();
      },

      onToggleStatus: function (oEvent) {
         var oModel = this.byId("pegTable").getModel()
         oModel.setProperty("/PegReqSet(" + this._sFeedbackId + "l)/Status",
            oEvent.getParameters().selected ? "2" : "1")
      },

      onSubmitChanges: function (oEvent) {
         var oCriteriasModel = this.getView().byId("pegTable").getModel();
         if (!oCriteriasModel.hasPendingChanges()) {
            return;
         }
         oCriteriasModel.setUseBatch(true);
         Object.keys(oCriteriasModel.getPendingChanges()).forEach(sPath => {
            // below method usage: setProperty(path, newValue)
            // effect: to string property conversion
            if (oCriteriasModel.getProperty("/" + sPath + "/Grade") !== undefined) {
               oCriteriasModel.setProperty("/" + sPath + "/Grade",
                  oCriteriasModel.getProperty("/" + sPath + "/Grade") + '')
            }
            // effect: toggle status pending / completed depeding on checkbox
            if (oCriteriasModel.getProperty("/" + sPath + "/Status") !== undefined) {
               oCriteriasModel.setProperty("/" + sPath + "/Status",
                  this.byId("completedCheckBox").getSelected() ? "2" : "1")
            }
         })
         this._criteriaBatchUpdate(oCriteriasModel)
            .then(sResponse => MessageToast.show(sResponse))
            .catch(sError => MessageToast.show(sError))
            .finally(oCriteriasModel.setUseBatch(false))

         // toggle export button visibility
         this.byId("exportButton").setVisible(this.byId("completedCheckBox").getSelected())
      },

      _criteriaBatchUpdate: function (oModel) {
         return new Promise((resolve, reject) => {
            oModel.submitChanges();
            oModel.attachRequestCompleted(function (oEvent) {
               if (oEvent.getParameters("success")) {
                  resolve("The information was updated successfully!");
               } else {
                  reject("Update failed!")
               }
            });
         })
      }
   });
});