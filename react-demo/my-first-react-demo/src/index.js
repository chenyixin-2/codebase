import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'

// var element = React.createElement('h1', { className:'greeting'}, 'hello react js');
// ReactDOM.render(element, document.getElementById('root'));

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        }
    }
    
    render() {
        return (
            <button className="square" onClick={() => this.setState({value: 'X'})}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: [
                'O', null, 'X',
                'X', 'X', 'O',
                'O', null, null,
              ],
        }
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div> {/* status */}</div>
                    <ol>  {/* todo */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)