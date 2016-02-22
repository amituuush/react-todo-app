
var LifeCycleComponent = React.createClass({

    getInitialState: function() {
        var arrayOfEvents = ['Got initial state values'];
        return {events: arrayOfEvents,
                count: 0
        };
    },

    componentWillMount: function() {
        var listOfEvents = this.state.events;
        listOfEvents = listOfEvents.concat('Component mounting before render');
        this.setState({events: listOfEvents}); // does this lead to another state change lifecycle to occur? Do all setState methods that are called on this page cause their own individual state change lifecycle to to occur?
    },

    render: function() {
        var listOfEvents = this.state.events.map(function(listItem, index) {
            return <li key={index}>{listItem}</li>
        });
        return (
            <div>
                <ul>
                    {listOfEvents}
                </ul>
            </div>
        )
    },

    componentDidMount: function() { // why does this get displayed if it is inserted after render method?
        // use setState because it's after the render?
        var listOfEvents = this.state.events;
        listOfEvents = listOfEvents.concat('Component mounted');
        this.setState({events: listOfEvents});
    },

    shouldComponentUpdate: function(newProps, newState) {
        var listOfEvents = newState.events;
        listOfEvents = listOfEvents.concat('Checking whether component should update');
        this.setState
        return newState.count <= 5;
    },

    componentWillUpdate: function(newProps, newState) {
        var listOfEvents = newState.events;
        listOfEvents = listOfEvents.concat('preparing for upcoming update');
    },

    componentDidUpdate: function(newProps, newState) {
        var listOfEvents = newState.events;
        var countPlusOne = newState.count + 1; // why doesn't this.state.count++ work?

        listOfEvents = listOfEvents.concat('Component updated');
        this.setState({
            events: listOfEvents,
            count: countPlusOne
        });
    }


});



ReactDOM.render(
    <LifeCycleComponent />, document.getElementById('content'));
