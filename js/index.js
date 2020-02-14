const STORE = {
    questions: [
      {
        question: "amongs these teams who has the mof nfl championship rings?",
        options: [
          "rams", 
          "steeler", 
          "vikings", 
          "colts"
        ],
        answer: "steeler"
      },
      
      {
        question: "which year did the nfl begin?",
        options: [
          "1966",
          '1882', 
          "1999",
          "2010"
        ],
        answer: "1882"
      },
    
      {
        question: "where are the rams located?",
        options: [
          "Cali", 
          "maryland", 
          "texas", 
          "nevada"
        ],
        answer: "Cali"
      },
    
      {
        question: "what is the mascot for the ravens?", 
        options: ["JIM", "POE", "WILL", "KIM"],
        answer: "POE"
      },
    
      {
        question: "ho won the first super bowl?",
        options: [
            "Packers", 
            "Texans", 
            "Titans", 
            "Ravens"
          ],
        answer: "Packers"
      },
    ],
    currentQuestion: 0,
    score: 0
  };


/* when a user clicks on start quiz button */
function startQuiz() {
    $('#start').on('click', function(event){
      rendertheQuestion();
    }
    );
  }
  
  /* Displays question number and score obtained */
  function updateQuestionAndScore() {
    const html = $(`<ul>
        <li id="js-answered">Questions Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
        <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
      </ul>`);
    $(".question-and-score").html(html);
  }
  
  /* Displays the options for the current question */
  function updateOptions()
  {
    let question = STORE.questions[STORE.currentQuestion];
    for(let i=0; i<question.options.length; i++)
    {
      $('.js-options').append(`
          <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
          <label for="option${i+1}"> ${question.options[i]}</label> <br/>
          <span id="Que-id${i+1}"></span>
      `);
    }
    
  }
  
  /*displays the question*/
  function rendertheQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionAndScore();
    const questionHtml = $(`
    <style>
    .question{
      width:80px;
    }
    .indQuestions{
      position:relative;
      margin:0 auto;
      top:-50px;

   font-size:3em;
   max-width:80%;
    }
    .options{
      position:relative;
      left:100px;
    }
    .js-options{
      font-size:2em;
      left:100px;
      
    }
    .buttonDiv{
      width:20%;
      border: 5px,rgb(255, 217, 0);
      position:relative;
      left:100px;
      top:-200;
    }
    button{
      font-size:2em;
      position:relative;
      top:-200;

    }

    </style
    <div>
      <form id="js-questions" class="question-form">
        
              <h2 class="indQuestions" > ${question.question}</h2>
          <div class="options">
            
              <div class="js-options"> </div>
         
        </div>
          <div class="buttonDiv">
            <button type = "submit" id="answer" tabindex="5">Submit</button>
            <button type = "button" id="next-question" tabindex="6"> Next >></button>
          </div>
      </form>
    </div>`);
   
  $("main").html(questionHtml);
  updateOptions();
  $("#next-question").hide();
  }
  
  /* displays results and restart quiz button */
  function returnResults() {
    let resultHtml = $(
      `<div class="results">
        <form id="Restartbutton">
            <div class="row">
              <div class="buttonDiv">
                <h2>Your Score is: ${STORE.score}/${STORE.questions.length}</h2>
              </div>
            </div>
            <div class="row">
              <div class="buttonDiv">
                <button type="button" id="restart"> Restart Quiz </button>
              </div>
            </div>
      </form>
      </div>`);
      STORE.currentQuestion = 0;
      STORE.score = 0;
    $("main").html(resultHtml);
  }
  
  /* checks whether it reached the end of questions list */
  function handlecurrentQuestion() {
    $('body').on('click','#next-question', (event) => {
      STORE.currentQuestion === STORE.questions.length?returnResults() : rendertheQuestion();
    });
  }
  
  
  /*checks whether the chosen option is right or wrong and displays respective message*/ 
  function handleSelectOption() {
    $('body').on("submit",'#js-questions', function(event) {
      event.preventDefault();
      let currentQues = STORE.questions[STORE.currentQuestion];
      let selected = $("input[name=options]:checked").val();
      if (!selected) {
        alert("Choose an option");
        return;
      } 
      let id_num = currentQues.options.findIndex(i => i === selected);
      let id = "#Que-id" + ++id_num;
      $('span').removeClass("right-answer wrong-answer");
      if(selected === currentQues.answer) {
        STORE.score++; 
        $(`${id}`).append(`Your Correct <br/>`);
        $(`${id}`).addClass("right-answer");
      } 
      else {
        $(`${id}`).append(`Wrong  The Correct Answer is "${currentQues.answer}"<br/>`);
        $(`${id}`).addClass("wrong-answer");
      }
  
      STORE.currentQuestion++;
      $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
      $('#answer').hide();
      $("input[type=radio]").attr('disabled', true);
      $('#next-question').show();
    });
  }
  
  function restartQuiz() {
    $('body').on('click','#restart', (event) => {
      rendertheQuestion();
    });
  }
  
  function handleQuizApp() {
    startQuiz();
    handlecurrentQuestion();
    handleSelectOption();
    restartQuiz();
  }
  
  $(handleQuizApp);