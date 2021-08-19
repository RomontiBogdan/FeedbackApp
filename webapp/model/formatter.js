sap.ui.define([], function () {
	"use strict";
	return {
		FeedbackStatus: function (statusValue)
		{
		    if (statusValue) {
                return "Yes";
            } else {
                return "No";
            }
		},

		pegStatus: function (statusValue)
        {
            switch (statusValue) {
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
			if(bAnonVal)
				return "Anonymous";
			return sName;
		},
	};
});