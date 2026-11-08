
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // SIMULACIÓN DE MENSAJE SOSPECHOSO
    // =====================================

    const analyzeButton = document.getElementById("analyze-button");
    const warning = document.getElementById("warning");

    analyzeButton.addEventListener("click", function () {

        warning.hidden = !warning.hidden;

        if (warning.hidden) {
            analyzeButton.textContent = "Analizar mensaje";
        } else {
            analyzeButton.textContent = "Ocultar análisis";
        }

    });


    // =====================================
    // PREGUNTAS DEL CUESTIONARIO
    // =====================================

    const questions = [

        {
            question: "¿Qué debes hacer si recibes un enlace sospechoso?",

            answers: [
                "A. Abrirlo inmediatamente.",
                "B. Verificar el mensaje y su remitente.",
                "C. Compartirlo con tus amigos."
            ],

            correct: 1,

            explanation: "¡Correcto! Siempre verifica el remitente y evita abrir enlaces sospechosos."
        },

        {
            question: "¿Cuál es una característica de una contraseña segura?",

            answers: [
                "A. Utilizar solamente tu nombre.",
                "B. Repetir la misma contraseña en todas tus cuentas.",
                "C. Combinar letras, números y símbolos."
            ],

            correct: 2,

            explanation: "¡Muy bien! Una contraseña larga y difícil de adivinar ayuda a proteger tus cuentas."
        },

        {
            question: "¿Qué debes hacer si sufres ciberacoso?",

            answers: [
                "A. Guardar evidencia y buscar ayuda de un adulto de confianza.",
                "B. Responder con más insultos.",
                "C. Compartir el problema públicamente."
            ],

            correct: 0,

            explanation: "¡Excelente! Busca apoyo de una persona de confianza y utiliza las opciones de bloqueo y denuncia."
        }

    ];


    // =====================================
    // ELEMENTOS DEL HTML
    // =====================================

    const questionElement = document.getElementById("question");

    const answersElement = document.getElementById("answers");

    const feedbackElement = document.getElementById("feedback");

    const counterElement = document.getElementById("question-counter");

    const scoreElement = document.getElementById("score-label");

    const progressBar = document.getElementById("progress-bar");

    const nextButton = document.getElementById("next-button");

    const restartButton = document.getElementById("restart-button");

    const resultElement = document.getElementById("quiz-result");

    const finalScoreElement = document.getElementById("final-score");

    const quizTop = document.getElementById("quiz-top");

    const progressTrack = document.getElementById("progress-track");


    // =====================================
    // VARIABLES
    // =====================================

    let currentQuestion = 0;

    let score = 0;

    let answered = false;


    // =====================================
    // MOSTRAR PREGUNTA
    // =====================================

    function loadQuestion() {

        answered = false;

        const question = questions[currentQuestion];

        questionElement.textContent = question.question;

        counterElement.textContent =
            `Pregunta ${currentQuestion + 1} de ${questions.length}`;

        scoreElement.textContent = `${score} puntos`;

        progressBar.style.width =
            `${((currentQuestion + 1) / questions.length) * 100}%`;

        feedbackElement.textContent = "";

        feedbackElement.style.color = "";

        nextButton.classList.add("hidden");

        answersElement.innerHTML = "";


        question.answers.forEach(function (answer, index) {

            const button = document.createElement("button");

            button.type = "button";

            button.className = "answer";

            button.textContent = answer;

            button.addEventListener("click", function () {

                checkAnswer(index);

            });

            answersElement.appendChild(button);

        });

    }


    // =====================================
    // COMPROBAR RESPUESTA
    // =====================================

    function checkAnswer(selected) {

        if (answered) {
            return;
        }

        answered = true;

        const question = questions[currentQuestion];

        const buttons = answersElement.querySelectorAll(".answer");


        buttons.forEach(function (button, index) {

            button.disabled = true;

            if (index === question.correct) {

                button.classList.add("correct");

            }

            if (index === selected && selected !== question.correct) {

                button.classList.add("incorrect");

            }

        });


        if (selected === question.correct) {

            score++;

            feedbackElement.textContent =
                "✓ " + question.explanation;

            feedbackElement.style.color = "#4ade80";

        } else {

            feedbackElement.textContent =
                "✗ Respuesta incorrecta. " + question.explanation;

            feedbackElement.style.color = "#fb7185";

        }


        scoreElement.textContent = `${score} puntos`;


        if (currentQuestion === questions.length - 1) {

            nextButton.textContent = "Ver resultado →";

        } else {

            nextButton.textContent = "Siguiente pregunta →";

        }


        nextButton.classList.remove("hidden");

    }


    // =====================================
    // AVANZAR A LA SIGUIENTE PREGUNTA
    // =====================================

    nextButton.addEventListener("click", function () {

        if (!answered) {
            return;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showResult();

        }

    });


    // =====================================
    // MOSTRAR RESULTADO FINAL
    // =====================================

    function showResult() {

        questionElement.classList.add("hidden");

        answersElement.classList.add("hidden");

        feedbackElement.classList.add("hidden");

        quizTop.classList.add("hidden");

        progressTrack.classList.add("hidden");

        nextButton.classList.add("hidden");

        resultElement.classList.remove("hidden");


        let message;


        if (score === 3) {

            message =
                "¡Perfecto! Tienes excelentes conocimientos sobre seguridad digital.";

        } else if (score === 2) {

            message =
                "¡Buen trabajo! Conoces varios hábitos importantes para protegerte.";

        } else {

            message =
                "¡Sigue aprendiendo! Recuerda aplicar los consejos de SafeNet.";

        }


        finalScoreElement.textContent =
            `Obtuviste ${score} de 3 puntos. ${message}`;

    }


    // =====================================
    // REINICIAR CUESTIONARIO
    // =====================================

    restartButton.addEventListener("click", function () {

        currentQuestion = 0;

        score = 0;

        answered = false;


        questionElement.classList.remove("hidden");

        answersElement.classList.remove("hidden");

        feedbackElement.classList.remove("hidden");

        quizTop.classList.remove("hidden");

        progressTrack.classList.remove("hidden");

        resultElement.classList.add("hidden");


        loadQuestion();

    });


    // =====================================
    // INICIAR CUESTIONARIO
    // =====================================

    loadQuestion();

});