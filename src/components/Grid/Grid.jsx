import React from 'react';
import './Grid.css';
import Confetti from 'react-confetti'
import {Alert} from "react-bootstrap";

let randomWords = require('random-words');

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shape: this.props.shape ? this.props.shape : 5,
            vocabulary: [],
            selected: [],
            bingoCount: 0,
        };
        this.checkBingo = this.checkBingo.bind(this);
        this.selected = this.selected.bind(this);

    }

    componentDidMount() {
        let vocab = []
        for (let i = 0; i < this.state.shape; i++) {
            vocab.push(randomWords({exactly: this.state.shape}))
        }
        this.setState({vocabulary: [...this.state.vocabulary, ...vocab]})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkBingo();
    }

    checkBingo() {
        let mainDiagonalCount = 1, secondaryDiagonalCount = 1;
        let totalBingoCount = 0;
        let horizontalCount = {};
        let verticalCount = {};
        this.state.selected.map((item) => {
            if (item.row === item.col) {
                mainDiagonalCount += 1
            }
            if (item.row + item.col === this.state.shape - 1) {
                secondaryDiagonalCount += 1
            }
            horizontalCount[item.row] = (item.row === Math.floor(this.state.shape / 2) ? horizontalCount[item.row] || 1 : horizontalCount[item.row] || 0) + 1;
            verticalCount[item.col] = (item.col === Math.floor(this.state.shape / 2) ? verticalCount[item.col] || 1 : verticalCount[item.col] || 0) + 1;
            return item;
        })
        for (let r in horizontalCount) {
            if (horizontalCount[r] >= this.state.shape ) {
                totalBingoCount += 1;
            }
        }
        for (let c in verticalCount) {
            if (verticalCount[c] >= this.state.shape ) {
                totalBingoCount += 1;
            }
        }
        if (mainDiagonalCount >= this.state.shape) {
            totalBingoCount += 1;

        }
        if (secondaryDiagonalCount >= this.state.shape) {
            totalBingoCount += 1;

        }
        if (totalBingoCount > this.state.bingoCount) {
            this.setState({bingoCount: totalBingoCount});
        }
    }

    selected(e, row, col) {

        let selection = {"row": row, "col": col};
        if (e.target.className === "btn btn-secondary btn-sm") {
            e.target.className = "btn btn-success btn-sm";
            e.target.disabled = true;
            this.setState({selected: [...this.state.selected, selection]});

        }
        // else {
        //     e.target.className = "btn btn-secondary btn-sm";
        //     this.setState({
        //         selected: this.state.selected.filter(obj => {
        //             return (obj.row !== row || obj.col !== col)
        //         }),
        //         bingoCount: this.state.bingoCount-1
        //     });
        // }
    }

    render() {
        return (
            <div className="container">
                {this.state.bingoCount > 0 ?
                    <Alert key={this.state.bingoCount} variant="success">
                        BingooOooO 🏆, Total Bingo(s) : {this.state.bingoCount}
                        <Confetti className={"confetti"}/>
                    </Alert>
                    : null}
                {this.state.vocabulary.map((row, r) => (
                        <div className="row m-0 board-row" key={r}>
                            {
                                row.map((col, c) =>
                                    <div className={(c % Math.floor(this.state.shape / 2) === 0 ? "col" : "col") + " inner"}
                                         key={c}>
                                        {
                                            <div>

                                                {(r === Math.floor(this.state.shape / 2) && c === Math.floor(this.state.shape / 2)) ?
                                                    <button type="button"
                                                            className="btn btn-success btn-sm" disabled={true}> Vocabulary
                                                        Raised!
                                                        Bingo 😀 </button>
                                                    // <sup>  {r}, {c}</sup>
                                                    :
                                                    <button type="button"
                                                            className="btn btn-secondary btn-sm" disabled={false}
                                                            onClick={(e) => this.selected(e, r, c)}>{col}
                                                    </button>
                                                    // <sup> {r}, {c}</sup>
                                                }


                                            </div>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                )}
            </div>
        );
    }
}

export default Grid;
