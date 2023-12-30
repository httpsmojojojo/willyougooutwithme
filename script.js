const wrapper = document.querySelector(".wrapper");
const question = wrapper.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

noBtn.addEventListener("mouseover", () => {
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});

const datePicker = document.getElementById("datePicker");
const dateMessage = document.querySelector(".date-message");

yesBtn.addEventListener("click", () => {
    const selectedDate = datePicker.value;

    if (selectedDate) {
        const visitorInfo = {
            ip: getVisitorIP(),
            userAgent: navigator.userAgent,
            chosenDate: selectedDate,
            answeredYes: true,
        };
        fetch('http://localhost:3000/api/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'yes',
                date: selectedDate,
                visitorInfo,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response if needed
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Update the question text and gif source
        const userDate = new Date(selectedDate + "T00:00:00Z");
        const timeZoneOffset = userDate.getTimezoneOffset();
        userDate.setMinutes(userDate.getMinutes() + timeZoneOffset);
        const formattedDate = userDate.toDateString();
        const message = `Yay, see you on ${formattedDate}!`;
        question.innerHTML = message;
        gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";
    } else {
        alert("Please choose a date first.");
    }
});

function getVisitorIP(){
    return '127.0.0.1';
}