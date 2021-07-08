//Listen for message
var randomnumber = function getRandomNumber(number) {
  var max = number + 1;
  return Math.floor(Math.random() * Math.floor(max));
};

// Genarete random date///////////////////////////////////////

var dob;

//set a range of years
var min = 2015;
var max = 2021;

// Math.ceil prevents the value from being 0;
var month = Math.ceil(Math.random() * 12);
var day = Math.ceil(Math.random() * 28);
var year = Math.floor(Math.random() * (max - min) + min);

//this ensures that the format will stay mm/dd/yyyy;
if (month < 10) {
  month = "0" + month;
}
if (day < 10) {
  day = "0" + day;
}
//concatenates random dob ;
dob = year + "-" + month + "-" + randomnumber;

// return dob;
// console.log(dob);

// function randomDate(start, end) {
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
//
// console.log(randomDate(new Date(2012, 0, 1), new Date()));

////////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name == "fetchWord") {
    const apikey = "9ywj4sxyspn2w4894sgjzaul4ffcdjv79jdzlhksfa4jtls21";
    const dateStr = new Date().toISOString().slice(0, 10); //2021-06-30

    console.log(dateStr);
    // const dateStr = randomDate(new Date(2000, 10, 23), new Date());

    const apiCall =
      "https://api.wordnik.com/v4/words.json/wordOfTheDay?date=" +
      dob +
      "&api_key=" +
      apikey;
    // console.log(apiCall);

    // We call api..
    fetch(apiCall)
      .then(function (res) {
        if (res.status !== 200) {
          response({
            word: "Error",
            desc: "There was a problem loading the word of the day",
          });
          return;
        }

        res.json().then(function (data) {
          response({ word: data.word, desc: data.note });
        });
      })
      .catch(function (err) {
        response({
          word: "Error",
          desc: "There was a problem loading the word of the day",
        });
      });
    // Wait for response...
    // send the response..

    // const wordObj = [
    //   " theology",
    //   " employee",
    //   "reglet ",
    //   "penanggalan ",
    //   "company",
    //   "volucrine ",
    //   "Gotham",
    //   "ziganka ",
    // ];
    // const wordDes = [
    //   " the study of religion",
    //   " a person who works for somebody",
    //   " strip for spacing between lines in printing",
    //   " female vampire of Malay mythology",
    //   "a business organization selling goods or services",
    //   "of, like or pertaining to birds; bird-like ",
    //   "1. a journalistic nickname for New York City. 2.an English village, proverbial for the foolishness of its inhabitants.",
    //   "Russian country dance",
    // // ];
    // var number = getRandomNumber(6);

    // response({ word: wordObj[number], desc: wordDes[number] });
    //send response
  }
  return true;
});
