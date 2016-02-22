var ParagraphComponent = React.createClass({
    getInitialState: function() {
        return {count: 0}
    },

    _incrementCount: function(value) {
        this.setState({count: this.state.count + value});
    },

    render: function () {
        return (
            <div>
                <p>{this.state.count}</p>
                <FormComponent onFormSubmit={this._incrementCount} />
            </div>
        )
    }
});

var FormComponent = React.createClass({
    getInitialState: function() {
        return {number: 0}
    },

    _handleSubmit: function(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state.number);
    },

    _handleNumberChange: function(event) {
        this.setState({number: Number(event.target.value)});
    },

    render: function(){
        return (
            <form onSubmit={this._handleSubmit}>
                <input type="number" onChange={this._handleNumberChange} value={this.state.number}/>
                <input type="submit" value="Increment" />
                <p>
                    {this.state.number}
                </p>
            </form>
        )
    }
});

ReactDOM.render(<ParagraphComponent />, document.getElementById('content'));
