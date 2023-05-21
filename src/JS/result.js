(function () {
    const Result = {
        testAnswers: null,
        testId: null,
        init() {
            const url = new URL( location.href );
            this.testAnswers = url.searchParams.get( "answers" );
            this.testId = url.searchParams.get( "id" );
            document.getElementById( "result-score" ).innerText = url.searchParams.get( "score" ) + "/" + url.searchParams.get( "total" );
            document.getElementById( "link" ).onclick = this.nextPage.bind( this );
        }, nextPage() {
            location.href = "correct.html?answers=" + this.testAnswers + "&id=" + this.testId;
        }
    };
    Result.init();
})();