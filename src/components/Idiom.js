import React from 'react';
import TimeAgo from 'react-timeago';

class Idiom extends React.Component {
    componentDidUpdate(){
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-' + this.props.data._id).dropdown({
            belowOrigin : true // Displays dropdown below the button
        });
    }

    componentDidMount(){
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-' + this.props.data._id).dropdown({
            belowOrigin : true // Displays dropdown below the button
        });
    }

    render(){
        const { data, ownership } = this.props;

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                   id={`dropdown-button-${data._id}`}
                   data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );
        const idiomView = (
            <div className="card">
                <div className="info">
                    <a className="username">{data.writer}</a>
                     wrote a log · <TimeAgo date={data.date.created}/>
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="card-content">
                    {data.means}
                </div>
                <div className="card-content">
                    {data.examples}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        );
        return (
            <div className="container idiom">
                {idiomView}
            </div>
        );
    }
}

Idiom.propTypes = {
    data : React.PropTypes.object,
    ownership : React.PropTypes.bool
};

Idiom.defaultProps = {
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
        },
        starred : []
    },
    ownership : true
};

export default Idiom;