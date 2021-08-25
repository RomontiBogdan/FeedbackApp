sap.ui.define([], function () {
   "use strict";
   return {
      pegStatus: function (sStatusValue) {
         switch (sStatusValue) {
            case "0":
               return "New";
            case "1":
               return "Pending";
            case "2":
               return "Completed";
         }
      },

      feedbackRating: function (sRating) {
         switch (sRating) {
            case "1":
               return "Disappointing";
            case "2":
               return "Mediocre";
            case "3":
               return "Average";
            case "4":
               return "Good";
            case "5":
               return "Excellent";
         }
      },

      feedbackCategory: function (sCategory) {
         switch (sCategory) {
            case "0":
               return "Technical";
            case "1":
               return "Soft";
            case "2":
               return "Other";
         }
      },

      feedbackAnonymous: function (sName, bAnonVal) {
         if (bAnonVal)
            return "Anonymous";
         return sName;
      },

      highlightStatus: function (sStatus) {
         switch (sStatus) {
            case "0":
               return "Error";
            case "1":
               return "Warning";
            case "2":
               return "Success";
         }
      },

      timestamp: function (sTimestamp) {
         return sTimestamp !== null ? sTimestamp.toLocaleString() : "";
      },

      daysEvaluated: function (sDays) {
         switch (sDays) {
            case "0":
               return "Less than 90 days";
            case "1":
               return "Between 90 and 180 days";
            case "2":
               return "More than 180 days";
         }
      },

      gradeDescription: function (sGrade) {
         switch (sGrade.toString()) {
            case "0":
               return "Not assessable at this time";
            case "1":
               return "Does not meet expectations";
            case "2":
               return "Partially meets expectations";
            case "3":
               return "Fully meets expectations";
            case "4":
               return "Exceeds expectations";
         }
      },

      criteriaDescription: function (sCriteria) {
         switch (sCriteria) {
            case "1":
               return "Professional and Industry Experience";
            case "2":
               return "Project and Program Management";
            case "3":
               return "Strategy Focus";
            case "4":
               return "Customer Focus";
            case "5":
               return "Employee Focus";
            case "6":
               return "Focus on Excellence";
         }
      },

      careerLevel: function (sLevel) {
         switch (sLevel) {
            case "0":
               return "Junior Consultant";
            case "1":
               return "Consultant";
            case "2":
               return "Senior Consultant";
            case "3":
               return "Manager";
            case "4":
               return "Senior Manager";
            case "5":
               return "Lead Manager";
         }
      },
      checkBoxStatus: function (sStatus) {
         return sStatus === "2"
      }
   };
});