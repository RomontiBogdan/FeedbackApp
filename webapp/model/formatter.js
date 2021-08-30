sap.ui.define([], function () {
   "use strict";
   return {
      pegStatus: function (sStatusValue) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sStatusValue) {
            case "0":
               return oModel.getText("new");
            case "1":
               return oModel.getText("pending");
            case "2":
               return oModel.getText("completed");
         }
      },

      feedbackRating: function (sRating) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sRating) {
            case "1":
               return oModel.getText("disappointing");
            case "2":
               return oModel.getText("mediocre");
            case "3":
               return oModel.getText("average");
            case "4":
               return oModel.getText("good");
            case "5":
               return oModel.getText("excellent");
         }
      },

      feedbackCategory: function (sCategory) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sCategory) {
            case "0":
               return oModel.getText("technical");
            case "1":
               return oModel.getText("soft");
            case "2":
               return oModel.getText("other");
         }
      },

      highlightStatus: function (sStatus) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sStatus) {
            case "0":
               return oModel.getText("error");
            case "1":
               return oModel.getText("warning");
            case "2":
               return oModel.getText("success");
         }
      },

      timestamp: function (sTimestamp) {
         return sTimestamp !== null ? sTimestamp.toLocaleString() : "";
      },

      daysEvaluated: function (sDays) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sDays) {
            case "0":
               return oModel.getText("lessThan");
            case "1":
               return oModel.getText("between");
            case "2":
               return oModel.getText("moreThan");
         }
      },

      gradeDescription: function (sGrade) {
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

      criteriaDescription: function (sCriteria) {
         var oModel = this.getView().getModel("i18n").getResourceBundle();
         switch (sCriteria) {
            case "1":
               return oModel.getText("firstCriteria");
            case "2":
               return oModel.getText("secondCriteria");
            case "3":
               return oModel.getText("thirdCriteria");
            case "4":
               return oModel.getText("fourthCriteria");
            case "5":
               return oModel.getText("fifthCriteria");
            case "6":
               return oModel.getText("sixthCriteria");
         }
      },

      careerLevel: function (sLevel) {
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
      }
   };
});