let display_news = document.getElementById("display_news");
let search_news = document.getElementById("search_news");
let search_news_button = document.getElementById("search_news_button");

//Making a function to fetch The World live top and breaking news headlines Datas
function pressOrClick() {
  let inputValue = search_news.value;
  let api_key = "1db62fd2b8a1487698c4b04553cd2743";

  //To Clear The Text Box After Typing
  if (!inputValue) {
    return;
  }
  // if (inputValue == null || inputValue == undefined){}

  fetch(
    `http://newsapi.org/v2/top-headlines?country=${inputValue}&apiKey=${api_key}`
  )
    .then((response) => response.json())
    .then((datas) => {
      console.log(datas);
      // To Clear the Text Box After Typing
      search_news.value = "";

      const news = datas.articles.map((entry) => {
        let newsItems = `<p>   
                                <br>
                                <a href="${entry.url}" class ="link"><b>${entry.title}</b></a>
                                <hr></hr>
                                <p>${entry.description} </p>
                                <img class="news_images"  src=${entry.urlToImage} >
                                <br>
                                </a>
        
                        </p>                   
                       `;
        return newsItems;
      });

      display_news.innerHTML = news.join(" ");
    });
}

//Calling a pressOrClick() functin when clicking the button
search_news_button.addEventListener("click", function () {
  pressOrClick();
});

//Calling a pressOrClick() functin when Pressing Enter Key
search_news.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    pressOrClick();
  }
});
