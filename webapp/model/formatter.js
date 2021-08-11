sap.ui.define([], function () {
	"use strict";
	return {
		FeedbackStatus: function (statusValue)
		{
		    if (statusValue) {
                return "Completed";
            } else {
                return "Pending";
            }
		},
	};
});