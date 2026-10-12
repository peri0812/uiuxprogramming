// 파일이 실행되는지 확인하는 임시 로그입니다.
console.log("JavaScript가 연결되었습니다.");

// 다시 대입하지 않을 값은 const(콘스트)로 저장합니다.
const panelTitle = "회원가입";

// 실행 중 바뀌는 상태는 let(렛)으로 저장합니다.
let isRegistered = false;

const message = "회원가입을 진행해 주세요."; // String(스트링): 문자
const count = 1;                             // Number(넘버): 숫자
const isReady = true;                        // Boolean(불리언): 참/거짓

// typeof(타입오브)로 자료형을 확인합니다.
console.log(typeof message); // "string"
console.log(typeof count);   // "number"
console.log(typeof isReady); // "boolean"

const selectedMethod = "email";

// ===(일치 비교)는 값과 자료형을 모두 비교합니다.
if (selectedMethod === "email") {
  console.log("이메일 회원가입을 선택했습니다.");
} else {
  console.log("회원가입 방식을 선택해 주세요.");
}

// 함수 선언: 동작에 이름을 붙입니다.
function makeRegisterMessage(isRegistered) {
  if (isRegistered === true) {
    return "회원가입이 완료되었습니다."; // return(리턴): 결과 반환
  }

  return "이메일을 입력해 회원가입을 진행해 주세요.";
}

// 함수 호출: 필요한 순간에 실행합니다.
const testMessage = makeRegisterMessage(true);
console.log(testMessage);

// 회원가입 버튼과 바꿀 문구를 DOM에서 찾습니다.
// #은 id 선택자이며 HTML의 id와 철자가 같아야 합니다.
const registerMessage = document.querySelector("#registerMessage");
const registerButton = document.querySelector("#registerButton");

// 찾은 HTML 요소를 확인합니다.
console.log(registerMessage, registerButton);

// 회원가입 버튼을 클릭했을 때 실행되는 함수입니다.
function registerUser() {
  // 회원가입 상태를 true로 변경합니다.
  isRegistered = true;

  // 안내 문구를 회원가입 완료 문구로 변경합니다.
  registerMessage.textContent = makeRegisterMessage(isRegistered);

  // classList(클래스 리스트)에 상태 클래스를 추가합니다.
  registerMessage.classList.add("is-registered");

  // 버튼 글자를 가입 완료 상태에 맞게 바꿉니다.
  registerButton.textContent = "가입 완료";

  // disabled(디스에이블드)는 중복 클릭을 막습니다.
  registerButton.disabled = true;

  console.log("회원가입이 완료되었습니다.");
}

// addEventListener(애드 이벤트 리스너)로 이벤트와 함수를 연결합니다.
registerButton.addEventListener("click", registerUser);