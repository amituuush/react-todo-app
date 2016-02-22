var CommentBox = React.createClass({

    getInitialState: function() {
        return {data1: []};
    },

    componentWillMount: function() {
    },

    render: function() {
        return (   // this.props.data1 is set in the ajax call ^^
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data2={this.state.data1} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div> // data2 is a property that is created in the parent CommentBox on CommentList and is accessible by CommentList below ∨∨
        )
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data1: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    },

    handleCommentSubmit: function(comment) {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: comment,
          success: function(data) {
            this.setState({data1: data}); // data or data1?
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    shouldComponentUpdate: function() {
            return true;
    }
});

var CommentList = React.createClass({
  render: function() {   // data2 references prop set in CommentBox above ^^
      var commentNodes = this.props.data2.map(function(comment) {
            return (
              <Comment author={comment.author} key={comment.id}>
                {comment.text}
              </Comment>
            );
          });

    return ( // commentNodes defined above and inserted as normal js variable using {}
      <div className="commentList">
          {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
      var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
      return { __html: rawMarkup };
    },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentForm = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },

    render: function() {
      return (
          <form className="commentForm" onSubmit={this.handleSubmit}>
              <input
              type="text"
              placeholder="Your name"
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
            <input
              type="text"
              placeholder="Say something..."
              value={this.state.text}
              onChange={this.handleTextChange}
            />
            <input type="submit" value="Post" />
          </form>
      );
    },

    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },

    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },

    handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />, document.getElementById('content'));
