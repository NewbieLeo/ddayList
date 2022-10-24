class schedule extends React.Component {
    render() {
        return (
            <div class="schedule">
                <div class="type">
                    <p class="subject">1|2</p>
                    <p class="name" style="color: gray;">3</p>
                </div>
                <div class="date">
                    <p class="day">6/9</p>
                    <h1 class="d_day" style="color: gray;">not</h1>
                </div>
            </div>,
            <div class="sep"></div>
        )
    }
}
ReactDOM.render(schedule, document.querySelector('.scheduled'));