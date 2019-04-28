/**
 * Utility functions to be used across the application.
 */
import $ from 'jquery';
//U8WuKO6I7Z4KLmc7XOosaA
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
            jsonpCallback: "tasteDiveResponse",
            success: callbackMethod
        });
    },

    getMovieDdetailsFromTheMovieDB( callbackMethod ) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/550?api_key=932c31084769d92ba38fed76fd2fab24",
            dataType: "json",
            success: callbackMethod
        });
    },
    getMovieListWithGeners( callbackMethod, param ) {
        $.ajax({
            url: "https://api.themoviedb.org/3/discover/movie?api_key=932c31084769d92ba38fed76fd2fab24",
            dataType: "json",
            data: { ...param },
            success: callbackMethod
        });
    },
    getTrending( callbackMethod, params ) {

            $.ajax({
                url: "https://api.themoviedb.org/3/trending/all/week?api_key=932c31084769d92ba38fed76fd2fab24",
                dataType: "json",
                data: { ...params },
                success: callbackMethod
            });
    },
    getResultsFromYouTube( param,callbackMethod ) {

            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAZlF0L7IxxWK0fYZCZQRxFztRNUm-pWP4&part=snippet",
                dataType: "json",
                data:{ ...param },
                success: callbackMethod
            });
    },

    /**
     * Ajax request utility.
     */
    ajax: $.ajax
};

export default Utils;
