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
const characterFlow = document.querySelector("#characterFlow");
const registerSection = document.querySelector("#register");

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

  registerSection.hidden = true;
  characterFlow.hidden = false;
  showCharacterStep(1);

  registerCompleteMessage.hidden = false;

  console.log("회원가입이 완료되었습니다.");
}

// addEventListener(애드 이벤트 리스너)로 이벤트와 함수를 연결합니다.

const registerForm = document.querySelector(".subscribe-form");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});

const themeButton = document.querySelector("#themeButton");

function handleThemeClick() {
  const isDark = document.body.classList.toggle("dark");

  themeButton.textContent = isDark
    ? "밝은 테마로 바꾸기"
    : "어두운 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

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
    characterFlow.hidden = true;
    sessionFlow.hidden = false;

    sessionCharacterName.textContent = characterName.value.trim();
  });

const sessionFlow = document.querySelector("#sessionFlow");
const sessionCharacterName = document.querySelector("#sessionCharacterName");
const sessionForm = document.querySelector(".session-form");

const sessionTitle = document.querySelector("#sessionTitle");
const sessionTitleHelp = document.querySelector("#sessionTitleHelp");
const sessionTitleCount = document.querySelector("#sessionTitleCount");

sessionTitle.addEventListener("input", function () {
  const length = sessionTitle.value.length;
  const enough = sessionTitle.value.trim().length >= 2;

  sessionTitleCount.textContent = `${length} / 60자`;

  if (enough) {
    sessionTitleHelp.textContent = "입력 조건을 충족했습니다.";
  } else {
    sessionTitleHelp.textContent = "세션 제목을 2자 이상 입력해 주세요.";
  }
   // 오류가 발생한 상태에서 입력을 수정하면 다시 검사
  if (sessionTitle.getAttribute("aria-invalid") === "true") {
    if (!sessionTitle.value.trim()) {
      sessionError.textContent = "세션 제목을 입력해 주세요.";
    } else if (!enough) {
      sessionError.textContent = "세션 제목을 2자 이상 입력해 주세요.";
    } else {
      sessionError.textContent = "";
      sessionTitle.removeAttribute("aria-invalid");
    }
  }

  // 조건 충족 상태 표시
  sessionTitle.classList.toggle(
    "is-valid",
    enough && sessionTitle.getAttribute("aria-invalid") !== "true"
  );
});
const sessionDate = document.querySelector("#sessionDate");
const sessionLog = document.querySelector("#sessionLog");
// 세션 상세 기록 선택
const sessionLogOption = document.querySelector("#sessionLogOption");
const sessionLogFields = document.querySelector("#sessionLogFields");

// 체크박스 상태에 따라 입력창 표시
function syncSessionLogFields() {
  const open = sessionLogOption.checked;

  sessionLogOption.setAttribute("aria-expanded", String(open));
  sessionLogFields.hidden = !open;
  sessionLog.disabled = !open;
}

sessionLogOption.addEventListener("change", syncSessionLogFields);
syncSessionLogFields();
const sessionError = document.querySelector("#sessionError");
const sessionSave = document.querySelector("#sessionSave");
const sessionStatus = document.querySelector("#sessionStatus");
const sessionResult = document.querySelector("#sessionResult");
const sessionSummary = document.querySelector("#sessionSummary");
const sessionRestart = document.querySelector("#sessionRestart");

sessionSave.addEventListener("click", function () {
  const title = sessionTitle.value.trim();
  const date = sessionDate.value;
  
  // 체크박스를 선택한 경우에만 상세 기록 사용
  const log = sessionLogOption.checked
    ? sessionLog.value.trim()
    : "";

  if (!title) {
    sessionError.textContent = "세션 제목을 입력해 주세요.";
    sessionTitle.setAttribute("aria-invalid", "true");
    sessionTitle.focus();
    return;
  }

  if (title.length < 2) {
    sessionError.textContent = "세션 제목을 2자 이상 입력해 주세요.";
    sessionTitle.setAttribute("aria-invalid", "true");
    sessionTitle.focus();
    return;
  }

  sessionTitle.removeAttribute("aria-invalid");

  if (!date) {
    sessionError.textContent = "플레이 날짜를 입력해 주세요.";
    sessionDate.focus();
    return;
  }

sessionError.textContent = "";

  // 저장 중 상태 표시
  sessionSave.disabled = true;
  sessionSave.textContent = "저장하는 중…";
  sessionStatus.textContent = "세션 기록을 처리하고 있습니다.";
  sessionForm.setAttribute("aria-busy", "true");

  // 저장 처리 시간 표현
  setTimeout(function () {
    // 9주차: 저장 실패 상황 테스트
    const forceSaveFailure =
      new URLSearchParams(window.location.search).has("save-error");

    if (forceSaveFailure) {
      sessionSave.disabled = false;
      sessionSave.textContent = "세션 기록 저장";
      sessionStatus.textContent =
        "저장하지 못했습니다. 입력한 내용은 그대로 두었습니다. 다시 시도해 주세요.";
      sessionForm.setAttribute("aria-busy", "false");
      return;
    }
    sessionSummary.textContent =
      `캐릭터: ${characterName.value.trim()} / ` +
      `세션: ${title} / ` +
      `날짜: ${date} / ` +
      `기록: ${log || "작성된 기록 없음"}`;

    // 저장 완료 상태
    sessionSave.disabled = false;
    sessionSave.textContent = "세션 기록 저장";
    sessionStatus.textContent = "세션 기록이 완료되었습니다.";
    sessionForm.setAttribute("aria-busy", "false");

    sessionForm.hidden = true;
    sessionResult.hidden = false;
  }, 600);
});

sessionRestart.addEventListener("click", function () {
  // 입력값 초기화
  sessionTitle.value = "";
  sessionDate.value = "";
  sessionLog.value = "";

  // 체크박스와 상세 기록 입력창 초기화
  sessionLogOption.checked = false;
  syncSessionLogFields();

  // 글자 수와 안내 문구 초기화
  sessionTitleCount.textContent = "0 / 60자";
  sessionTitleHelp.textContent = "세션 제목을 2자 이상 입력해 주세요.";

  // 오류 및 입력 상태 초기화
  sessionError.textContent = "";
  sessionStatus.textContent = "";
  sessionTitle.removeAttribute("aria-invalid");
  sessionTitle.classList.remove("is-valid");

  // 새 세션 작성 화면 표시
  sessionResult.hidden = true;
  sessionForm.hidden = false;

  sessionTitle.focus();
});