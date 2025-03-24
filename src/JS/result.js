(function () {
    const Result = {
        testAnswers: null,
        testId: null,
        init() {
            document.getElementById( "result-score" ).innerText = sessionStorage.getItem( "score" ) + "/" + sessionStorage.getItem( "total" );
            document.getElementById( "link" ).onclick = this.nextPage;
        },
        nextPage() {
            location.href = "correct.html"
        }
    };
    Result.init();
})();