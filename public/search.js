$(document).ready(function(){
    let search = $("#search-input");
    search.on("input propertychange", x);
    
})
// x = function(event) {
//     event.preventDefault()
//     try {
//         let select = $('#book-genres');
//         let search = $("#search-input");
//         let elements = $('.card');
//         let elements = $(".card-title");
//         let input = search.val().toLowerCase();
//         elements.each(function(index) {
            
//             let  = $(this).closest('.my-card');
//             if($(this).text().toLowerCase().includes(input)) {
//                 card.parent().css("display", "");
//             } else {
//                 card.parent().css("display", "none");
//             }
//         })
//     } catch(err) {
//         console.log("Something wrong with search!");
//     }
// }

x = function(event) {
    event.preventDefault()
    try {
        let select = $('#book-genres');
        let search = $("#search-input");
        let elements = $(".card-title");
        let input = search.val().toLowerCase();
        elements.each(function(index) {
            let card = $(this).closest('.my-card');
            if($(this).text().toLowerCase().includes(input)) {
                card.parent().css("display", "");
            } else {
                card.parent().css("display", "none");
            }
        })
    } catch(err) {
        console.log("Something wrong with search!");
    }
}