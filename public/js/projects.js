let unitList = {
    "Dean mannuthy": null,
    "Unit 2": null,
    "Unit3": null
}
$(document).ready(function () {

    $('input.autocomplete').autocomplete({
        data: unitList,
        minLength: 0

    });


    $('select').formSelect();


    $('.sidenav').sidenav();







});



