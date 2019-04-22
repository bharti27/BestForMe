/**
 * Utility functions to be used across the application.
 */
import $ from 'jquery';

const Utils = {

    store: {},

    /** Define Params as var params = {
    q: "",
    type: "",
    limit: ""
};
     * @param params
     * @returns {*}
     */
    getResultsFromTasteDive( params, callbackMethod ) {
        $.ajax({
            url: "https://tastedive.com/api/similar",
            data: { ...params, k: "333740-BestForM-IPA6GXYF", callback: "tasteDiveResponse" },
            dataType: "jsonp",
            jsonpCallback: "tasteDiveResponse"
        });

        let query = {
            ...params,
            key: "333740-BestForM-IPA6GXYF"
        };

        $.getJSON( "https://tastedive.com/api/similar?callback=?", query, callbackMethod);
    },

    /**
     * Ajax request utility.
     */
    ajax: $.ajax
};

export default Utils;
