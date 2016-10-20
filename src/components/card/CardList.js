import React from 'react';
import {
    easings,
    SpringGrid,
    CSSGrid,
    makeResponsive,
    measureItems,
    layout as layouts,
    enterExitStyle as enterExitStyles} from 'react-stonecutter';

import _ from 'lodash';

import { Card } from 'components';

//const layout = ['Pinterest', 'Simple'];
//const enterExitStyles = ['Simple', 'Skew', 'Newspaper', 'Fold Up', 'From Center', 'From Left to Right', 'From Top', 'From Bottom'];
const config = {
    measured: true,
    useCSS: false,
    responsive: false,
    layout: _.camelCase('Pinterest'),
    enterExitStyle: _.camelCase('From Center'),
    duration: 800,
    stiffness: 60,
    damping: 14,
    columns: 2,
    gutters: 10,
    easing: easings.cubicOut
};

class CardList extends React.Component {

    constructor(props){
        super(props);
        this.state = this.createGrid(config.useCSS, config.measured, config.responsive);
    }

    createGrid(useCSS, measured, responsive){
        let Grid = useCSS ? CSSGrid : SpringGrid;

        if(measured){
            Grid = measureItems(Grid);
        }

        if(responsive){
            Grid = makeResponsive(Grid, {
                maxWidth: 800,
                minPadding: 100
            });
        }

        return {Grid};
    };

    render(){
        const mapToComponents = data =>{
            return data.map((card, i) =>{
                return (
                    <li
                        key={i}
                        className="grid-item"
                        style={{
                            width: 300
                          }}>
                        <Card
                            data={card}
                            ownership={ (card.writer === this.props.currentUser) }
                            key={card._id}/>
                    </li>);
            });
        };

        const { useCSS, responsive, layout, enterExitStyle,
            duration, easing, stiffness, damping, gutters, columns } = config;

        const { Grid } = this.state;

        const gridLayout = layouts[layout];
        const gridEnterExitStyle = enterExitStyles[enterExitStyle];

        return (
            <div className="grid_wrapper">
                <Grid
                    className="grid"
                    component="ul"
                    columns={!responsive ? columns : null}
                    columnWidth={300}
                    gutterWidth={gutters}
                    gutterHeight={gutters}
                    layout={gridLayout}
                    enter={gridEnterExitStyle.enter}
                    entered={gridEnterExitStyle.entered}
                    exit={gridEnterExitStyle.exit}
                    perspective={600}
                    duration={useCSS ? duration : null}
                    easing={useCSS ? easing : null}
                    springConfig={!useCSS && stiffness && damping ? { stiffness, damping } : null}
                    itemHeight={150}>
                    {mapToComponents(this.props.data)}
                </Grid>
            </div>
        );
    }
}

CardList.propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string
};

CardList.defaultProps = {
    data: [],
    currentUser: ''
};

export default CardList;