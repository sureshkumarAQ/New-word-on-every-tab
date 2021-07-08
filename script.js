//Send Message to background
chrome.runtime.sendMessage({ name: "fetchWord" }, (response) => {
  //Wait for response

  console.log(response);

  document.querySelector("h1").innerHTML = response.word;
  document.querySelector("p").innerHTML = response.desc;
});
