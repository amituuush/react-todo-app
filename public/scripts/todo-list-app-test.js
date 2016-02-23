var ToDoListContainer = React.createClass({
    getInitialState: function() {
        return {itemList: []}
    },

    _addItem: function(value) {
        this.setState({
            itemList: this.state.itemList.concat({
                name: value,
                completed: false,
                changed: false
            })
        });
    },

    _markComplete: function(index) {
        let {itemList} = this.state;
        itemList[index].completed = true;
        this.setState({
            itemList: itemList
        })
    },

    _deleteItem: function(index) {
        let {itemList} = this.state;
        itemList.splice(index, 1);
        this.setState({
            itemList: itemList
        });
    },

    _clearList: function() {
        var userAnswer = confirm('Are you sure you want to completely delete this list?');
        if (userAnswer) {
            this.setState({
                itemList: []
            })
        }
    },

    render: function() {
        return <ToDoList items={this.state.itemList} addItem={this._addItem} deleteItem={this._deleteItem} clearList={this._clearList} markComplete={this._markComplete}/>
    }
});

var ToDoList = React.createClass({
    render: function () {
        return (
            <div>
                <UserForm onFormSubmit={this.props.addItem} clearList={this.props.clearList}/>
                <ListItemContainer items={this.props.items} deleteItem={this.props.deleteItem} markComplete={this.props.markComplete} />
            </div>
        )
    }
});

var UserForm = React.createClass({
    getInitialState: function() {
        return {item: ''}
    },

    _handleSubmit: function(event) {
        event.preventDefault();
        if(this.state.item) {
            this.props.onFormSubmit(this.state.item);
        }
        this.setState({
            item: ''
        })
    },

    _handleNumberChange: function(event) {
        this.setState({item: event.target.value});
    },

    render: function(){
        return (
        <div>
            <form onSubmit={this._handleSubmit}>
                <input type="text" onChange={this._handleNumberChange} value={this.state.item}/>
                <input type="submit" value="Add item" />
            </form>
            <button onClick={this.props.clearList}>Reset</button>
        </div>
        )
    }
});

var ListItemContainer = React.createClass({
    render: function() {
        var items = this.props.items.map(
            (arrayItem, index) => {
                var handleDelete = () => {
                    this.props.deleteItem(index);
                }
                var handleComplete = () => {
                    this.props.markComplete(index);
                }
                return <ListItem deleteItem={handleDelete} key={index} index={index} item={arrayItem} markComplete={handleComplete} />
        });

        return (
            <ul>
                {items}
            </ul>
        )
    }
});

var ListItem = React.createClass({
    render: function() {
        return (
            <div>
                <li>{this.props.item.name}</li>
                <button onClick={this.props.markComplete}>Complete</button>
                <button onClick={this.props.deleteItem}>Delete</button>
            </div>
        )
    }
});

ReactDOM.render(<ToDoListContainer />, document.getElementById('content'));

// finish deleting items // DONE
// finish completing items // DONE
// clear list button // DONE
// node intro
// local storage setup
// save button
// automatic saving upon changes
// set up server in node
// styling
