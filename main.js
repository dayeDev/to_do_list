// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

// 할 일을 추가하는 버튼 클릭 이벤트
addButton.addEventListener("click", addTask);

// 할 일을 추가하는 함수
function addTask(){
  let task = {
    id: randomIDGenerate(),  // 고유 ID 생성
    taskContent: taskInput.value,  // 입력한 할 일 내용
    isComplete: false  // 완료 상태(기본값: 미완료)
  };
  taskList.push(task);  // 할 일 목록에 추가
  taskInput.value = "";  // 입력 필드 초기화
  console.log(taskList);  
  render();  // 화면에 할 일 목록 그리기
}

// 할 일 목록을 화면에 렌더링하는 함수
function render(){
  let resultHTML = "";
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].isComplete == true){
      resultHTML += `<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Undo</button>
            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
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
  taskList = taskList.filter(task => task.id !== id);  // 해당 ID의 할 일을 제외
  render();
}

// 고유 ID를 생성하는 함수
function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);  // 랜덤 문자열 생성
}
