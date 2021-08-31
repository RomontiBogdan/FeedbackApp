sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"

], function (UIComponent, JSONModel, ResourceModel) {
   "use strict";
   return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
      metadata: {
         "interfaces": ["sap.ui.core.IAsyncContentCreation"],
         "rootView": {
            "viewName": "sap.ui.demo.walkthrough.view.App",
            "type": "XML",
            /*"async": true, // implicitly set via the sap.ui.core.IAsyncContentCreation interface*/
            "id": "app"
         }
      },
      init: function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);

         this._Englishi18nModel = new ResourceModel({
            bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
         });
         this._Germani18nModel = new ResourceModel({
            bundleName: "sap.ui.demo.walkthrough.i18n.i18n_de"
         });
         
         if(sessionStorage.getItem("language") === "DE")
            this.setModel(this._Germani18nModel, "i18n");
         else
            this.setModel(this._Englishi18nModel, "i18n");

         this.getRouter().initialize();
      },

      setGermani18n: function () {
         this.setModel(this._Germani18nModel, "i18n");
         sessionStorage.setItem("language", "DE")
      },
      
      setEnglishi18n: function () {
         this.setModel(this._Englishi18nModel, "i18n");
         sessionStorage.setItem("language", "EN")
      }


   });
});
