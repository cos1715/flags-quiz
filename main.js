"use strict";

const countries = [
  { name: "Albania", code: "AL" },
  { name: "Andorra", code: "AD" },
  { name: "Austria", code: "AT" },
  { name: "Belgium", code: "BE" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Bulgaria", code: "BG" },
  { name: "Croatia", code: "HR" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Estonia", code: "EE" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Greece", code: "GR" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "Ireland", code: "IE" },
  { name: "Italy", code: "IT" },
  // { name: "Kosovo", code: "XK" },
  { name: "Latvia", code: "LV" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Malta", code: "MT" },
  { name: "Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Montenegro", code: "ME" },
  { name: "Netherlands", code: "NL" },
  { name: "North Macedonia", code: "MK" },
  { name: "Norway", code: "NO" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Romania", code: "RO" },
  { name: "San Marino", code: "SM" },
  { name: "Serbia", code: "RS" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Spain", code: "ES" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Ukraine", code: "UA" },
  { name: "United Kingdom", code: "GB" },
  { name: "Vatican City", code: "VA" },
];

const domIds = {
  score: "score",
  flag: "flag-image",
  buttons: "buttons-container",
};

class FlagsQuiz {
  constructor(countries) {
    this.countries = countries;
    this.scoreNode = document.getElementById(domIds.score);
    this.imageNode = document.getElementById(domIds.flag);
    this.buttonsNode = document.getElementById(domIds.buttons);
    console.dir(this.buttonsNode);
  }
  score = 0;

  startGame = () => {
    this.buttonsNode.innerHTML = null;
    const randomCountry = this.getRandomCountry();
    this.imageNode.src = `https://flagsapi.com/${randomCountry.code}/shiny/64.png`;

    const countryOptions = this.getRandomCountryOptions(randomCountry);
    countryOptions.forEach((country) => {
      const button = document.createElement("button");
      button.textContent = country.name;
      button.classList.add("button");
      button.addEventListener("click", () =>
        this.checkAnswer(country, randomCountry)
      );
      this.buttonsNode.append(button);
    });
  };
  getRandomCountry = () => {
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    return this.countries[randomIndex];
  };
  shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  checkAnswer = (selectedCountry, correctCountry) => {
    if (selectedCountry === correctCountry) {
      this.score += 100;
    } else {
      this.score -= 50;
    }
    this.scoreNode.innerText = this.score;

    this.startGame();
  };

  getRandomCountryOptions = (correctCountry) => {
    const options = [correctCountry];
    while (options.length < 4) {
      const randomCountry = this.getRandomCountry();
      if (!options.includes(randomCountry)) {
        options.push(randomCountry);
      }
    }
    return this.shuffleArray(options);
  };
}

const flagsQuiz = new FlagsQuiz(countries);
flagsQuiz.startGame();
