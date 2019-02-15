console.log('index running...')

$(document).ready(() => {
    const scrape = event => {
        $.ajax({
            type: "GET",
            url: '/scrape',
            dataType: "json",
        })
    }

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