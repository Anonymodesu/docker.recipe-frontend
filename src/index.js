import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function calculateWinningLine(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}

function Square(props) {
    return (
        <button 
            className="square" 
            onClick={props.onClick}
            style={{backgroundColor: props.bgColour}}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        const winningLine = this.props.winningLine
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            key={i}
            bgColour={winningLine && winningLine.includes(i) ? "green" : "white"}
        />;
    }

    render() {
        const boardRows = [0, 1, 2].map(row =>
            <div className="board-row" key={row}>
                {[0, 1, 2].map(col => this.renderSquare(row * 3 + col))}
            </div>
        )

        return (
            <div>
                {boardRows}
            </div>

        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                move: null
            }],
            xIsNext: true,
            historyOrderAsc: true
        }
    }

    renderGameInfo(history, historyOrderAsc, lastIndex, winningLine) {
        const moves = history.map((pointInTime, index) => {
            const position = [pointInTime.move % 3, Math.floor(pointInTime.move / 3)]
            const desc = (index ?
                `Go to move #${index}, position (${position})` :
                'Go to game start')
            const boldedDesc = index === lastIndex ? <b>{desc}</b> : desc
            return (
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)}>{boldedDesc}</button>
                </li>
            )
        })
        if (historyOrderAsc) {
            moves.reverse()
        }

        let status;
        if (winningLine) {
            status = 'Winner: ' + winningLine[0]
        } else if(lastIndex == 9) {
            status = 'Draw'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div className="game-info">
                <div>{status}</div>
                <div>
                    <button onClick={
                        () => this.setState({ historyOrderAsc: !historyOrderAsc })
                    }>
                        Reorder history
                    </button>
                </div>
                <ol>{moves}</ol>
            </div>
        )
    }

    render() {
        const historyOrderAsc = this.state.historyOrderAsc
        const history = this.state.history
        const lastIndex = history.length - 1
        const current = history[lastIndex]
        const winningLine = calculateWinningLine(current.squares)

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winningLine={winningLine}
                    />
                </div>
                {this.renderGameInfo(history, historyOrderAsc, lastIndex, winningLine)}
            </div>
        );
    }

    handleClick(i) {
        const history = this.state.history.slice()
        const current = history[history.length - 1]
        const squares = current.squares.slice()

        if (calculateWinningLine(squares) || squares[i]) {
            return
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O'

        this.setState({
            history: history.concat([{
                squares: squares,
                move: i
            }]),
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step) {
        this.setState({
            history: this.state.history.slice(0, step + 1),
            xIsNext: (step % 2) === 0,
        })
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
