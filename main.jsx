const React = require('react');
const ReactDOM = require('react-dom');
const aStyle= require('./main.less');
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';


var Inbox = React.createClass({
  render: function () {
    return (
      <div>
        <p>Inbox</p>
      </div>
    );
  }
});

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount(){
    this.timeID = setInterval(
        ()=>this.tick(),
        1000
    );
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({date:new Date()});
  }

  render() {
    return (
      <div>
         <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
};


function fetchPosts(url){
  /*  var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
           if (xhr.readyState != 4) return;
           if (xhr.status != 200 && xhr.status != 304) {
               alert('HTTP error ' + xhr.status);
               return;
           }
           console.log(JSON.parse(xhr.responseText));
       }
        xhr.open('GET', "http://localhost:3400/", true);
        xhr.send(null);*/

    var req = new Request(url, {method: 'GET', cache: 'reload'});
    return fetch(req).then(function(response) {
      return response.json();
    }).catch(function(e) {
      console.log("Oops, error");
    });
}


 var Posts = React.createClass({
        getInitialState: function() {
          return {
             posts:[]
          };
        },

        componentDidMount: function() {
            var result ,self=this;
            var url = this.props.source;
            fetchPosts(url).then(function(data) {
              result = data;
              if(result.status){
                if (self.isMounted()) {
                    console.log(result.docs);
                    self.setState({posts:result.docs});
                }
              }
            });
        },

        componentWillUnmount: function() {
          /*this.serverRequest.abort();*/
        },

        render: function() {
          return (<ul>
                {this.state.posts.map(postOne =>
                  <li><h3><a href={'/detail/'+postOne._id}>{postOne.title}</a></h3>
                    <span>{postOne.author}</span>
                    <p>{postOne.des}</p>
                  </li>
              ) }
        </ul>);
        }
      });


class Welcome extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        isToggleOn: true,
        posts:[],
        name:"王海松"
    };
    this.handleClick = this.handleClick.bind(this);
  }
    turnOnOff(){
        this.setState({isToggleOn: !this.state.isToggleOn});
    }
    getName(name) {
        console.log(name);
        console.log(this.state)
    }
    handleClick(name) {
        this.getName(name);
    }
    componentDidMount() {

    }
  render() {
    return (
        <section>
        <Clock/>
        <h1 onClick={this.handleClick.bind(this,this.props.name)}>Hello, {this.state.name}</h1>
        <a className="btn" onClick={this.turnOnOff.bind(this)}>开关{this.state.isToggleOn ? 'ON' : 'OFF'}</a>
        <a className="btn" href="/inbox">inbox</a>
        <Posts source="http://localhost:3400/" />
        </section>
    );
  }
};



/*const element = (
    <section>
      <Welcome name="Sara" />
    </section>
);
*/

var Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
});

var Calendar = React.createClass({
  render: function () {
    return (
      <div>
        <p>Calendar</p>
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Welcome}>
      <IndexRoute component={Welcome}/>
      <Route path="app" component={Dashboard}/>
      <Route path="inbox" component={Inbox}/>
      <Route path="calendar" component={Calendar}/>
      <Route path="*" component={Dashboard}/>
    </Route>
  </Router>
),  document.getElementById('wrapper'));