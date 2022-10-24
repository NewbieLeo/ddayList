
// Import the functions you need from the SDKs you need


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
    ["수학 | ~91쪽", "서술형 평가", 6, 9],
    ["역사", "발표 수행평가", 6, 13],
    ["기술·가정", "서술형 평가", 6, 15],
    ["사회", "수행 평가",],
    ["중국어", "구술 평가"]
];

document.querySelector(".left").innerHTML = `예정된 수행평가가 ${testList.length}개 남았습니다.`

/* testList.forEach(([subject, test, month, day]) => {
    addScheduledTest(subject, test, month, day);
}) */

const firebaseConfig = {
    apiKey: "AIzaSyAEuYaMf87Pq_196a2mmrFEYDhbuRbnCaA",
    authDomain: "sahmyook-event.firebaseapp.com",
    projectId: "sahmyook-event",
    storageBucket: "sahmyook-event.appspot.com",
    messagingSenderId: "29381676933",
    appId: "1:29381676933:web:97532619c6bad4497cfeec",
    measurementId: "G-6DTXJK77XS"
};
firebase.initializeApp(firebaseConfig);

var dataBox = [];
function DBget() {
    const db = firebase.firestore();
    db.collection('data').get().then(
        e => { e.forEach(doc => { dataBox.push(doc.data()) }) }
    )   
}

window.onload = function() {
    
    setTimeout(() => {
        DBget();
    }, 1000);

    setTimeout(() => {
        console.log(dataBox)
        for (let a of dataBox) {
            document.querySelector(".left").innerHTML = `예정된 수행평가가 ${Object.keys(a).length}개 남았습니다.`
            for (let event in a) {
                addScheduledTest(a[event].subject, a[event].type, a[event].date.split('-')[1], a[event].date.split('-')[2])
            }
        }
    }, 2000);
}