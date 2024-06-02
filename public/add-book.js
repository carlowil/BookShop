$(document).ready(function(){
    let form = $('#send_book')
    let alert = $(".error")
    form.on("submit", async function( event ) {
        event.preventDefault()
        try {
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
            console.log(data);
            await fetch('/api/book/add', {
                method: 'POST',
                body: data
            }).then((res) => {
                return res.json()
            }).then((mes) => {
                location.assign('/admin');
                alert(mes.message);
            }).catch(err => {
                location.assign('/admin');
                alert("Cant add book! Server fault. Err: " + err)
            }) 
        } catch(err) {
            console.log("Something wrong!")
        }
    })
})