$(document).ready(function () {

    $('select').formSelect();
    $('.sidenav').sidenav();
    let amount = 0
    let sumA = 0;
    let sumB =0;
    $('#ItCollected').change(function(){
        amount = Number($('#billAmount').val())
        let kccwfChoice = Number($(this).val())
        $('#tdsAmount').val(Math.round(kccwfChoice*amount/100))

      
        $('#kcwwfAmount').val(Math.round(1*amount/100))
        $('#gstAmount').val(Math.round(2*amount/100))
    })

    $('#pgdAmount').change(function(){
        sumA = Number($('#tdsAmount').val())+Number($('#kcwwfAmount').val()) + Number($('#gstAmount').val()) + Number($(this).val())
        $('#subtotalA').val(sumA)
    })
    $('#fine').change(function(){
        sumB = Number($('#waterElectricity').val())+Number($(this).val()) 
        $('#subtotalB').val(sumB)
        $('#amountPayable').val(amount-(sumA + sumB))
        
    })
    $('#gstChoose').change(function(){
        $('#gstAmount2').val(Number($(this).val())*amount/100)
    })  







});
