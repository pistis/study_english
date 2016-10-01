import React from 'react';
import { Idiom } from 'components';

class IdiomList extends React.Component {
    render(){
        const mapToComponents = data =>{
            return data.map((idiom, i) =>{
                return (<Idiom
                    data={idiom}
                    ownership={ (idiom.writer === this.props.currentUser) }
                    key={idiom._id}
                />);
            });
        };

        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

IdiomList.propTypes = {
    data : React.PropTypes.array,
    currentUser : React.PropTypes.string
};

IdiomList.defaultProps = {
    data : [],
    currentUser : ''
};

export default IdiomList;