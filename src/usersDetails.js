const loginDetails = {
  "users": {
    "bhartiSharma27": {
      "password": "helloWorld",
      "firstName": "Bharti",
      "lastName": "Sharma",
      "age": "24",
      "interest": [ "romance", "drama" ],
      "preferredMediaType": [ "book", "movie", "music" ],
      "primaryColor": "",
      "secondaryColor": "",
        "favorites": []
    },
    "mamoke88": {
      "password": "helloWorld",
      "firstName": "mamoke",
      "lastName": "",
      "age": "24",
      "interest": [ "romance", "drama", "" ],
      "preferredMediaType": [ "books", "movies" ],
      "primaryColor": "",
      "secondaryColor": "",
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
        "yID": "rAaPBxBxaV8"}]
    }
  }
};
const updateLoginDetailsFavorites= ( props, user ) => {
    loginDetails.users[ user ].favorites.push( props );
};
export default { updateLoginDetailsFavorites, loginDetails};