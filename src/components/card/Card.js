import React from 'react';
import TimeAgo from 'react-timeago';

class Card extends React.Component {

    render(){
        const { data, ownership } = this.props;

        const edit = (
            <a href="#" className="btn btn-default btn-xs pull-right" role="button">
                <i className="glyphicon glyphicon-edit"></i>
            </a>
        );

        return (
            <div className="thumbnail">
                <div className="caption">
                    <p>{data.contents}</p>
                    <p>wrote a log · <TimeAgo date={data.date.created}/></p>
                    { ownership ? edit : undefined }
                    <a href="#" className="btn btn-default btn-xs" role="button">More Info</a>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    data : React.PropTypes.object,
    ownership : React.PropTypes.bool
};

Card.defaultProps = {
    data : {
        _id : 'id1234567890',
        writer : 'Writer',
        contents : 'Contents',
        means : 'Means',
        examples : 'Examples',
        is_edited : false,
        date : {
            edited : new Date(),
            created : new Date()
        }
    },
    ownership : true
};

export default Card;