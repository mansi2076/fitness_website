document.getElementById('done-checkbox').addEventListener('change', function() {
    if (this.checked) {
        this.nextElementSibling.innerHTML = 'Done!';
    } else {
        this.nextElementSibling.innerHTML = 'Done!';
    }
});
