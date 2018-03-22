$(document).ready(function () {

    function getFilledCountInRow(row){
        return (_.filter(row, function(v){
            return (v>0);
        })).length;
    }

    function getAvailableRowIndexes(cards, column, number){
        var rowIndexes = [];

        var availableCards = _.filter(cards, function(card, indx){
            var sum = card[0][column] + card[1][column] + card[2][column];
            if(sum==0){
                if(getFilledCountInRow(card[0]) <5){
                    rowIndexes.push(indx*3+0);
                }
                if(getFilledCountInRow(card[1]) <5){
                    rowIndexes.push(indx*3+1);
                }
                if(getFilledCountInRow(card[2]) <5){
                    rowIndexes.push(indx*3+2);
                }
            }
            return ( sum == 0);
        });

        if(!availableCards.length){
            availableCards = cards;

            for(var i=0; i<availableCards.length; i++){
                for(var j=0; j<3; j++){
                    if(availableCards[i][j][column]>0){
                        // already filled up
                        continue;
                    } else{
                        // lets check if 5 slots already filled up
                        if(getFilledCountInRow(availableCards[i][j]) <5){
                            rowIndexes.push(i*3+j);
                        }
                    }
                }
            }
        }
        if(!rowIndexes.length){
            // still not found assign any empty row then
            console.log("Special case for column: " + column);
            console.log("Offending number: " + number);
            for(var i=0; i<cards.length; i++){
                for(var j=0; j<3; j++){
                    if(cards[i][j][column]==0){
                        // already filled up
                        rowIndexes.push(i*3+j);
                    }
                }
            }
        }
        return rowIndexes
    }

    function assignNumber(cards, number, column) {
        var availableRowIndexes = getAvailableRowIndexes(cards, column, number);
        var chosen = _.sample(availableRowIndexes);
        var cardIndex = parseInt(chosen/3, 10);
        var rowIndex = chosen % 3;

        if(!availableRowIndexes.length){
            console.log(number);
            console.log(availableRowIndexes);
            console.log("chosen: " + chosen);
            console.log("rowIndex: " + rowIndex);
        }
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
    var cnt = 0;
    $(".sheet").each(function () {
        console.log("Sheet " + (++cnt));
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