$(document).ready(function () {

    var totalNumbers = 90;
    var slots = _.range(1, 1 + totalNumbers);
    var history = [];
    var animationDuration = 2;  // 2s

    var h = $(".btn-go").height();
    var counter = $(".counter").rotateNumber({
        digits: 2,
        digitSize: h,
        rotateDuration: animationDuration
    });

    var $slots = $(".slots");
    $slots.empty();
    for (var i = 0; i < slots.length; i++) {
        $slots.append('<div class="slot" id="slot-'+ slots[i] +'">'+ slots[i] +'</div>');
    }

    function disableButton(state) {
        $(".btn-go").prop('disabled', !!state);
        if(!state){
            $(".btn-go").focus();
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
        localStorage.removeItem("activeItems");
        history = [];
        $(".slot").removeClass("active");
        $(".history").empty();
        counter.setNumber(0);
        disableButton(false);
    });


    $(".btn-go").click(function(){
        disableButton(true);
        setTimeout(function(){
            disableButton(false);
        }, animationDuration*1000);

        var pool = _.difference(slots, history);
        var randomNumber = _.sample(pool);
        counter.setNumber(randomNumber);
        populateNumber(randomNumber);
    });

    function loadFromLocalStorage(){
        if(localStorage.activeItems){
            var activeItems = JSON.parse(localStorage.activeItems);
            if(activeItems.length){
                populateNumbers(activeItems);
                counter.setNumber(activeItems[activeItems.length-1]);
            }
        }
    }
    loadFromLocalStorage();


});