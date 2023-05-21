(function () {
    const Correct = {
        testAnswers: [],
        testId: null,
        quiz: [],
        correctAnswers: [],
        init() {

            const url = new URL( location.href );

            let answerString = url.searchParams.get( "answers" ).split( "," );
            this.testAnswers = answerString.map( (str => {
                return parseInt( str );
            }) );
            this.testId = url.searchParams.get( "id" );

            if ( this.testId ) {
                const xhr = new XMLHttpRequest();
                xhr.open( "GET", "https://testologia.site/get-quiz?id=" + this.testId, false );
                xhr.send();
                if ( xhr.status === 200 && xhr.responseText ) {
                    try {
                        this.quiz = JSON.parse( xhr.responseText );

                    } catch ( e ) {
                        location.href = "index.html";
                    }
                    this.getCorrectAnswers();

                    this.showAnswers();
                }
                else {
                    location.href = "index.html";
                }
            }
            else {
                location.href = "index.html";
            }

        },
        getCorrectAnswers() {
            const xhr = new XMLHttpRequest();
            xhr.open( "GET", "https://testologia.site/get-quiz-right?id=" + this.testId, false );
            xhr.send();
            if ( xhr.status === 200 && xhr.responseText ) {
                try {
                    this.correctAnswers = JSON.parse( xhr.responseText );

                } catch ( e ) {
                    location.href = "index.html";
                }
            }
            else {
                location.href = "index.html";
            }
        },
        showAnswers() {
            console.log( this.quiz );
            const questions = this.quiz.questions;
            const testResultElement = document.getElementById( "test-results" );


            for ( let i = 0; i < questions.length; i++ ) {
                const testQuestionElement = document.createElement( "div" );
                const testAns = "";
                const testQuestionTitleElement = document.createElement( "div" );
                testQuestionTitleElement.innerHTML = "<span>  Вопрос " + [ i + 1 ] + ": </span>" + questions[i].question;

                testResultElement.appendChild( testQuestionTitleElement );
                questions[i].answers.forEach( answer => {
                    const testAnswer = document.createElement( "div" );
                    testAnswer.innerHTML = answer.answer;
                    testResultElement.appendChild( testAnswer );
                } );
                testResultElement.appendChild( testQuestionElement );


                console.log( questions[i].answers );
                if ( this.testAnswers[i] === this.correctAnswers[i] ) {
                    console.log( this.correctAnswers[i] );
                }
                else {
                    console.log( this.testAnswers[i] );
                }
            }

        },

    };
    Correct.init();
})();