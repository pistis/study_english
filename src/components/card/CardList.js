import React from 'react';
import { CSSGrid, layout } from 'react-stonecutter';
import { Card } from 'components';

class CardList extends React.Component {
    render(){
        const mapToComponents = data =>{
            return data.map((card, i) =>{
                return (<li key={i} itemHeight={150}><Card
                    data={card}
                    ownership={ (card.writer === this.props.currentUser) }
                    key={card._id}
                /></li>);
            });
        };

        return (
            <CSSGrid
                className="grid"
                component="ul"
                columns={4}
                columnWidth={200}
                gutterWidth={4}
                gutterHeight={4}
                layout={layout.pinterest}
                duration={800}
                easing="ease-out">
                {mapToComponents(this.props.data)}
            </CSSGrid>
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