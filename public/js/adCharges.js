$(document).ready(function () {
    $('.datepicker').datepicker({
        maxDate: new Date()

        // setDefaultDate:true,
    })


    // alert(bill)
    var variableJSON = JSON.parse($('#variableJSON').text());

    if(variableJSON._id != undefined ){
        $('#agencyName').val(variableJSON.agencyName)
        $('#panNumber').val(variableJSON.panNumber)
        $('#gstNumber').val(variableJSON.gstNumber)
        var tenderDate = new Date(variableJSON.tenderDate)
        $('#tenderDate').val(variableJSON.tenderDate)
        

        $('#tenderAmount').val(variableJSON.tenderAmount)
        $('#tenderItCollected').val(variableJSON.tenderItCollected)
        $('#tenderItAmount').val(variableJSON.tenderItAmount)
        $('#tenderNetPayment').val(variableJSON.tenderNetPayment)
        $('#remarksTender').val(variableJSON.remarksTender)

     
        var retenderDate = new Date(variableJSON.retenderDate)
        $('#retenderDate').val(variableJSON.retenderDate)


        $('#retenderAmount').val(variableJSON.retenderAmount)
        $('#retenderItCollected').val(variableJSON.retenderItCollected)
        $('#retenderItAmount').val(variableJSON.retenderItAmount)
        $('#retenderNetPayment').val(variableJSON.retenderNetPayment)
        $('#remarksRetender').val(variableJSON.remarksRetender)

        $('#form1').attr('action','/apis/editAdBill/'+variableJSON.projectId+'/'+variableJSON._id)




    }
    $('#variableJSON').remove();

    $('.sidenav').sidenav();


 

    $('select').formSelect();
    $('#tenderAmount').change(function(){
        $('#tenderNetPayment').val('0');

    })

    $('#tenderItCollected ').change(function () {
        let amount = Number($('#tenderAmount').val())
        let interest = Number($(this).val())
        let taxPayable = Math.round(amount*interest/100);
        let netAmount = amount-taxPayable;
        $('#tenderItAmount').val(taxPayable.toString())
        $('#tenderNetPayment').val(netAmount.toString())




    })

    $('#retenderAmount').change(function(){
        $('#retenderNetPayment').val('0');

    })

    $('#retenderItCollected ').change(function () {
        let amount = Number($('#retenderAmount').val())
        let interest = Number($(this).val())
        let taxPayable = Math.round(amount*interest/100);
        let netAmount = amount-taxPayable;
        $('#retenderItAmount').val(taxPayable.toString())
        $('#retenderNetPayment').val(netAmount.toString())




    })







});

