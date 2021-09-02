sap.ui.define([
   "./BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/ui/export/Spreadsheet",
   "sap/m/MessageToast",
   "../model/formatter"
], function (BaseController, JSONModel, Spreadsheet, MessageToast, formatter) {
   "use strict";
   return BaseController.extend("sap.ui.demo.walkthrough.controller.EditPEG", {
      formatter: formatter,
      onInit: function () {
         var oRouter = this.getRouter();
         oRouter.getRoute("editpeg").attachPatternMatched(this._onObjectMatched, this);
      },

      
      _onObjectMatched: function (oEvent) {
         if (sessionStorage.getItem("username") === null) {
            this.userValidator();
         } else {
            this._sFeedbackId = oEvent.getParameter("arguments").pegID;
            var oDetailPEG = this.getView().byId("pegContainer");

            oDetailPEG.bindElement({
               path: "/PegReqSet(" + this._sFeedbackId + ")",
               events: {
                  dataReceived: function (oData) {
                     var oUserDetail = this.getView().byId("userContainer");
                     var sUsername = oData.getParameter("data").ToUser;
                     oUserDetail.bindElement({
                        path: "/UserPassSet('" + sUsername + "')"
                     });

                     var oEvaluatorNameTile = this.getView().byId("evaluatorNameTile");
                     var sEvaluatorUsername = oData.getParameter("data").FromUser;
                     oEvaluatorNameTile.bindElement({
                        path: "/UserPassSet('" + sEvaluatorUsername + "')"
                     });

                     var oProjectDetail = this.getView().byId("projectContainer");
                     var sProjectId = oData.getParameter("data").ProjectId;
                     oProjectDetail.bindElement({
                        path: "/ProjectDetailsSet('" + sProjectId + "')",
                        events: {
                           dataReceived: function (oData) {
                              var oProjectManagerNameTile = this.getView().byId("projectManagerNameTile");
                              var sProjectManagerUsername = oData.getParameter("data").ProjectManager;
                              oProjectManagerNameTile.bindElement({
                                 path: "/UserPassSet('" + sProjectManagerUsername + "')"
                              });
                           }.bind(this)
                        }
                     });

                     var oCriteriaTable = this.getView().byId("pegTable");
                     oCriteriaTable.bindElement({
                        path: "/PegReqSet(" + this._sFeedbackId + ")"
                     })

                     var oFieldsForUpdate = this.getView().byId("toUpdateFields");
                     oFieldsForUpdate.bindElement({
                        path: "/PegReqSet(" + this._sFeedbackId + ")"
                     })

                     this._checkEvaluator(oData.getParameter("data").FromUser);

                     this.getView().byId("exportButton").setVisible(oData.getParameter("data").Status === "2");
                  }.bind(this)
               }
            });

            //set data model for number of days evaluated on view
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            var oData = {
               EvaluatedDays: [{
                     Id: "0",
                     Name: oi18nModel.getText("lessThan")
                  },
                  {
                     Id: "1",
                     Name: oi18nModel.getText("between")
                  },
                  {
                     Id: "2",
                     Name: oi18nModel.getText("moreThan")
                  },
               ],
            };

            var oModelEditable = new JSONModel({
               Editable: true
            });
            this.getView().setModel(oModelEditable, "Edit");

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "DaysEvaluatedModel");
            this.byId("pegTable").getModel().updateBindings(true);
         }
      },

      _checkEvaluator: function (sEvaluator) {
         if (sEvaluator !== sessionStorage.getItem("username")) {
            this._toggleRightsToEdit(false);
         } else {
            this._toggleRightsToEdit(true);
            var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
            this._currentPegStatus().then(function (bReturnedValue) {
               if (bReturnedValue) {
                  var oModel = this.getView().byId("pegContainer").getModel();
                  oModel.update("/PegReqSet(" + this._sFeedbackId + ")", {
                     Status: "1"
                  }, {
                     merge: true,
                     success: function () {
                        MessageToast.show(oi18nModel.getText("toPendingPEG"));
                     }
                  });
               }
            }.bind(this))
         }
      },

      _toggleRightsToEdit: function (bRight) {
         this.getView().getModel("Edit").setProperty("/Editable", bRight);
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
         return [{
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
         var oEvaluatorNameTile = this.getView().byId("evaluatorNameTile").getBindingContext().getObject();
         var oProjectManagerNameTile = this.getView().byId("projectManagerNameTile").getBindingContext().getObject();
         var sFiscal_Year = oUserContainerObj.FiscalYear;
         var sPersonnelNumber = oUserContainerObj.PersonalNo;
         var sCareerLvl = this._getCareerLevel(oUserContainerObj.CareerLevel);
         var sSU = oUserContainerObj.Su;
         var sPegDate = formatter.timestamp(oPegContainerObj.SentAt);
         var sProjectID = oPegContainerObj.ProjectId;
         var sEvaluatorName = oEvaluatorNameTile.FullName;
         var sEmployeeName = oUserContainerObj.FullName;
         var sDaysEval = this._getDaysEvaluated(oPegContainerObj.DaysEvaluated);
         var sCustomerName = oProjectContainerObj.Customer;
         var sProjectName = oProjectContainerObj.ProjectName;
         var sProjectManName = oProjectManagerNameTile.FullName;


         var iRowIndex = 0; // For First row in the table
         var oTable = this.getView().byId("pegTable");
         var oModel = oTable.getModel();
         var aItems = oTable.getItems();

         if (iRowIndex < aItems.length) {
            oModel.getProperty("Grade", aItems[iRowIndex].getBindingContext());
         }

         var iNumberOfCriterias = 6;
         var aRatings = [];
         var aDescr = [];
         var aRecommendations = [];
         var oItemsBindingContext;
         var sOverallRating;
         var iRating = 0;

         while (iRowIndex < iNumberOfCriterias) {
            oItemsBindingContext = aItems[iRowIndex].getBindingContext();
            iRating += parseFloat(oModel.getProperty("Grade", oItemsBindingContext));
            aRatings.push(oModel.getProperty("Grade", oItemsBindingContext) + " Stars");
            aDescr.push(this._getGradeDescription(oModel.getProperty("Grade", oItemsBindingContext)));
            aRecommendations.push(oModel.getProperty("Recommendation", oItemsBindingContext));
            iRowIndex++;
         }
         iRating /= 6;
         sOverallRating = iRating.toFixed(2).toString() + " Stars";

         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         var oViewModel = new JSONModel([{
               Descr: "PEG Evaluation"
            },
            {
               Descr: oi18nModel.getText("employeeName"),
               Value: sEmployeeName
            },
            {
               Descr: oi18nModel.getText("personnelNumber"),
               Value: sPersonnelNumber
            },
            {
               Descr: oi18nModel.getText("organizationalAssignment"),
               Value: sSU
            },
            {
               Descr: oi18nModel.getText("careerLevel"),
               Value: sCareerLvl
            },
            {
               Descr: oi18nModel.getText("fiscalYear"),
               Value: sFiscal_Year
            },
            {
               Descr: oi18nModel.getText("projectID"),
               Value: sProjectID
            },
            {
               Descr: oi18nModel.getText("projectName"),
               Value: sProjectName
            },
            {
               Descr: oi18nModel.getText("projectManagerName"),
               Value: sProjectManName
            },
            {
               Descr: oi18nModel.getText("customerName"),
               Value: sCustomerName
            },
            {
               Descr: oi18nModel.getText("evaluatorName"),
               Value: sEvaluatorName
            },
            {
               Descr: oi18nModel.getText("pegDate"),
               Value: sPegDate
            },
            {
               Descr: oi18nModel.getText("nrProjectDays"),
               Value: sDaysEval
            },
            {
               Descr: "",
               Value: ""
            },
            {
               Descr: oi18nModel.getText("criteria"),
               Value: oi18nModel.getText("ratingMax"),
               Descr_rating: oi18nModel.getText("ratingDescription"),
               Recommendations: oi18nModel.getText("recommendations")
            },
            {
               Descr: oi18nModel.getText("firstCriteria"),
               Value: aRatings[0],
               Descr_rating: aDescr[0],
               Recommendations: aRecommendations[0]
            },
            {
               Descr: oi18nModel.getText("secondCriteria"),
               Value: aRatings[1],
               Descr_rating: aDescr[1],
               Recommendations: aRecommendations[1]
            },
            {
               Descr: oi18nModel.getText("thirdCriteria"),
               Value: aRatings[2],
               Descr_rating: aDescr[2],
               Recommendations: aRecommendations[2]
            },
            {
               Descr: oi18nModel.getText("fourthCriteria"),
               Value: aRatings[3],
               Descr_rating: aDescr[3],
               Recommendations: aRecommendations[3]
            },
            {
               Descr: oi18nModel.getText("fifthCriteria"),
               Value: aRatings[4],
               Descr_rating: aDescr[4],
               Recommendations: aRecommendations[4]
            },
            {
               Descr: oi18nModel.getText("sixthCriteria"),
               Value: aRatings[5],
               Descr_rating: aDescr[5],
               Recommendations: aRecommendations[5]
            },
            {
               Descr: oi18nModel.getText("overall"),
               Value: sOverallRating
            }
         ]);

         this.getView().setModel(oViewModel, "DataForExport");
      },

      onExport: function (oEvent) {
         var aCols, aProducts, oSettings, oSheet;
         this._fillModel();

         aCols = this._createColumnConfig();
         aProducts = this.getView().getModel("DataForExport").getProperty('/');

         oSettings = {
            workbook: {
               columns: aCols
            },
            dataSource: aProducts,
            fileName: "PEG " + this.getView().byId("projectContainer").getBindingContext().getObject().ProjectName + ".xlsx"
         };

         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         oSheet = new Spreadsheet(oSettings);
         oSheet.build()
            .then(function () {
               MessageToast.show(oi18nModel.getText("spreadsheedExport"));
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
         var oi18nModel = this.getView().getModel("i18n").getResourceBundle();
         return new Promise((resolve, reject) => {
            oModel.submitChanges();
            oModel.attachRequestCompleted(function (oEvent) {
               if (oEvent.getParameters("success")) {
                  resolve(oi18nModel.getText("infoUpdated"));
               } else {
                  reject(oi18nModel.getText("infoError"))
               }
            });
         })
      },

      _getCareerLevel: function (sLevel) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sLevel) {
            case "0":
               return oModel.getText("careerLevelZero");
            case "1":
               return oModel.getText("careerLevelOne");
            case "2":
               return oModel.getText("careerLevelTwo");
            case "3":
               return oModel.getText("careerLevelThree");
            case "4":
               return oModel.getText("careerLevelFour");
            case "5":
               return oModel.getText("careerLevelFive");
         }
      },

      _getGradeDescription: function (sGrade) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sGrade.toString()) {
            case "0":
               return oModel.getText("gradeZero");
            case "1":
               return oModel.getText("gradeOne");
            case "2":
               return oModel.getText("gradeTwo");
            case "3":
               return oModel.getText("gradeThree");
            case "4":
               return oModel.getText("gradeFour");
         }
      },

      _getDaysEvaluated: function (sDays) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sDays) {
            case "0":
               return oModel.getText("lessThan");
            case "1":
               return oModel.getText("between");
            case "2":
               return oModel.getText("moreThan");
         }
      }
   });
});