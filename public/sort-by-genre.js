$(document).ready(function(){
    let select = $('#book-genres');
    let elements = $('.card');
    select.on("change", function() {
        try {
            let input = select.val().toLowerCase();
            elements.each(function(index) {
                let genres = $(this).find('.book_genre').data('genre');
                let col = $(this).parent();
                if(input == "all") {
                    col.css("display", "");
                } else if(genres.toLowerCase().includes(input)) {
                    col.css("display", "");
                } else {
                    col.css("display", "none");
                }
            })
        } catch(err) {
            console.log("Something wrong with search!");
        }
    })
})