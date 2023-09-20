// 랜덤번호 초기화
let computerNum = 0;
let userInput = document.getElementById('user-input');
let playBtn = document.getElementById('play-btn');
const resetBtn = document.getElementById('reset-btn');
let resultArea = document.getElementById('result-area');
let chances = 5;
let chanceArea = document.getElementById('chance-area');
let gameOver = false;
let userValueList = [];

// 이벤트 리스너
playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
userInput.addEventListener('focus', function(){
  userInput.value = '';
})

// 랜덤번호 뽑기
function pickRandomNum (){
  computerNum = Math.floor((Math.random()*100)+1);
  console.log('정답', computerNum);
};

// 위아래 게임 play 
function play(){
  let userValue = parseInt(userInput.value, 10);
  //console.log('사용자가 뽑은 번호:', userValue);

  //입력값 유효성 검사 : 1~100 범위 밖에 숫자를 입력한 경우
  if(userValue<1 || userValue>100){
    resultArea.textContent = '1~ 100 범위 안으로 숫자를 다시 입력해주세요.';    
    return;
  };

  //입력값 유효성 검사 : 이미 입력한 숫자를 또 입력한 경우
  if(userValueList.includes(userValue)){
    resultArea.textContent = '이미 입력된 값이므로 다시 입력해주세요.';    
    return;
  };

  //입력값 유효성 검사 : 정수 외의 입력한 경우 
  if(isNaN(userValue) || userValue % 1 !== 0){
    resultArea.textContent = '정수만 입력해주세요.';    
    return;
  };

  userValueList.push(userValue);
  console.log('userValueList', userValueList);

  // 입력된 값과 랜덤 값 비교
  if (userValue<computerNum){
    resultArea.textContent = '위 👍';    
  } else if (userValue>computerNum){
    resultArea.textContent = '아래 👎';
  } else {
    resultArea.textContent = '정답 🤗';
    playBtn.disabled = true;
    gameOver = true;
    return;
  };

  // 기회 차감 카운트
  chances --;
  chanceArea.textContent = `💣도전 횟수 : ${chances}`;
  //console.log('기회', chances);  

  // chance가 0 이하인 경우 game over 상태로 변경
  if(chances<=0){
    gameOver = true;
  };

  // game over인 경우 게임 종료
  if(gameOver){
    playBtn.disabled = true;
    resultArea.textContent = 'Game Over 💀';   
    return;
  };
};

// 위 아래 게임 초기화
function reset(){
  // input 값 초기화
  userInput.value = '';
  // 게임 초기화
  pickRandomNum();
  resultArea.textContent = '숫자를 입력하세요.';
  // 도전 횟수 초기화
  chances = 5; 
  chanceArea.textContent = `당신의 기회는 ${chances}번입니다.`;
  // play btn 초기화
  playBtn.disabled = false;
  // 유효성 검사 - 중복 체크 초기화
  userValueList = [];
  // game over 초기화
  gameOver = false;
}


pickRandomNum();
