



$("#info").html("<p>Extra info will go here.</p>");


$.getJSON("poem.json", function (data) {
    let poemText;
    console.log(data)



    poemText = "<blockquote><p>";


    data.lines.map(function (line) {
        console.log(line)


        let lineText = "";

        line.map(function (word) {

            let wordString;

            wordString = word.text;

            if (word.info) {

                wordString = "<a href='#' data-info='" + word.info + "'>" + wordString + "</a>";
            }
            lineText = lineText + wordString + " ";

        });

        poemText = poemText + lineText + "<br/>";
    });


    poemText = poemText + "</p><blockquote>";



    $("#poem").html(poemText);


    $("#poem a").click(function () {

        let infoText, clickedWord, clickedInfo;

        clickedWord = $(this).text();

        clickedInfo = $(this).data("info");

        infoText = clickedInfo;

        $("#info").html(infoText);
    });

});




