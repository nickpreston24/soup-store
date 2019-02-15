const articles = [];

$(document).ready(() => {

    const scrape = event => {
        $.ajax({
            type: "GET",
            url: '/scrape',
            dataType: "json",
        }).then(function (data) {
            // console.log('data', data)
            data.forEach(article => {
                console.log('element: ', article.title)
                articles.push(article);
            });
        })
    }

    // const render = article => {
    //     let div = $("#articles");
    //     div.append(`<h2>${article.title}</h2>`);
    // }

    const save = () => {
        $.ajax({
            type: "POST",
            url: "/submit",
            dataType: "json",
            data: {
                title: "test",
                author: "test",
                created: Date.now()
            }
        }).then((data) => {
            console.log(data);
        })
    }

    $('#scrape-articles').on('click', scrape);
})