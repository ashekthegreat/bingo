$(document).ready(function () {
    

    function getAvailableRowIndexes(cards, column){
        var rowIndexes = [];

        var availableCards = _.filter(cards, function(card, indx){
            var sum = card[0][column] + card[1][column] + card[2][column];
            if(sum==0){
                rowIndexes.push(indx*3);
                rowIndexes.push(indx*3+1);
                rowIndexes.push(indx*3+2);
            }
            return ( sum == 0);
        });

        if(!availableCards.length){
            availableCards = cards;
            var full;

            for(var i=0; i<availableCards.length; i++){
                for(var j=0; j<3; j++){
                    if(availableCards[i][j][column]>0){
                        // already filled up
                        continue;
                    } else{
                        // lets check if 5 slots already filled up
                        full = _.filter(availableCards[i][j], function(v){
                            return (v>0);
                        });
                        if(full.length <5){
                            rowIndexes.push(i*3+j);
                        }
                    }
                }
            }
        }


        return rowIndexes
    }

    function assignNumber(cards, number, column) {
        var availableRowIndexes = getAvailableRowIndexes(cards, column);
        var chosen = _.sample(availableRowIndexes);
        var cardIndex = parseInt(chosen/3, 10);
        var rowIndex = chosen % 3;

        //if(column==0){

            //console.log(number);
            //console.log(availableRowIndexes);
            //console.log("chosen: " + chosen);
            //console.log("rowIndex: " + rowIndex);
        //}
        cards[cardIndex][rowIndex][column] = number;

        return cards;
    }

    function assignNumbers(cards) {
        var numbers = Array(9);
        for(var a=0; a<9; a++){
            numbers[a] = _.shuffle( _.range(10*a+1, 10*a+11) );
        }
        //console.log(numbers);

        for(var it=0; it<10; it++){
            for(var column=0; column<9; column++){
                cards = assignNumber(cards, numbers[column][it], column);
            }
        }
    }

    function drawRow(numbers) {
        var $tr = $("<tr/>");

        for (var k = 0; k < 9; k++) {
            if (numbers[k] > 0) {
                $tr.append('<td>' + numbers[k] + '</td>');
            } else {
                $tr.append('<td class="empty">&nbsp;</td>');
            }
        }
        return $tr;
    }

    function drawCard(numbers) {
        var $table = $('<table class="box"/>');

        for (var j = 0; j < 3; j++) {
            $table.append(drawRow(numbers[j]));
        }

        return $table;
    }

    function createCard(){
        var card = Array(3);
        for(var j=0; j<3; j++){
            card[j] = Array(9);
            for(var k=0; k<9; k++){
                card[j][k] = 0;
            }
        }
        return card;
    }

    $(".sheet").each(function () {
        var $sheet = $(this);
        $sheet.empty();

        var cards = new Array(6);
        for(var i=0; i<6; i++){
            cards[i]=createCard();
        }
        //console.log(cards);
        assignNumbers(cards);

        for (i = 0; i < 6; i++) {
            $sheet.append(drawCard(cards[i]));

        }
    })

});