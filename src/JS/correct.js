(function () {
    const Correct = {
        testAnswers: [],
        testId: null,
        quiz: [],
        correctAnswers: [],
        init() {
            const currentTestElement = document.getElementById( "current-test" );

            let answerString = sessionStorage.getItem( "answers" ).split( "," );
            this.testId = sessionStorage.getItem( "id" );

            this.testAnswers = answerString.map( (str => {
                return parseInt( str );
            }) );

            if ( this.testId ) {
                const xhr = new XMLHttpRequest();
                xhr.open( "GET", "https://testologia.ru/get-quiz?id=" + this.testId, false );
                xhr.send();
                if ( xhr.status === 200 && xhr.responseText ) {
                    try {
                        this.quiz = JSON.parse( xhr.responseText );

                    } catch ( e ) {
                        location.href = "index.html";
                    }
                    currentTestElement.innerText = this.quiz.name;
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

            document.getElementById( "back" ).onclick = this.seeResultPage;
            document.getElementById( "choice" ).onclick = this.passTestAgain;
        },
        getCorrectAnswers() {
            const xhr = new XMLHttpRequest();
            xhr.open( "GET", "https://testologia.ru/get-quiz-right?id=" + this.testId, false );
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
            const questions = this.quiz.questions;
            const testResultElement = document.querySelector( ".correct__questions" );

            for ( let i = 0; i < questions.length; i++ ) {
                const testQuestionTitleElement = document.createElement( "div" );
                testQuestionTitleElement.innerHTML = "<span>  Вопрос " + [ i + 1 ] + ": </span>" + questions[i].question;
                testResultElement.appendChild( testQuestionTitleElement );
                const testAnswersElement = document.createElement( "div" );

                testQuestionTitleElement.className = "correct__questions_title";
                testAnswersElement.className = "correct__questions_answers";


                questions[i].answers.forEach( answer => {
                    const circleElement = document.createElement( "div" );
                    const circleTwoElement = document.createElement( "div" );
                    const testAnswerTextElement = document.createElement( "div" );
                    const testAnswerElement = document.createElement( "div" );

                    testAnswerElement.className = "correct__questions_answers-answer";
                    testAnswerTextElement.className = "correct__questions_answers-answer-text";
                    circleElement.className = "correct__questions_answers-answer-circle";
                    circleTwoElement.className = "correct__questions_answers-answer-circle-inner";


                    if ( this.testAnswers[i] === answer.id && this.correctAnswers[i] === answer.id ) {
                        testAnswerTextElement.classList.add( "green" );
                        circleElement.classList.add( "green-circle" );
                    }
                    else if ( this.testAnswers[i] === answer.id ) {
                        testAnswerTextElement.classList.add( "red" );
                        circleElement.classList.add( "red-circle" );
                    }

                    circleElement.appendChild( circleTwoElement );
                    testAnswerElement.appendChild( circleElement );
                    testAnswerElement.appendChild( testAnswerTextElement );
                    testAnswersElement.appendChild( testAnswerElement );
                    testAnswerTextElement.innerHTML = answer.answer;
                    testResultElement.appendChild( testAnswersElement );
                } );
            }

        },
        seeResultPage() {
            location.href = "result.html";
        },
        passTestAgain(){
            location.href = "choice.html";
        }

    };
    Correct.init();
})();