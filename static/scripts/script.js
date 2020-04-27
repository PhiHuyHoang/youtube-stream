class GenNumber extends React.Component {
	componentDidUpdate() {
		let time, digit;
		// increase showing time depend on level
		digit = this.props.level.main + 2;
		time = 100 * Math.min(digit, 5) + 400 * Math.max(digit-5, 0);

		let number = document.getElementById('number');
		setTimeout(function() {
				number.innerHTML = number.innerHTML.replace(/\w/gi, '&#183;');
			}, time);

	}
	componentDidMount() {
		let number = document.getElementById('number');
		setTimeout(function() {
			number.innerHTML = number.innerHTML.replace(/\w|\W/gi, '&#183;');
		}, 1200);
	}
	render() {
		return(
			<div className="app__gen-number">
				<div className="app__info">
					<p className="app__level">Level: {this.props.level.main} - {this.props.level.sub}</p>
					<p className="app__wrong">Wrong: {this.props.wrong}/3</p>
				</div>
				<p className="app__divider">############################</p>
				<p className="app__number" id="number">{(this.props.wrong < 3 || this.props.win === false) ? atob(this.props.question) : '????'}</p>
				<p className="app__divider">############################</p>
			</div>
		)
	}
}

class InputNumber extends React.Component {
	constructor() {
		super();
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	handleUserInput(e) {
		e.preventDefault();
		let userNumber = btoa(this.userNumber.value);
		this.userNumber.value = "";
		this.props.compareUserInput(userNumber);
	}
	handleReset() {
		this.props.onReset();
	}
	render() {
        let layout;

		if(this.props.wrong < 3) {
			layout = <div className="app__input">
						<form onSubmit={this.handleUserInput}>
							Number is: 
							<input 
								pattern="[0-9]+"
								type="password"
								ref={ (ref) => this.userNumber = ref } 
								required
								autoFocus />
							<br/>
							<br/>
						</form>
						<button onClick={this.handleReset}>Restart</button>
					</div>
        if(this.props.win === true){
            layout = <div className="app__end">
						<div class="app__notify">Good jobs! (✧ω✧)</div><br/><br/>
					</div>;
        }
		} else {
			layout = <div className="app__end">
						<div class="app__notify">Better luck next time (✧ω✧)</div><br/><br/><button onClick={this.handleReset}>Restart</button>
					</div>;
		}
        
		return(layout)
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.compareUserInput = this.compareUserInput.bind(this);
		this.randomGenerate = this.randomGenerate.bind(this);
		this.resetState = this.resetState.bind(this);
		this.state = {
			question: btoa(this.randomGenerate(2)),
			level: {main: 1, sub: 1},
            wrong: 0,
            win: false 		
		}
	}
	resetState() {
		this.setState({
			question: btoa(this.randomGenerate(2)),
			level: {main: 1, sub: 1},
            wrong: 0,
            win: false
		})
	}
	randomGenerate(digit) {
		let max = Math.pow(10, digit) - 1,
			min = Math.pow(10, digit - 1)

		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	compareUserInput(userNumber) {
		let currQuestion = this.state.question,
			mainLevel = this.state.level.main,
			subLevel = this.state.level.sub,
            wrong = this.state.wrong,
            win = this.state.win,
			digit;

        let inc = 3;
        let maxLevel = 5;
        let secretPassword = btoa(371995);
        if(userNumber == secretPassword)
        {
            win = true;
        }
        else
        {
		if(userNumber == currQuestion) {
			if(subLevel < maxLevel) {
                mainLevel+= inc;
                subLevel += 1;
			} else 
			if(subLevel == maxLevel) {
				// mainLevel+= 5;
                // subLevel = 1;
                win = true;
			}
        }
         else {            
            ++wrong;
        }
        }
        
		digit = mainLevel + 2;

		this.setState({
			question: btoa(this.randomGenerate(digit)),
			level: {main: mainLevel, sub: subLevel},
            wrong: wrong,
            win: win
		});
	}
	render() {
        if(this.state.win === false)
        {
            return(
                <div className="main__app">
                    <GenNumber 
                        question={this.state.question}
                        level={this.state.level}
                        wrong={this.state.wrong}
                        win = {this.state.win} />
                    <InputNumber 
                        compareUserInput={this.compareUserInput} 
                        wrong = {this.state.wrong} 
                        onReset = {this.resetState}
                        win = {this.state.win} />
                </div>
            )
        }
        else{
            return (
                <div className="app__end">
						<div class="app__notify">Good jobs! (✧ω✧)</div><br/><br/>
                        <div class="app__notify">
                        <a href="https://github.com/TeamNewPipe/NewPipe/releases/download/v0.19.2/NewPipe_v0.19.2.apk">NewPipe.apk</a>
                        </div>
				</div>
            )
        }
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)