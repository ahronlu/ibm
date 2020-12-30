function Validator(){}Validator.prototype.simple_validation=function(o){return""!=o.val||(this.show_popup(o.err_1),!1)},Validator.prototype.email_validation=function(o){return""==o.val?(this.show_popup(o.err_1),!1):0!=o.expression.test(o.val)||(this.show_popup(o.err_2),!1)},Validator.prototype.regx_validation=function(o){return""==o.val?(this.show_popup(o.err_1),!1):!!o.expression.test(o.val)||(this.show_popup(o.err_2),!1)},Validator.prototype.show_popup=function(o){alert(o),this.hideLoder()},Validator.prototype.hideLoder=function(){$(".ajax-loder").fadeOut()},Validator.prototype.showLoder=function(){$(".ajax-loder").fadeIn()};

var v = new Validator();
$('.ac-submit-form').on( 'submit' , function( event ){
    event.preventDefault();
    var $this = $(this),
        $fullname  	= $this.find('.ac-fullname'),
        $email  	= $this.find('.ac-email'),
        $phone  	= $this.find('.ac-phone'),
        $company  	= $this.find('.ac-company'),
        $position  	= $this.find('.ac-position');

    var user_fullname_valid = v.simple_validation( {
        val :$fullname.val() ,
        err_1:'שם מלא שדה חובה'
    } );

    var user_company_valid 	= v.simple_validation( {
        val :$company.val() ,
        err_1:'חברה שדה חובה'
    } );

    var user_position_valid 	= v.simple_validation( {
        val :$position.val() ,
        err_1:'תפקיד שדה חובה'
    } );

    var user_phone_valid = v.regx_validation( {
        val : $phone.val(),
        err_1: "טלפון שדה חובה",
        err_2: "טלפון לא תקין",
        expression: /^[0-9]{9,11}$/
    } );

    var user_email_valid = v.regx_validation( {
        val  : $email.val(),
        err_1 : "אימייל שדה חובה",
        err_2: "אימייל לא תקין",
        expression: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        
    } );

    // check  to see if validation is good
    if ( user_company_valid == true && user_position_valid == true && user_fullname_valid == true && user_phone_valid == true && user_email_valid == true) {

        var http = new Http('api.php');
        http.post({
            fullname: $fullname.val(),
            position: $position.val(),
            company:$company.val(),
            phone: $phone.val(),
            email: $email.val(),
        },
        function(json){
               
            var o  = $.parseJSON(json);
            console.log(o);

            if ( o.response == true ) {
                window.location.href = "./ty.html";
            }else {
                alert(o.msg);
            }

        });


    }

});