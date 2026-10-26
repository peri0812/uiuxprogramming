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

const registerForm = document.querySelector(".subscribe-form");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});

const themeButton = document.querySelector("#themeButton");
const userNameInput = document.querySelector("#userName");
const userNameCount = document.querySelector("#userNameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
  const isDark = document.body.classList.toggle("dark");

  themeButton.textContent = isDark
    ? "밝은 테마로 바꾸기"
    : "어두운 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleUserNameInput() {
  const currentLength = userNameInput.value.length;
  userNameCount.textContent = currentLength + " / 10";
}

userNameInput.addEventListener("input", handleUserNameInput);

function handleAgreeChange() {
  const agreed = agreeCheck.checked;

  startButton.disabled = !agreed;
  agreeMessage.textContent = agreed
    ? "확인이 완료되었습니다. 서비스를 시작할 수 있습니다."
    : "안내 확인 후 서비스를 시작할 수 있습니다.";

  agreeMessage.classList.toggle("is-ready", agreed);
}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
  tabs.forEach(function (tab) {
    tab.classList.remove("is-active");
    tab.setAttribute("aria-selected", "false");
  });

  panels.forEach(function (panel) {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });
}

function activateTab(clickedTab) {
  const targetSelector = clickedTab.dataset.target;
  const targetPanel = document.querySelector(targetSelector);

  clickedTab.classList.add("is-active");
  clickedTab.setAttribute("aria-selected", "true");

  targetPanel.classList.add("is-active");
  targetPanel.hidden = false;
}

function handleTabClick(event) {
  resetTabsAndPanels();
  activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", handleTabClick);
});

// 캐릭터 등록 화면과 입력 요소
const characterFlow = document.querySelector("#characterFlow");
const characterSteps = document.querySelectorAll(".character-step");
const characterProgress = document.querySelector("#characterProgress");
const characterName = document.querySelector("#characterName");
const characterRule = document.querySelector("#characterRule");
const characterError = document.querySelector("#characterError");
const ruleError = document.querySelector("#ruleError");
const characterSummary = document.querySelector("#characterSummary");

const characterStepNames = [
  "캐릭터 정보 입력",
  "TRPG 룰 선택",
  "등록 정보 확인"
];

// 단계에 따라 화면 전환
function showCharacterStep(step) {
  characterSteps.forEach(function (item) {
    item.hidden = Number(item.dataset.step) !== step;
  });

  characterProgress.textContent = step <= 3
    ? `${step} / 3 · ${characterStepNames[step - 1]}`
    : "캐릭터 등록 완료";
}

// 입력 오류 표시 및 해제
function setCharacterError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.toggle("has-error", Boolean(message));

  if (message) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
}

// 기존 서비스 시작 버튼과 연결
startButton.addEventListener("click", function () {
  if (!agreeCheck.checked) {
    return;
  }

  characterFlow.hidden = false;
  showCharacterStep(1);

  characterFlow.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  characterName.focus({ preventScroll: true });
});

// 1단계: 캐릭터 이름 검사
document.querySelector("#characterNext1")
  .addEventListener("click", function () {
    const name = characterName.value.trim();

    if (!name) {
      setCharacterError(
        characterName,
        characterError,
        "캐릭터 이름을 입력해 주세요."
      );
      characterName.focus();
      return;
    }

    setCharacterError(characterName, characterError, "");
    showCharacterStep(2);
    characterRule.focus();
  });

// 이름 수정 시 오류 메시지 제거
characterName.addEventListener("input", function () {
  if (characterName.value.trim()) {
    setCharacterError(characterName, characterError, "");
  }
});

// 2단계: TRPG 룰 선택 검사
document.querySelector("#characterNext2")
  .addEventListener("click", function () {
    if (!characterRule.value) {
      setCharacterError(
        characterRule,
        ruleError,
        "사용할 TRPG 룰을 선택해 주세요."
      );
      characterRule.focus();
      return;
    }

    setCharacterError(characterRule, ruleError, "");

    // 입력 내용을 확인 화면에 표시
    characterSummary.textContent =
      `캐릭터 이름: ${characterName.value.trim()} / ` +
      `TRPG 룰: ${characterRule.value}`;

    showCharacterStep(3);
  });

// 룰 변경 시 오류 메시지 제거
characterRule.addEventListener("change", function () {
  if (characterRule.value) {
    setCharacterError(characterRule, ruleError, "");
  }
});

// 2단계에서 1단계로 돌아가기
document.querySelector("#characterBack2")
  .addEventListener("click", function () {
    showCharacterStep(1);
    characterName.focus();
  });

// 3단계에서 2단계로 돌아가기
document.querySelector("#characterBack3")
  .addEventListener("click", function () {
    showCharacterStep(2);
    characterRule.focus();
  });

// 캐릭터 등록 완료
document.querySelector("#characterComplete")
  .addEventListener("click", function () {
    showCharacterStep(4);
  });

// 다시 등록하기: 입력값과 진행 상태 초기화
document.querySelector("#characterRestart")
  .addEventListener("click", function () {
    characterName.value = "";
    characterRule.value = "";

    setCharacterError(characterName, characterError, "");
    setCharacterError(characterRule, ruleError, "");

    characterSummary.textContent = "";

    showCharacterStep(1);
    characterName.focus();
  });
