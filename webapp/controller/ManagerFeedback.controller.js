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
	return Controller.extend("sap.ui.demo.walkthrough.controller.ManagerFeedback", {
		formatter: formatter,
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("managerFeedback").attachPatternMatched(this._onObjectMatched, this);

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
                Value : "{ProjectId}"      
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

			this.getView().setModel(oViewModel, "DataForExport");
		},

		_onObjectMatched: function (oEvent) {

		    var sPegID = oEvent.getParameter("arguments").pegID;
			this.getView().bindElement({
				path: "/PegReqSet(" + sPegID + ")"
		    });
		},

        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("managerpeg", {}, true);
			}
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

		onExport: function() {
			var aCols, aProducts, oSettings, oSheet;

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