import React from 'react';
import left from "../../dist/svg/left.svg";
import right from "../../dist/svg/right.svg";
import SVG from "react-inlinesvg";

class MonthIndicator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            month: this.props.month,
            year: this.props.year,
            mousePrev: false,
            mouseNext: false
        };
        this.mousePrev = this.mousePrev.bind(this);
        this.mouseNext = this.mouseNext.bind(this);
    }

    mousePrev() {
        this.setState({
            mousePrev: !this.state.mousePrev
        });
    }

    mouseNext() {
        this.setState({
            mouseNext: !this.state.mouseNext
        });
    }

    styling(mouseState) {
        if(mouseState){
            return {'border-color': '#C4C4C4'};
        } else {
            return {'border-color': '#E4E7E7'};
        }
    }

    render() {
    
        let stylePrev = this.styling(this.state.mousePrev);
        let styleRight = this.styling(this.state.mouseNext);
        return (
        <div id="month-container">
            <div className="month-indicator">
                <SVG
                    id="prev-button" className="transition svg"
                    src={left}
                    style={stylePrev}
                    onMouseEnter={this.mousePrev} 
                    onMouseLeave={this.mousePrev}
                    onClick={() => {
                    console.log("hi  svg");
                    }}
                 />
                <time> 
                    {this.state.month} {this.state.year} 
                </time>
                <SVG
                    id="next-button" className="transition svg"
                    src={right}
                    style={styleRight}
                    onMouseEnter={this.mouseNext} 
                    onMouseLeave={this.mouseNext}
                    onClick={() => {
                    console.log("hi  svg");
                    }}
                 />
            </div>
        </div>
        );
    }
}

export default MonthIndicator;


