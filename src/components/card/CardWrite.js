import React from 'react';

class CardWrite extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            contents: '',
            means: '',
            examples: ''
        };
        
        this.handleChangeContents = this.handleChangeContents.bind(this);
        this.handleChangeMeans = this.handleChangeMeans.bind(this);
        this.handleChangeExamples = this.handleChangeExamples.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }
    
    handleChangeContents(e){
        this.setState({
            contents: e.target.value
        });
    }
    
    handleChangeMeans(e){
        this.setState({
            means: e.target.value
        });
    }
    
    handleChangeExamples(e){
        this.setState({
            examples: e.target.value
        });
    }
    
    handlePost(){
        let contents = this.state.contents;
        let means = this.state.means;
        let examples = this.state.examples;
        
        this.props.onPost(contents, means, examples).then(
            () =>{
                this.setState({
                    contents: '',
                    means: '',
                    examples: ''
                });
            }
        );
    }
    
    render(){
        return (
            <div className="modal fade" id="cardWrite" role="dialog" aria-labelledby="cardWriteLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="cardWriteLabel">New Card</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="card-contents" className="control-label">Contents:</label>
                                    <textarea className="form-control" id="card-contents" value={this.state.contents} onChange={this.handleChangeContents}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="card-means" className="control-label">Means:</label>
                                    <textarea className="form-control" id="card-means" value={this.state.means} onChange={this.handleChangeMeans}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="card-examples" className="control-label">Examples:</label>
                                    <textarea className="form-control" id="card-examples" value={this.state.examples} onChange={this.handleChangeExamples}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handlePost}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CardWrite.propTypes = {
    onPost: React.PropTypes.func
};

CardWrite.defaultProps = {
    onPost: (contents, means, examples) =>{
        console.error('post function not defined');
    }
};

export default CardWrite;