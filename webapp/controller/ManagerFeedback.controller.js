sap.ui.define([
	"../controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/export/library",
	"sap/ui/export/Spreadsheet",
	"sap/m/MessageToast"
	
], function (BaseController, JSONModel, library, Spreadsheet, MessageToast) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.ManagerFeedback", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("managerFeedback").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {

		    // var sPegID = oEvent.getParameter("arguments").pegID;
			// this.getView().bindElement({
			// 	path: "/PegReqSet(" + sPegID + ")"
		    // });

			var sProjectId  = this.byId("GenericTileProjectId").getSubheader();
			var sFeedbackId = oEvent.getParameter("arguments").pegID;

			var oDetailPEG = this.getView().byId("Container2");
		
			oDetailPEG.bindElement({ path:  "/PegReqSet("+ sFeedbackId + ")" ,
			events: {
				dataReceived: function(oData)
				{
					console.log(oData);

					var oUserDetail = this.getView().byId("Container1");

					oUserDetail.bindElement({ path:  "/UserPassSet('TEST')" });
	  
				  
					var oProjectDetail = this.getView().byId("Container3");
					var sProjectId  = oData.getParameter("data").ProjectId;
					oProjectDetail.bindElement({ path: "/ProjectDetailsSet('"+ sProjectId +"')" });

				}.bind(this)
			}
			});
			
		
		},


		createColumnConfig: function() {
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
		
		fillModel: function() {

			var fiscal_year = this.getView().byId("Container1").getBindingContext().getObject().FiscalYear;
			var personnel_number = this.getView().byId("Container1").getBindingContext().getObject().PersonalNo;
			var career_lvl = this.getView().byId("Container1").getBindingContext().getObject().CareerLevel;
			var SU = this.getView().byId("Container1").getBindingContext().getObject().Su;
			var peg_Date = this.getView().byId("Container2").getBindingContext().getObject().SentAt;
			var project_ID = this.getView().byId("Container2").getBindingContext().getObject().ProjectId;
			var customer_name = this.getView().byId("Container3").getBindingContext().getObject().Customer;
			var project_name = this.getView().byId("Container3").getBindingContext().getObject().ProjectName;
			var project_man_name = this.getView().byId("Container3").getBindingContext().getObject().ProjectManager;
			var evaluator_name = this.getView().byId("Container2").getBindingContext().getObject().FromUser;
			var days_eval = this.getView().byId("Container2").getBindingContext().getObject().DaysEvaluated;
			var ratingPIE, descrPIE, recomPIE;
			var ratingPPM, descrPPM, recomPPM;
			var ratingSF, descrSF, recomSF;
			var ratingCF, descrCF, recomCF;
			var ratingEF, descrEF, recomEF;
			var ratingFE, descrFE, recomFE;

			var oViewModel = new JSONModel([{
                Descr  : "Fiscal year",
                Value : fiscal_year
            },
			{
				Descr  : "Personnel number",
                Value : personnel_number 
            },
			{
				Descr  : "Current career level",
                Value : career_lvl      
            },
			{
				Descr  : "Organizational assignment (SU)",
                Value : SU
            },
			{
				Descr  : "Date of PEG",
                Value : peg_Date 
            },
			{
				Descr  : "Project ID",
                Value : project_ID
            },
			{
				Descr  : "Customer name",
                Value : customer_name   
            },
			{
				Descr  : "Name of the Project",
                Value : project_name      
            },
			{
				Descr  : "Name of the Project Manager",
                Value : project_man_name
            },
			{
				Descr  : "Name of the Evaluator",
                Value : evaluator_name  
            },
			{
				Descr  : "Number of project days evaluated",
                Value : days_eval
            },
			{
				Descr  : "",
                Value : ""      
            },
			{
				Descr  : "Criteria",
                Value : "Rating",
				Descr_rating : "Description of the rating",
				Recommendations : "Recommendations / Comments"
            },
			{
                Descr  : "Professional and Industry Experience",
                Value : ratingPIE,
				Descr_rating : descrPIE,
				Recommendations : recomPIE
            },
			{
                Descr  : "Project and Program Management",
                Value : ratingPPM,
				Descr_rating : descrPPM,
				Recommendations : recomPPM
            },
			{
                Descr  : "Strategy Focus",
                Value : ratingSF,
				Descr_rating : descrSF,
				Recommendations : recomSF
            },
			{
                Descr  : "Customer Focus",
                Value : ratingCF,
				Descr_rating : descrCF,
				Recommendations : recomCF
            },
			{
                Descr  : "Employee Focus",
                Value : ratingEF,
				Descr_rating : descrEF,
				Recommendations : recomEF
            },
			{
                Descr  : "Focus on Excellence",
                Value : ratingFE,
				Descr_rating : descrFE,
				Recommendations : recomFE
            }]);

			this.getView().setModel(oViewModel, "DataForExport");

		},

		onExport: function(oEvent) {
			var aCols, aProducts, oSettings, oSheet;
			this.fillModel();

			aCols = this.createColumnConfig();
			aProducts = this.getView().getModel("DataForExport").getProperty('/');

			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts,
				fileName: "PEG " + this.getView().byId("Container3").getBindingContext().getObject().ProjectName + ".xlsx"
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
		},
		

        onNavBack: function () {
			this.navBack();
		}

	});
});