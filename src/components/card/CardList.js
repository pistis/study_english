import React from 'react';
import { Card } from 'components';

class CardList extends React.Component {
    render(){
        const mapToComponents = data =>{
            return data.map((card) =>{
                return (<Card
                    data={card}
                    ownership={ (card.writer === this.props.currentUser) }
                    key={card._id}
                />);
            });
        };

        return (
            <div class="row">
                <div class="col-md-12">
                    {mapToComponents(this.props.data)}
                </div>
            </div>
        );
    }
}

CardList.propTypes = {
    data : React.PropTypes.array,
    currentUser : React.PropTypes.string
};

CardList.defaultProps = {
    data : [],
    currentUser : ''
};

export default CardList;