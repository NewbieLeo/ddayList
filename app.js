let scheduledArea = document.querySelector(".scheduled");
let dateObject = new Date();
let currentMonth = dateObject.getMonth() + 1;
let currentDay = dateObject.getDate();
const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

function addScheduledTest (subject, method, m, d) {
    let $schedule = document.createElement("div");
    let $type = document.createElement("div");
    let $date = document.createElement("div");
    let $subject = document.createElement("p");
    let $name = document.createElement("p");
    let $day = document.createElement("p");
    let $d_day = document.createElement("h1");
    let $line = document.createElement("div")
    
    $schedule.classList.add("schedule");
    $type.classList.add("type");
    $date.classList.add("date");
    $subject.classList.add("subject");
    $name.classList.add("name");
    $day.classList.add("day");
    $d_day.classList.add("d_day");
    $line.classList.add("sep")
    
    $type.appendChild($subject);
    $type.appendChild($name);
    $date.appendChild($day);
    $date.appendChild($d_day);
    $schedule.appendChild($type);
    $schedule.appendChild($date);
    scheduledArea.appendChild($schedule);
    scheduledArea.appendChild($line);
    
    $subject.innerHTML = subject;
    $name.innerHTML = method;
    
    // Calcs remaining days
    today = new Date(`2022-${currentMonth}-${currentDay}, 00:00:00 +0900`)
    testDate = new Date(`2022-${m}-${d}, 00:00:00 +0900`)
    leftDays = ((testDate - today) / 86400000).toFixed();
    $day.innerHTML = `${m}/${d} (${weekDays[testDate.getDay()]})`

    if (isNaN(leftDays)) {
        $d_day.innerHTML = "미정";
        $day.innerHTML = "예정 날짜";
        $d_day.style.color = "gray";
    } else if (leftDays < 0) {
        $d_day.innerHTML = "<s>종료</s>";
        $d_day.style.color = "gray";
        $name.innerHTML = `<s>${$name.innerHTML}</s>`;
        $name.style.color = "gray";
    } else if (leftDays == 0) {
        $d_day.innerHTML = "D-DAY";
        // $d_day.style.fontSize = "4.8vh";
        $d_day.style.color = "crimson";
        $name.style.color = "crimson";
    } else if (leftDays <= 3) {
        $d_day.innerHTML = `D-${leftDays}`;
        $d_day.style.color = "crimson";
        $name.style.color = "crimson";
    } else {
        $d_day.innerHTML = `D-${leftDays}`;
    }
    
}


testList = [
    ["영어 | Day 13~16, 단답형", "어휘 평가", 6, 2],
    ["과학 | ~3단원", "서술형 평가", 6, 3],
    ["국어", "구술평가", 6, 7],
    ["중국어", "서술형 평가", 6, 7],
    ["사회 | 1~3단원", "서술형 평가", 6, 7],
    ["기술·가정", "서술형 평가", 6, 8],
    ["수학 | ~91쪽", "서술형 평가", 6, 9],
    ["역사", "발표 수행평가", 6, 13],
    ["사회", "수행 평가"],
    ["중국어", "구술 평가"]
];

testList.forEach(([subject, test, month, day]) => {
    addScheduledTest(subject, test, month, day);
})
