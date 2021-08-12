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
	};
});