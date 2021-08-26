document
    .querySelector('.comment_form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        request.post(this, function (response, form) {
            displayComment(response.id, response);
            form.querySelector('input').value = '';
            form.querySelector('textarea').value = '';
        });
    });

request.get('https://mywebsitevunders.000webhostapp.com/api.php?api=get', function (response) {
    for (const [id, data] of Object.entries(response.comments) ) {
        displayComment(id, data);
    }
});


/**
 * Parāda uz ekrāna jau esošo komentāru
 */
function displayComment(id, data) {
    let comment_block = document.querySelector('#comment_list'),
        template = comment_block.querySelector('.template'),
        new_comment = template.cloneNode(true);
        new_comment.classList.remove('template');

    let description = new_comment.querySelector('.comment__description');
    description.textContent = data.comment;

    let author = new_comment.querySelector('.comment__author');
    author.textContent = data.author;
    
    new_comment.setAttribute('data-id', id);

    comment_block.prepend(new_comment);
}