$(document).ready(function () {

    var boxCount = 6;
    var rowsPerBox = 3;
    var numbersPerRow = 5;
    var blanksPerRow = 2;

    var totalNumbers = numbersPerRow * rowsPerBox * boxCount;   // 90
    var slotsPerRow = numbersPerRow + blanksPerRow;  // 7
    var slotsPerBox = (numbersPerRow + blanksPerRow) * rowsPerBox;  // 21
    var totalSlots = slotsPerBox * boxCount;    // 126
    var totalRows = boxCount * rowsPerBox;    // 18

    function createSlotRow(numbers) {
        return _.shuffle(numbers.concat([-1, -2]));
    }

    function generateSlots() {
        var numbers = _.range(1, 1 + totalNumbers);
        var slots = [];

        numbers = _.shuffle(numbers);

        for (var i = 0; i < totalRows; i++) {
            slots = slots.concat(createSlotRow(_.first(numbers, numbersPerRow)));
            numbers = numbers.slice(numbersPerRow);
        }
        return slots;
    }

    function createRow(numbers) {
        var $tr = $("<tr/>");

        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] > 0) {
                $tr.append('<td>' + numbers[i] + '</td>');
            } else {
                $tr.append('<td class="empty">&nbsp;</td>');
            }
        }
        return $tr;
    }

    function createBox(numbers) {
        var $table = $('<table class="box"/>');

        for (var i = 0; i < rowsPerBox; i++) {
            $table.append(createRow(_.first(numbers, slotsPerRow)));
            numbers = numbers.slice(slotsPerRow);
        }

        return $table;
    }

    $(".sheet").each(function () {
        var $sheet = $(this);
        $sheet.empty();

        var numbers = generateSlots();

        for (var i = 0; i < boxCount; i++) {
            $sheet.append(createBox(_.first(numbers, slotsPerBox)));
            numbers = numbers.slice(slotsPerBox);
        }
    })

});