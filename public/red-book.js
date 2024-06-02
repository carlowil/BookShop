$(document).ready(function(){
    let form = $('#red_book')
    let div = form.find('.form-group');
    let alert = $(".error")
    form.on("submit", async function( event ) {
        event.preventDefault()
        try {
            let id = div.data('id');
            let name = form.find('[id=book-name]').val();
            let year = form.find('[id=book-year]').val();
            let desc = form.find('[id=book-desc]').val();
            let genres = $('#book-genres option:selected')
            .toArray()
            .map(el => el.value);
            let author = form.find('[id=book-author]').val();
            let img = document.querySelector('input[type="file"]').files[0];
            if(!name || !year || !desc || !genres || !author || !img) {
                alert.css("display", "");
                return alert.text("Pass all fiealds please!");
            }
            let data = new FormData()
            data.append('image', img)
            data.append('name', name)
            data.append('pub_year', year)
            data.append('description', desc)
            data.append('genres', genres)
            data.append('author', author)
            await fetch(`http://localhost:8080/api/book/chg/${id}`, {
                method: 'PUT',
                body: data
            }).then((res) => {
                return res.json()
            }).then((mes) => {
                location.assign('/admin');
                alert(mes.message);
            }).catch(err => {
                location.assign('/admin');
                alert("Cant change book! Server fault. Err: " + err)
            }) 
        } catch(err) {
            console.log(err);
        }
    })
})