// Code goes here


var Iframe = React.createClass({     
    render: function() {
      return(         
        <div>          
          <iframe src={this.props.src} height={this.props.height} width={this.props.width}/>         
        </div>
      )
    }
  });
  
  ReactDOM.render(
    <Iframe src="http://plnkr.co/" height="500" width="500"/>,
    document.getElementById('example')
  );