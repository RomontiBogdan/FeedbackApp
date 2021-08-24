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
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.getRoute("managerFeedback").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
         var sFeedbackId = oEvent.getParameter("arguments").pegID;
         var oDetailPEG = this.getView().byId("pegContainer");

         oDetailPEG.bindElement({
            path: "/PegReqSet(" + sFeedbackId + ")",
            events: {
               dataReceived: function (oData) {
                  var oUserDetail = this.getView().byId("userContainer");
                  var sUsername = oData.getParameter("data").ToUser;
                  oUserDetail.bindElement({ path: "/UserPassSet('" + sUsername + "')" });

                  var oProjectDetail = this.getView().byId("projectContainer");
                  var sProjectId = oData.getParameter("data").ProjectId;
                  oProjectDetail.bindElement({ path: "/ProjectDetailsSet('" + sProjectId + "')" });

                  var oCriteriaTable = this.getView().byId("pegTable");
                  oCriteriaTable.bindElement({ path: "/PegReqSet(" + sFeedbackId + ")" })

                  this._checkEvaluator(oData.getParameter("data").FromUser, sFeedbackId);

				 if(oData.getParameter("data").Status !== "2")
		 			this.getView().byId("exportButton").setVisible(false);
				 else
				 	this.getView().byId("exportButton").setVisible(true);
				
               }.bind(this)
            }
         });
      },

      _checkEvaluator: function (sEvaluator, sFeedbackId) {
         if (sEvaluator !== this.getCurrentUser()) {
            this.byId("gradeIndicator").setEnabled(false);
            this.byId("recommendationInput").setEnabled(false);
            this.byId("submitChangesButton").setVisible(false);
            this.byId("completedCheckBox").setVisible(false);
         } else {
            this._currentPegStatus(sFeedbackId).then(function (bReturnedValue) {
               if (bReturnedValue) {
                  var oModel = this.getView().byId("pegContainer").getModel();
                  oModel.update("/PegReqSet(" + sFeedbackId + ")", { Status: "1" }, {
                     merge: true,
                     success: function () {
                        sap.m.MessageToast.show("This PEG is now on Pending!");
                     }
                  });
               }
            }.bind(this))
         }
      },

      // check if current peg status is new or not
      // returns: true if new ("0"); otherwhise false
      _currentPegStatus: function (sFeedbackId) {
         var oModel = this.getOwnerComponent().getModel();
         return new Promise(function (resolve, reject) {
            oModel.read("/PegReqSet(" + sFeedbackId + ")", {
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

        var fiscal_year = this.getView().byId("userContainer").getBindingContext().getObject().FiscalYear;
        var personnel_number = this.getView().byId("userContainer").getBindingContext().getObject().PersonalNo;
        var career_lvl = formatter.careerLevel(this.getView().byId("userContainer").getBindingContext().getObject().CareerLevel);
        var SU = this.getView().byId("userContainer").getBindingContext().getObject().Su;
        var peg_Date = formatter.timestamp(this.getView().byId("pegContainer").getBindingContext().getObject().SentAt);
        var project_ID = this.getView().byId("pegContainer").getBindingContext().getObject().ProjectId;
        var evaluator_name = this.getView().byId("pegContainer").getBindingContext().getObject().FromUser;
        var days_eval = formatter.daysEvaluated(this.getView().byId("pegContainer").getBindingContext().getObject().DaysEvaluated);
        var customer_name = this.getView().byId("projectContainer").getBindingContext().getObject().Customer;
        var project_name = this.getView().byId("projectContainer").getBindingContext().getObject().ProjectName;
        var project_man_name = this.getView().byId("projectContainer").getBindingContext().getObject().ProjectManager;


		var iRowIndex = 0;  //For First row in the table
		var oTable = this.getView().byId("pegTable"),
			oModel = oTable.getModel(),
			aItems = oTable.getItems();

		if(iRowIndex < aItems.length){
		oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext());
		}
         var ratingPIE = oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()) + " Stars";
		 var descrPIE = formatter.gradeDescription(oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()));
		 var recomPIE = oModel.getProperty("Recommendation",aItems[iRowIndex].getBindingContext());
		 iRowIndex++;
		 var ratingPPM = oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()) + " Stars";
		 var descrPPM = formatter.gradeDescription(oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()));
		 var recomPPM = oModel.getProperty("Recommendation",aItems[iRowIndex].getBindingContext());
		 iRowIndex++;
		 var ratingSF = oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()) + " Stars";
		 var descrSF = formatter.gradeDescription(oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()));
		 var recomSF = oModel.getProperty("Recommendation",aItems[iRowIndex].getBindingContext());
		 iRowIndex++;
		 var ratingCF = oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()) + " Stars";
		 var descrCF = formatter.gradeDescription(oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()));
		 var recomCF = oModel.getProperty("Recommendation",aItems[iRowIndex].getBindingContext());
		 iRowIndex++;
		 var ratingEF = oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()) + " Stars";
		 var descrEF = formatter.gradeDescription(oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()));
		 var recomEF = oModel.getProperty("Recommendation",aItems[iRowIndex].getBindingContext());
		 iRowIndex++;
		 var ratingFE = oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()) + " Stars";
		 var descrFE = formatter.gradeDescription(oModel.getProperty("Grade",aItems[iRowIndex].getBindingContext()));
		 var recomFE = oModel.getProperty("Recommendation",aItems[iRowIndex].getBindingContext());

         var oViewModel = new JSONModel([{
            Descr: "Fiscal year",
            Value: fiscal_year
         },
         {
            Descr: "Personnel number",
            Value: personnel_number
         },
         {
            Descr: "Current career level",
            Value: career_lvl
         },
         {
            Descr: "Organizational assignment (SU)",
            Value: SU
         },
         {
            Descr: "Date of PEG",
            Value: peg_Date
         },
         {
            Descr: "Project ID",
            Value: project_ID
         },
         {
            Descr: "Customer name",
            Value: customer_name
         },
         {
            Descr: "Name of the Project",
            Value: project_name
         },
         {
            Descr: "Name of the Project Manager",
            Value: project_man_name
         },
         {
            Descr: "Name of the Evaluator",
            Value: evaluator_name
         },
         {
            Descr: "Number of project days evaluated",
            Value: days_eval
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
            Value: ratingPIE,
            Descr_rating: descrPIE,
            Recommendations: recomPIE
         },
         {
            Descr: "Project and Program Management",
            Value: ratingPPM,
            Descr_rating: descrPPM,
            Recommendations: recomPPM
         },
         {
            Descr: "Strategy Focus",
            Value: ratingSF,
            Descr_rating: descrSF,
            Recommendations: recomSF
         },
         {
            Descr: "Customer Focus",
            Value: ratingCF,
            Descr_rating: descrCF,
            Recommendations: recomCF
         },
         {
            Descr: "Employee Focus",
            Value: ratingEF,
            Descr_rating: descrEF,
            Recommendations: recomEF
         },
         {
            Descr: "Focus on Excellence",
            Value: ratingFE,
            Descr_rating: descrFE,
            Recommendations: recomFE
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
         this.navBack();
      },

      onSubmitChanges: function (oEvent) {

      }

   });
});