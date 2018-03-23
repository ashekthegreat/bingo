$(document).ready(function () {

    var totalNumbers = 90;
    var slots = _.range(1, 1 + totalNumbers);
    var history = [];
    var animationDuration = 0.8;  // 2s
    var $go = $(".btn-go");

    var h = $go.height();
    /*var counter = $(".counter").rotateNumber({
        digits: 2,
        digitSize: h,
        rotateDuration: animationDuration
    });*/

    function setNumber(n){
        /*$(".counter").fadeOut(animationDuration/2 * 1000, function () {
            $(".counter").text(n);
            $(".counter").fadeIn(animationDuration/2 * 1000);
        });*/

        $(".counter").animate({
            fontSize: 0
        }, animationDuration/2* 1000, function() {
            $(".counter").text(n);
            $(".counter").animate({
                fontSize: '40vh'
            }, animationDuration/2* 1000);
        });
    }
    var $slots = $(".slots");
    $slots.empty();
    for (var i = 0; i < slots.length; i++) {
        $slots.append('<div class="slot" id="slot-'+ slots[i] +'">'+ slots[i] +'</div>');
    }

    function disableButton(state) {
        $go.prop('disabled', !!state);
        if(!state){
            //$go.focus();
        }
    }

    function populateNumber(number){
        history = _.union(history, [number]);
        $("#slot-" + number).addClass("active");
        $(".history").text(history.join(', '));
        localStorage.activeItems = JSON.stringify( history );

        if(history.length >= totalNumbers){
            disableButton(true);
        }
    }

    function populateNumbers(numbers){
        for(var i=0; i<numbers.length; i++){
            populateNumber(numbers[i]);
        }
    }

    $(".clear").click(function(){
        var response = confirm("Are you sure you want to clear history and start a new game?");
        if (response) {
            localStorage.removeItem("activeItems");
            localStorage.removeItem("soldCount");
            $("#sold").val("");
            $("#row-prize").val("");
            $("#full-house-prize").val("");

            history = [];
            $(".slot").removeClass("active");
            $(".history").empty();
            //counter.setNumber(0);
            setNumber(0);
            disableButton(false);
        }
    });
    $(".counter").click(function(){
        var docEl = window.document.documentElement;
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        requestFullScreen.call(docEl);
    });

    $go.click(function(){
        disableButton(true);
        setTimeout(function(){
            disableButton(false);
        }, animationDuration*1000);

        var pool = _.difference(slots, history);
        var randomNumber = _.sample(pool);
        //counter.setNumber(randomNumber);
        setNumber(randomNumber);
        populateNumber(randomNumber);


    });

    $("#calculate").click(function(){
        var price = +$("#price").val();
        var sold = +$("#sold").val();
        var totalAmount = price * sold;
        var rowPrize = (totalAmount * 0.4) / 4;
        var fullHousePrize = (totalAmount * 0.6) / 2;

        $("#row-prize").val(rowPrize);
        $("#full-house-prize").val(fullHousePrize);

        localStorage.soldCount = sold;
    });

    function loadFromLocalStorage(){
        if(localStorage.activeItems){
            var activeItems = JSON.parse(localStorage.activeItems);
            if(activeItems.length){
                populateNumbers(activeItems);
                //counter.setNumber(activeItems[activeItems.length-1]);
                setNumber(activeItems[activeItems.length-1]);
            }
        } else{
            setNumber(0);
        }

        if(localStorage.soldCount){
            $("#sold").val(+localStorage.soldCount);
            $("#calculate").click();
        } else{
            $("#sold").val();

        }
    }
    loadFromLocalStorage();


});