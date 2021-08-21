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

						this._checkEvaluator(oData.getParameter("data").FromUser);
					}.bind(this)
				}
			});
		},

		_checkEvaluator: function(sEvaluator) {
			if(sEvaluator !== this.getView().getModel("currentUser").getData()) {
				this.byId("gradeIndicator").setEnabled(false);
				this.byId("recommendationInput").setEnabled(false);
				this.byId("submitChangesButton").setVisible(false);
				this.byId("completedCheckBox").setVisible(false);
			}
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
			var career_lvl = this.getView().byId("userContainer").getBindingContext().getObject().CareerLevel;
			var SU = this.getView().byId("userContainer").getBindingContext().getObject().Su;
			var peg_Date = this.getView().byId("pegContainer").getBindingContext().getObject().SentAt;
			var project_ID = this.getView().byId("pegContainer").getBindingContext().getObject().ProjectId;
			var evaluator_name = this.getView().byId("pegContainer").getBindingContext().getObject().FromUser;
			var days_eval = this.getView().byId("pegContainer").getBindingContext().getObject().DaysEvaluated;
			var customer_name = this.getView().byId("projectContainer").getBindingContext().getObject().Customer;
			var project_name = this.getView().byId("projectContainer").getBindingContext().getObject().ProjectName;
			var project_man_name = this.getView().byId("projectContainer").getBindingContext().getObject().ProjectManager;
			var ratingPIE, descrPIE, recomPIE;
			var ratingPPM, descrPPM, recomPPM;
			var ratingSF, descrSF, recomSF;
			var ratingCF, descrCF, recomCF;
			var ratingEF, descrEF, recomEF;
			var ratingFE, descrFE, recomFE;

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

		onSubmitChanges: function(oEvent) {

		}

	});
});