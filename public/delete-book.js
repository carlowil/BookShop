$(document).ready(function(){
    let delButton = $('.btn-delete');
    delButton.click( function() {
        try {
            let card = $(this).closest('.my-card');
            let id = card.data('id');
            fetch(`http://localhost:8080/api/book/del/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
            }).then (
                res => res.json()
            ).then (
                result => {
                    console.log(result)
                    if (result.status == 201) {
                        card.remove();
                    }
                    else {
                        alert(result.message);
                        console.log(result.message);
                        console.log(result)
                    }
                }
            );
        } catch(err) {
            console.log(err.message)
        }
    });
});
