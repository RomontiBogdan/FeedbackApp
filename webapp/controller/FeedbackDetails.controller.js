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
					scale: 0
				},
				{
					label: 'Value',
					property: 'Value',
					width: '25'
				}
				];
		},

		onExport: function(oEvent) {
			var aCols, aProducts, oSettings, oSheet;

			var projectID = oEvent.getSource().getBindingContext().getObject().ProjectId;

			var oViewModel = new JSONModel([{
                Descr  : "Fiscal year",
                Value : ""
            },
			{
				Descr  : "Personnel number",
                Value : ""     
            },
			{
				Descr  : "Current career level",
                Value : ""      
            },
			{
				Descr  : "Organizational assignment (SU)",
                Value : ""      
            },
			{
				Descr  : "Date of PEG",
                Value : ""       
            },
			{
				Descr  : "Project ID",
                Value : projectID
            },
			{
				Descr  : "Customer name",
                Value : ""      
            },
			{
				Descr  : "Name of the Project",
                Value : ""      
            },
			{
				Descr  : "Name of the Project Manager",
                Value : ""      
            },
			{
				Descr  : "Name of the Evaluator",
                Value : ""      
            },
			{
				Descr  : "Number of project days evaluated",
                Value : ""      
            }]);

			oViewModel

			this.getView().setModel(oViewModel, "DataForExport");


			aCols = this.createColumnConfig();
			aProducts = this.getView().getModel("DataForExport").getProperty('/');

			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts
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