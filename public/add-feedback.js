$(document).ready(function(){
    let form = $('#send_feedback')
    let alert = $(".error")
    form.on("submit", async function( event ) {
        event.preventDefault()
        try {
            let name = form.find('[id=feedback-name]').val();
            let email = form.find('[id=feedback-email]').val();
            let feedback = form.find('[id=feedback-text]').val();
            if(!name || !email || !feedback) {
                alert.css("display", "");
                return alert.text("Pass all fiealds please!");
            }
            await fetch('http://localhost:8080/api/feedback/add', {
                method: 'POST',
                body: JSON.stringify({ name: name, email: email, feedback: feedback }),
                headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
                return res.json();
            }).then((data) => {
                location.assign('/');
                alert(data.message);
            }).catch(err => {
                location.assign('/');
                alert("Cant add feedaback\n" + err.message)
            }) 
        } catch(err) {
            console.log("Something wrong!")
        }
    })
})