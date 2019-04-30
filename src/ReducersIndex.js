import _ from 'lodash';
const initialState = {
    "authUser":{
    },
    "users": {
        "dexter27": {
            "password": "password",
            "username": "dexter27",
            "firstName": "Dexter",
            "lastName": "",
            "age": "24",
            "genres": [ 28, 12, 35 ],
            "similarMovieId": [  ],
            "preferredMediaType": [ "movie", "book", "show" ],
            "primaryColor": "#e0e0e0",
            "secondaryColor": "#333333",
            "favorites": [
                {"Name": "Black Panther",
                    "Type": "movie",
                    "wTeaser": "\nBlack Panther is a fictional superhero appearing in American comic books published by Marvel Comics. The character was created by writer-editor Stan Lee and writer-artist Jack Kirby, first appearing in Fantastic Four #52 (cover-dated July 1966) in the Silver Age of Comic Books. Black Panther's real name is T'Challa, king and protector of the fictional African nation of Wakanda. Along with possessing enhanced abilities achieved through ancient Wakandan rituals of drinking the essence of the heart-shaped herb, T'Challa also relies on his proficiency in science, rigorous physical training, hand-to-hand combat skills, and access to wealth and advanced Wakandan technology to combat his enemies.\n",
                    "wUrl": "https://en.wikipedia.org/wiki/Black_Panther_(comics)",
                    "yUrl": "https://www.youtube-nocookie.com/embed/xjDjIWPwcPU",
                    "yID": "xjDjIWPwcPU"},
                {"Name": "Game Of Thrones", "Type": "book", "wTeaser": "\n\n\n\nGame of Thrones is an American  fantasy drama television series created by David Benioff and D. B. Weiss. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels, the first of which is A Game of Thrones. The show is filmed in Belfast and elsewhere in Northern Ireland, Canada, Croatia, Iceland, Malta, Morocco, Scotland, Spain, and the United States. The series premiered on HBO in the United States on April 17, 2011, and will conclude with its eighth season, which will premiere on April 14, 2019.Set on the fictional continents of Westeros and Essos, Game of Thrones has several plots and a large ensemble cast, but follows three story arcs. The first arc is about the Iron Throne of the Seven Kingdoms, and follows a web of alliances and conflicts among the noble dynasties either vying to claim the throne or fighting for independence from it. The second story arc focuses on the last descendant of the realm's deposed ruling dynasty, who has been exiled and is plotting a return to the throne. The third story arc follows the Night's Watch, a longstanding brotherhood charged with defending the realm against the ancient threats of the fierce peoples and legendary creatures that lie far north of The Wall, and an impending winter that threatens the realm.\n", "wUrl": "http://en.wikipedia.org/wiki/Game_of_Thrones_(TV_series)", "yUrl": "https://www.youtube-nocookie.com/embed/BpJYNVhGf1s", "yID": "BpJYNVhGf1s"}
            ],
            "similar": [ "Game Of Thrones", "Black Panther", "harry potter"  ],
            "language": "hi",
            "region":"IN",
            "certification_country": "IN",
            "with_original_language": "hi"
        },
        "Josephine88": {
            "password": "password",
            "similarMovieId": [ ],
            "username": "Josephine88",
            "firstName": "Josphine",
            "lastName": "",
            "age": "24",
            "genres": [ 16, 14, 10749 ],
            "preferredMediaType": [ "movie", "music" ],
            "primaryColor": "#f9fbe7",
            "secondaryColor": "#4caf50",
            "similar": [ "A star is born", "The Spectacular Now", "Maleficent", "Alice in Wonderland","taylor swift" ],
            "favorites" : []
        }
    }
};
function rootReducer(state = initialState, action) {

    if (action.type === "LOGGED_IN_USER") {
        state.authUser = {
            ...action.payload
        };
    } else if (action.type === "ADD_CARD_TO_FAV") {
        state.authUser.favorites.push({
            ...action.payload
        });
        //state.users[ state.authUser.username ].favorites.push( {  ...action.payload } );
        if ( action.payload.id === undefined ) {
            //state.users[ state.authUser.username ].similar.push( action.payload.Name );
            state.authUser.similar.push( action.payload.Name );
        } else {
            //state.users[ state.authUser.username ].similar.push( action.payload.title );
            state.authUser.similar.push( action.payload.title );
        }

        if ( action.payload.id !== undefined ) {
            state.authUser.similarMovieId.push( action.payload.id );
            //state.users[ state.authUser.username ].similarMovieId.push( action.payload.id );
        }
    }
    else if (action.type === "REMOVE_CARD_FROM_FAV") {
        state.authUser.favorites = _.remove( state.authUser.favorites, ( item ) => {
            if ( action.payload.Name === undefined ) {
                if ( action.payload.title !== item.title ) {
                    return true;
                }
            } else {
                if ( action.payload.Name !== item.Name ) {
                    return true;
                }
            }
        });
        state.authUser.similar = _.remove( state.authUser.similar, ( item ) => {
            if ( action.payload.Name === undefined ) {
                if ( action.payload.title !== item ) {
                    return true;
                }
            } else {
                if ( action.payload.Name !== item ) {
                    return true;
                }
            }

        });
    } else if ( "CREATE_NEW_USER" === action.type  ) {
        state.authUser = {
            ...action.payload
        };
        state.users[ action.payload.username ] = {
            ...action.payload
        };
    }
    return state;
}
export default rootReducer;