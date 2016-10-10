import React from 'react';

class IdiomWrite extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            contents : '',
            means : '',
            examples : ''
        };

        this.handleChangeContents = this.handleChangeContents.bind(this);
        this.handleChangeMeans = this.handleChangeMeans.bind(this);
        this.handleChangeExamples = this.handleChangeExamples.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleChangeContents(e){
        this.setState({
            contents : e.target.value
        });
    }

    handleChangeMeans(e){
        this.setState({
            means : e.target.value
        });
    }

    handleChangeExamples(e){
        this.setState({
            examples : e.target.value
        });
    }

    handlePost(){
        let contents = this.state.contents;
        let means = this.state.means;
        let examples = this.state.examples;

        this.props.onPost(contents, means, examples).then(
            () =>{
                this.setState({
                    contents : '',
                    means : '',
                    examples : ''
                });
            }
        );
    }

    render(){
        return (
            <div className="container write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Contents"
                            value={this.state.contents}
                            onChange={this.handleChangeContents}></textarea>
                    </div>
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Means"
                            value={this.state.means}
                            onChange={this.handleChangeMeans}></textarea>
                    </div>
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Examples"
                            value={this.state.examples}
                            onChange={this.handleChangeExamples}></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.handlePost}>POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

IdiomWrite.propTypes = {
    onPost : React.PropTypes.func
};

IdiomWrite.defaultProps = {
    onPost : (contents, means, examples) =>{
        console.error('post function not defined');
    }
};

export default IdiomWrite;