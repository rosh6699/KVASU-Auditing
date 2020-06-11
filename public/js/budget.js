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

  $('#step2').attr('disabled', true)
  $('select').formSelect();



  $('#checker').prop("checked", true)


  $('#step1').change(function () {
    $(this).attr('disabled', true)
  })

  $('.sidenav').sidenav();
  $('#step2').change(function () {
    let year = $('#step1').val()
    let month = $('#step2').val()
    if (Number(month) < 4) {
      year = (Number(year) + 1).toString()
    }

    var startDate = year + '-' + month + '-01';

    monthDec = Number(month) - 1
    var d = new Date(Number(year), monthDec + 1, 0);

    $('.datepicker').datepicker({
      maxDate: new Date() ,
      
      // setDefaultDate:true,
    })


  })

  $('.step').change(function () {
    var id = (Number(this.id[4]) + 1).toString()


    if (Number(this.id[4]) <= 3) {
      var next_step = $('#step' + id)
      var all_next_steps = []

      if ($(this).val()) {


        next_step.attr('disabled', false);
        $('select').formSelect();

      }
      else {

        for (var i = id; i < 10; i++) {
          selector = ('#step' + i.toString())
          $(selector).val("")
          $(selector).attr('disabled')
        }
      }

    }


  });



});

function ValidationEvent() {
  // Storing Field Values In Variables
  $('#step1').attr('disabled', false)
  let date = document.getElementById('step3').value;
  let unit = document.getElementById('chosenUnit').value;
  let amount = document.getElementById('amountBudget').value;
  let orderNo = document.getElementById('orderNo').value
  let source = document.getElementById('source').value;


  if (date == "" || unit == "" || amount == "" || orderNo == "" || source == "") {
    alert("All fields are required")
    return false;
  }
  else {
    if (!Object.keys(unitList).includes(unit)) {
      alert("Unit must be present in the list")
      return false;
    }
    return true;
  }


}

