const loginDetails = {
  "users": {
    "bhartiSharma27": {
      "password": "h",
        "username": "bhartiSharma27",
      "firstName": "Bharti",
      "lastName": "Sharma",
      "age": "24",
      "genres": [ 28, 35, 18 ],
        "similarMovieId": [  ],
      "preferredMediaType": [ "movie", "book", "music", "show" ],
      "primaryColor": "#e0e0e0",
      "secondaryColor": "#333333",
        "favorites": [],
        "similar": [ ],
        "language": "hi",
        "region":"IN",
        "certification_country": "IN",
        "with_original_language": "hi"
    },
    "mamoke88": {
      "password": "h",
        "similarMovieId": [  ],
        "username": "mamoke88",
      "firstName": "mamoke",
      "lastName": "",
      "age": "24",
      "genres": [ 28, 12, 16 ],
      "preferredMediaType": [ "movie", "music" ],
      "primaryColor": "#f9fbe7",
      "secondaryColor": "#4caf50",
        "similar": [ "Spirited Away", "Black Panther", "Halloween: The Curse Of Michael Myers", "Game Of Thrones" ],
      "favorites" : [{
        "Name": "Spirited Away",
        "Type": "movie",
        "wTeaser": "\nSpirited Away (Japanese: \u5343\u3068\u5343\u5c0b\u306e\u795e\u96a0\u3057, Hepburn: Sen to Chihiro no Kamikakushi, \"Sen and Chihiro's Spiriting Away\") is a 2001 Japanese animated coming-of-age fantasy film written and directed by Hayao Miyazaki, animated by Studio Ghibli for Tokuma Shoten, Nippon Television Network, Dentsu, Buena Vista Home Entertainment, Tohokushinsha Film and Mitsubishi and distributed by Toho. The film stars Rumi Hiiragi, Miyu Irino, Mari Natsuki, Takeshi Naito, Yasuko Sawaguchi, Tsunehiko Kamij\u014d, Takehiko Ono, and Bunta Sugawara, and tells the story of Chihiro Ogino (Hiiragi), a sullen 10-year-old girl who, while moving to a new neighborhood, enters the world of Kami (spirits) of Japanese Shinto folklore. After her parents are transformed into pigs by the witch Yubaba (Natsuki), Chihiro takes a job working in Yubaba's bathhouse to find a way to free herself and her parents and return to the human world.\n",
        "wUrl": "http://en.wikipedia.org/wiki/Spirited_Away", 
        "yUrl": "https://www.youtube-nocookie.com/embed/ByXuk9QqQkk",
        "yID": "ByXuk9QqQkk"},
        {"Name": "Black Panther",
        "Type": "movie",
        "wTeaser": "\nBlack Panther is a fictional superhero appearing in American comic books published by Marvel Comics. The character was created by writer-editor Stan Lee and writer-artist Jack Kirby, first appearing in Fantastic Four #52 (cover-dated July 1966) in the Silver Age of Comic Books. Black Panther's real name is T'Challa, king and protector of the fictional African nation of Wakanda. Along with possessing enhanced abilities achieved through ancient Wakandan rituals of drinking the essence of the heart-shaped herb, T'Challa also relies on his proficiency in science, rigorous physical training, hand-to-hand combat skills, and access to wealth and advanced Wakandan technology to combat his enemies.\n",
        "wUrl": "https://en.wikipedia.org/wiki/Black_Panther_(comics)",
        "yUrl": "https://www.youtube-nocookie.com/embed/xjDjIWPwcPU",
        "yID": "xjDjIWPwcPU"},
        {"Name": "Halloween: The Curse Of Michael Myers",
        "Type": "movie",
        "wTeaser": "Halloween: The Curse of Michael Myers is a 1995 American slasher film directed by Joe Chappelle and written by Daniel Farrands. The film stars Donald Pleasence in one of his final film appearances. The film also features the first starring role by Paul Rudd and Marianne Hagan. The sixth installment in the Halloween film series, it follows Dr. Sam Loomis coming out of retirement to face Michael Myers once more again. At his aid is Tommy Doyle, a returning character from the original Halloween film. Michael's niece, Jamie Lloyd, who first appeared in  Halloween 4: The Return of Michael Myers, also appears in a less prominent role. The plot of the film formally introduced the \"Curse of Thorn\", a mystical symbol that first appeared in Halloween 5: The Revenge of Michael Myers and revealed in the film to be the source of Michael Myers's immortality and drive to kill.",
        "wUrl": "https://en.wikipedia.org/wiki/Halloween:_The_Curse_of_Michael_Myers",
        "yUrl": "https://www.youtube-nocookie.com/embed/rAaPBxBxaV8",
        "yID": "rAaPBxBxaV8"},
        {"Name": "Game Of Thrones", "Type": "show", "wTeaser": "\n\n\n\nGame of Thrones is an American  fantasy drama television series created by David Benioff and D. B. Weiss. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels, the first of which is A Game of Thrones. The show is filmed in Belfast and elsewhere in Northern Ireland, Canada, Croatia, Iceland, Malta, Morocco, Scotland, Spain, and the United States. The series premiered on HBO in the United States on April 17, 2011, and will conclude with its eighth season, which will premiere on April 14, 2019.Set on the fictional continents of Westeros and Essos, Game of Thrones has several plots and a large ensemble cast, but follows three story arcs. The first arc is about the Iron Throne of the Seven Kingdoms, and follows a web of alliances and conflicts among the noble dynasties either vying to claim the throne or fighting for independence from it. The second story arc focuses on the last descendant of the realm's deposed ruling dynasty, who has been exiled and is plotting a return to the throne. The third story arc follows the Night's Watch, a longstanding brotherhood charged with defending the realm against the ancient threats of the fierce peoples and legendary creatures that lie far north of The Wall, and an impending winter that threatens the realm.\n", "wUrl": "http://en.wikipedia.org/wiki/Game_of_Thrones_(TV_series)", "yUrl": "https://www.youtube-nocookie.com/embed/BpJYNVhGf1s", "yID": "BpJYNVhGf1s"}]
    }
  }
};
const updateLoginDetailsFavorites= ( props, user ) => {
    loginDetails.users[ user ].favorites.push( props );
};
export default { updateLoginDetailsFavorites, loginDetails};