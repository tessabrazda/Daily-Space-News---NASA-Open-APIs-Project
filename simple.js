var data = "";

async function getDailyImage(){
  var ApiString1 = "https://api.nasa.gov/planetary/apod?api_key=UeQ8VG39D3F1upETvn4gGcjMYHmJjKGywu0v8dOJ";
 
  var response1 = await fetch(ApiString1);
  var jsonData1 = await response1.json();

  var url = jsonData1.url;
  var altText = jsonData1.explanation;
  var title = jsonData1.title;

  document.getElementById("daily-image").src = "";
  document.getElementById("daily-image").alt = "";

  document.getElementById("daily-image").src = url;
  document.getElementById("daily-image").alt = altText;
  document.getElementById("body-text").innerHTML = altText;
  document.getElementById("title-text").innerHTML = '"' + title + '"';

  // check typescript for async with react (react is not async--> problem)
  //create 3 versions of the program - standard html stuff, react version, then combination? (fine for thursday)
}

 async function getSearch(){
  var searchTopic = document.getElementById("search-topic").value;
  var ApiString2 = "https://images-api.nasa.gov/search?q=" + searchTopic;
  var response = await fetch(ApiString2);
  var jsonData2 = await response.json();
  data = jsonData2;
  var i = parseInt(document.getElementById("img-num").innerHTML); //always resets to 0 when getSearch is called --> how and where? is this the reason the next/previous functions aren't working?
  var total = data.collection.items.length; //always returns 100??
  document.getElementById("total-img-num").innerHTML = total;
  setSearch(i);
}

async function setSearch(i){
  obj = data.collection.items[i];

  var image = obj.links[i].href;
  var title = obj.data[i].title;
  var description = obj.data[i].description;

  document.getElementById("search-image").src = image;
  document.getElementById("search-image").alt = title + ": " + description;
  document.getElementById("image-title").innerHTML = title;
  document.getElementById("image-text").innerHTML = description;
}

function next(){
  var index = document.getElementById("img-num").innerHTML;
  index = parseInt(index) + 1;
  document.getElementById("img-num").innerHTML = index;
  setSearch(index);
}

function previous(){
  var index = document.getElementById("img-num").innerHTML;
  index = parseInt(index) - 1;
  document.getElementById("img-num").innerHTML = index;
  setSearch(index);
}
