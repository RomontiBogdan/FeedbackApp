sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/export/library",
	"sap/ui/export/Spreadsheet",
	"sap/m/MessageToast"
	
], function (Controller, History, JSONModel, formatter, exportLibrary, Spreadsheet, MessageToast) {
	"use strict";
	var EdmType = exportLibrary.EdmType;
	return Controller.extend("sap.ui.demo.walkthrough.controller.FeedbackDetails", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("feedbackdetails").attachPatternMatched(this._onObjectMatched, this);

			
			//var projectID = this.getView().getProperty("ProjectID");
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

		_onObjectMatched: function (oEvent) {

		    var sFeedbackID = oEvent.getParameter("arguments").feedbackID;
			this.getView().bindElement({
				path: "/Feedback360Set(" + sFeedbackID + ")"
		    });
		},

		createColumnConfig: function() {
			return [
				{
					label: 'Descr',
					property: 'Descr',
					width: '40',
					scale: 0
				},
				{
					label: 'Value',
					property: 'Value',
					width: '25'
				}
				];
		},
		
		fillModel: function(oEvent) {

			var fiscal_year = oEvent.getSource().getBindingContext().getObject().FromUser;
			var personnel_number = oEvent.getSource().getBindingContext().getObject().FromUser;
			var career_lvl = oEvent.getSource().getBindingContext().getObject().FromUser;
			var SU = oEvent.getSource().getBindingContext().getObject().FromUser;
			var peg_Date = oEvent.getSource().getBindingContext().getObject().SentAt;
			var project_ID = oEvent.getSource().getBindingContext().getObject().ProjectId;
			var customer_name = oEvent.getSource().getBindingContext().getObject().FromUser;
			var project_name = oEvent.getSource().getBindingContext().getObject().FromUser;
			var project_man_name = oEvent.getSource().getBindingContext().getObject().FromUser;
			var evaluator_name = oEvent.getSource().getBindingContext().getObject().FromUser;
			var days_eval = oEvent.getSource().getBindingContext().getObject().FromUser;

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
				Descr  : "Number of project days evaluated",
                Value : ""      
            }]);

			this.getView().setModel(oViewModel, "DataForExport");

		},

		onExport: function(oEvent) {
			var aCols, aProducts, oSettings, oSheet;
			this.fillModel(oEvent);

			aCols = this.createColumnConfig();
			aProducts = this.getView().getModel("DataForExport").getProperty('/');

			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts,
				fileName: "PEG " + oEvent.getSource().getBindingContext().getObject().FromUser + ".xlsx"
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
		}

	});
});