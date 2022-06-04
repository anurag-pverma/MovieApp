//styling search box

let query = document.getElementById("query");
let button = document.getElementById("button");
let movies_div = document.getElementById("movies");


// query.addEventListener("click", () => {
//     button.style.borderBottom = "1px solid rgb(31,128,224)";
//     query.style.borderBottom = "1px solid rgb(31,128,224)";
//     query.style.width = "400px";
//     query.style.borderTop = "0ch";
//     query.style.borderRight = "0ch";
//     query.style.borderLeft = "0ch";

// });

// query.addEventListener("focusout", () => {
//     button.style.borderBottom = "1px solid rgb(204,201,198)";
//     query.style.borderBottom = "1px solid rgb(204,201,198)";
//     query.style.width = "250px";
//     query.style.borderTop = "0ch";
//     query.style.borderRight = "0ch";
//     query.style.borderLeft = "0ch";

// })

let container = document.getElementById('slideContainer');

let nav = document.getElementById("nav");

query.style.borderBottom = "1px solid rgb(204,201,198)";

nav.addEventListener("click", () =>{
    movies_div.style.visibility = "hidden";

})
container.addEventListener("click", () =>{
    movies_div.style.visibility = "hidden";

})

//styling search box


//styling sliding div

let i = 0;
let j = 0;
function slide() {
    container.style.transform = 'translate(' + i + '%)';

    leftArrow.addEventListener("click", () => {
        if (j < 5) {

            container.style.transform = 'translate(' + i + '%)';

            if (j == 4) {
                j = 0;
                i = 0;
            } else {
                j++;
                i = i - 14;
            }
        }

    })

    rightArrow.addEventListener("click", () => {
        if (j > 0) {
            i = i + 14;
            container.style.transform = 'translate(' + i + '%)';
            j--;

        }

    })

    if (j == 5) {
        j = 0;
        i = 0;
    } else {
        j++;
        i = i - 14;
    }

}

setInterval("slide()", 6000);


let rightArrow = document.getElementById("rightArrow");
let leftArrow = document.getElementById("leftArrow");

let arrow1 = document.getElementById("arrow1");
let arrow2 = document.getElementById("arrow2");







container.addEventListener("mouseover", () => {
    rightArrow.style.opacity = "100%";
    leftArrow.style.opacity = "100%";

})

arrow1.addEventListener("mouseover", () => {
    rightArrow.style.opacity = "100%";
    leftArrow.style.opacity = "100%";
})

arrow2.addEventListener("mouseover", () => {
    rightArrow.style.opacity = "100%";
    leftArrow.style.opacity = "100%";
})



container.addEventListener("mouseout", () => {
    rightArrow.style.opacity = "0%";
    leftArrow.style.opacity = "0%";

})


//styling sliding div


//api

//let details_div = document.getElementById("showDetails");

//Movie recommendation Api link with api key -> https://api.themoviedb.org/3/movie/550?api_key=7ef497b143ed20a02bd2e18adb58614f

async function searchMovies() {
    try {
        let movie = document.getElementById("query").value;

        movies_div.style.visibility = "visible";
        movies_div.style.position = "absolute";


        let res = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=62f4a184`);

        let data = await res.json();

        let movies_arr = data.Search;

        appendMovies(movies_arr);
        console.log("moveis_arr", movies_arr);



    }
    catch (err) {
        console.log("err", err);
        showErr();
    }
}

function showErr() {

    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", "mainDiv");

    let pDiv = document.createElement("div");
    pDiv.setAttribute("id", "pDiv");

    let img = document.createElement('img');
    img.src = "https://media3.giphy.com/media/Ss5nyLJYk0hY5HgnH9/giphy.gif?cid=ecf05e476a8y9airy07ce6avjnxbziwrc2e0t5e3go2n3cop&rid=giphy.gif&ct=g";
    movies_div.append(img);
    img.style.height = "100px";
    img.style.width = "150px";

    mainDiv.append(img, pDiv);

    let p = document.createElement('p');
    p.setAttribute("id", "mainDiv-p");
    p.innerText = `Sorry, No result found!`;

    pDiv.append(p);

    movies_div.append(mainDiv);
}


function appendMovies(movies) {
    movies_div.innerHTML = null;
    let i = 0;

    let showMore = document.createElement('div');
    showMore.setAttribute("id", "showMore");
    

    movies.forEach(function (element) {

        if (i == 5) {
            
            showMore.innerHTML = "Show More";
            movies_div.append(showMore);

            showMore.addEventListener("click", () => {
                localStorage.setItem("movies_arr", JSON.stringify(movies));
                
                window.location.href = "showMore.html";
            });

        } else if (i > 6) {

            movies_div.style.height = "550px";
            movies_div.style.overflow = "hidden";

        } else if(i < 5) {

            let mainDiv = document.createElement("div");
            mainDiv.setAttribute("id", "mainDiv");

            let pDiv = document.createElement("div");
            pDiv.setAttribute("id", "pDiv");

            let p = document.createElement('p');
            p.innerText = element.Title;
            p.setAttribute("id", "pDiv_p1");

            let img = document.createElement('img');
            img.src = element.Poster;
            img.style.height = "90px";
            img.style.width = "150px";
            img.style.borderRadius = "3px";

            let p1 = document.createElement('p');
            p1.innerText = `Release - ${element.Year}`;
            p1.setAttribute("id", "pDiv_p2");

            pDiv.append(p, p1);
            mainDiv.append(img, pDiv);
            movies_div.append(mainDiv);

            mainDiv.addEventListener("click", () => {

                localStorage.setItem("movie_data", JSON.stringify(element));

                window.location.href = "go.html";
            })
        }

        i++;
    });
}

