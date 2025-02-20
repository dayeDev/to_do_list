// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let mode='all'


// 탭 클릭 이벤트
for(let i=1; i<tabs.length; i++){
  tabs[i].addEventListener("click", function (event){
    mode = event.target.id; // 전역 mode 업데이트
     // 언더라인 이동
     moveUnderLine(event.currentTarget); 
     render(); 
  });
}

// 언더라인 이동 함수
function moveUnderLine(tabElement) {
  let underLine = document.getElementById("under-line");
  // 탭의 왼쪽 위치와 너비를 얻어서 언더라인에 적용
  underLine.style.left = tabElement.offsetLeft + "px";
  underLine.style.width = tabElement.offsetWidth + "px";
}

// 페이지 로드 시, '전체' 탭에 언더라인 세팅 (선택사항)
window.onload = function(){
  // 전체 탭 DOM 객체
  let defaultTab = document.getElementById("all");
  // 언더라인 이동
  moveUnderLine(defaultTab);
};


// 입력 필드에서 키를 누를 때마다 실행
taskInput.addEventListener("keyup", function() {
  // trim()으로 앞뒤 공백 제거 후, 빈 문자열인지 확인
  if (taskInput.value.trim() === "") {
    // 비어 있으면 버튼 비활성화
    addButton.disabled = true;
  } else {
    // 값이 있으면 버튼 활성화
    addButton.disabled = false;
  }
});

// 버튼 클릭 시 할 일 추가
addButton.addEventListener("click", addTask);

// 엔터 키를 감지하여 할 일 추가
taskInput.addEventListener("keyup", function(event) {
  // Enter 키(엔터)를 누르면
  if (event.key === "Enter") {
    addTask();  // 할 일 추가 함수 호출
  }
});

function addTask(){
  let taskContent = taskInput.value.trim();
  // 입력값이 공란이면 함수를 종료하여 아이템 추가를 막음
  if(taskContent === ""){
    return;
  }

 // 입력값이 비어있지 않은 경우에만 로직 실행
  let task = {
    id: randomIDGenerate(),  // 고유 ID 생성
    taskContent: taskInput.value.trim(),  // 입력한 할 일 내용
    isComplete: false  // 완료 상태(기본값: 미완료)
  };
  taskList.push(task);  // 할 일 목록에 추가
  taskInput.value = "";  // 입력 필드 초기화 
  render();  // 화면에 할 일 목록 그리기

// 할 일을 추가하고 나면 버튼을 다시 비활성화
  addButton.disabled = true;
}

// 할 일 목록을 화면에 렌더링하는 함수
// 1. 내가 선택한 탭에 따라서 
//  ㄴ all taskList
//  ㄴ ongoing, done   filterList
// 2. 리스트를 달리 보여준다
function render(){
  let list = [];
  if(mode === 'all'){
    list = taskList;
  } else if(mode === 'ongoing'){
    list = taskList.filter(task => task.isComplete === false);
  } else if(mode === 'done'){
    list = taskList.filter(task => task.isComplete === true);
  }


  let resultHTML = "";
  for(let i = 0; i < list.length; i++){
    if(list[i].isComplete){
      // 완료된 항목
      resultHTML += `<div class="task-completed task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="bi bi-arrow-counterclockwise"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="bi bi-trash"></i></button>
        </div>
      </div>`;
    } else {
      // 미완료 항목
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')"> <i class="bi bi-check2-circle"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="bi bi-trash"></i></button>
        </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;  // 결과를 HTML에 반영
}

// 할 일 완료 상태를 토글하는 함수
function toggleComplete(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id === id){
      taskList[i].isComplete = !taskList[i].isComplete;  // 완료 상태 토글
      break;
    }
  }
  render();  // 변경 사항을 반영하여 다시 렌더링
}

// 할 일을 삭제하는 함수
function deleteTask(id){
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)  // // 해당 인덱스에서 할 일 삭제
      break;
    }
  }
  render();
}



// 고유 ID를 생성하는 함수
function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);  // 랜덤 문자열 생성
}
