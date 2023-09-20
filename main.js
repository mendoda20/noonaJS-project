// 랜덤번호 저장
let computerNum = 0;
let playBtn = document.getElementById('play-btn');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetBtn = document.getElementById('reset-btn');
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let userValueList = [];

// play-btn 이벤트 리스너
// play-btn에 이벤트를 더해줘라~ 무슨 이벤트를 더해줄거냐? 클릭 이벤트를 더해줘라~ 그런데 이 클릭 이벤트가 발생하면 무슨 함수를 실행시킬거니? 실행시킬 함수는 바로 play라는 함수다~

// addEventListener? 이벤트를 더해준다. 사용방법? addEventListener(이벤트 이름, 이벤트 발생 시 실행함수) 여기서 두번째 인자는 이벤트 실행되었을 때 어떤 함수를 부를 것인지~ 

//그런데 지금은 부를 함수를 변수처럼 매개변수로 넘겼다용. 이런 경우에는 함수를 매개변수로 불렀을 때 () 사용하면 안된다. ()를 사용하는 순간 함수가 실행되기 때문이다. 이거를 변수로서 넘기고 클릭 이벤트가 발생되었을 때만 실행시키면 된다용. 여기서 🌟중요 포인트는 함수도 변수처럼 매개변수로 넘길 수 있다는 것이당.

playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
userInput.addEventListener('focus', function(){ // <- 이 이벤트에서는 익명의 함수(이름 없는 함수)를 사용했는데 그 이유는?
  userInput.value = ''; // 이 함수 자체는 내용이 크게 없고, 또 userInput에서 잠깐 쓰고 끝날 함수라 굳이 함수 이름을 선언하지도 않아도 될 느낌에. 만약 선언하면 메모리만 차지됨. 어떤 경우에만? 이 함수다 다른 데서 쓰지 않고, 안에 있는 로직이 단순할 때는 익명 함수를 사용 쌉가능
}) 

function pickRandomNum(){
  computerNum = Math.floor(Math.random()*100)+1;
  console.log('정답', computerNum);
};

function play (){
  //여기서 첫번째! 유저가 입력한 값을 가져와야 비교를 하지 않는가!!
  let userValue = userInput.value;

  // 입력 값 유효성 검사
  if (userValue<1 || userValue>100){
    resultArea.textContent = '1과 100 사이 숫자를 입력해 주세요.';
    return;
  }

  if (userValueList.includes(userValue)){
    resultArea.textContent = '이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.';
    return;
  }
 
  // 남은 기회
  chances -- ;
  chanceArea.textContent = `Chance: ${chances}`;
  console.log('chance', chances); 

  //입력한 값 userValueList 배열에 저장
  userValueList.push(userValue)
  console.log('userValueList', userValueList);

  // 추측 값과 컴퓨터의 랜덤 값 비교
  if (userValue < computerNum){
    resultArea.textContent = 'UP!';
  } else if (userValue > computerNum){
    resultArea.textContent = 'DOWN!';
  } else {
    resultArea.textContent = `That's right!`;
    gameOver = true;
  }

  // chance가 0이하인 경우 game over 상태로 변경
  if(chances <=0){
    gameOver = true;
  } 

  if(gameOver){
    playBtn.disabled = true;
  }

};

function reset (){
  // user input 창이 깨끗하게 정리되고,
  userInput.value = "";
  // computerNum의 새로운 번호가 생성되게 다시 pickRandomNum() 함수 불러줘 📞 call me~~ call~~
  pickRandomNum();
  resultArea.textContent = '결과값이 여기 나옵니다.';
  gameOver = false;
  playBtn.disabled = false;
  chances = 5;
  chanceArea.textContent = `Chance: ${chances}`;
  userValueList = [];
};

pickRandomNum();

