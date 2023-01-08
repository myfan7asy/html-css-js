var win = 0;

$(function () {
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            $("body").append('<div class="oneSquare" id="id' + i + '' + j + '" style="background-position: ' + -j * 100 + 'px ' + -i * 100 + 'px "></div>');
        }
    }
    $("body  > .oneSquare").css({"background-image": 'url("image.jpg")'}).draggable();
    for (i = 0; i < 64; i++) {
        $(".oneSquare").eq(i).css({
            top: Math.floor(Math.random() * 800) + "px",
            left: Math.floor(Math.random() * 800) + "px"
        });
    }

    $(".oneSquare").draggable({
        stop: function (event, ui) {
            var x = ui.helper.position().top;
            var y = ui.helper.position().left;
            x = (x / 10).toFixed(0);
            y = (y / 10).toFixed(0);
            $(".squarePos").text(x + " " + y + ui.helper.attr("id"));
            if (x == ui.helper.attr("id")[2] * 10 &&
                y == ui.helper.attr("id")[3] * 10) {
                ui.helper.draggable("disable");
                ui.helper.css("top", ui.helper.attr("id")[2] * 100 + "px");
                ui.helper.css("left", ui.helper.attr("id")[3] * 100 + "px");
                win++;
                if (win == 64) {
                    alert("Well done!");
                }
            }
        }
    });
});

