import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { scaleLinear, scaleTime, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { min, max } from 'd3-array';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { Link } from 'react-router-dom';

import Subscribe from '../Subscribe/Subscribe';
import QueueList from '../Queue/QueueList';

import { triggerNotification, nearestClinicToClinic } from '../../../../Actions/AppAction';
import { userNotification } from '../../../../Actions/UserAction';
//import { clearNotif } from '../../../../Actions/AppAction';

// import { store } from '../../../../index.js';

// import API to store activeClinic into localStorage
//import { setActiveClinic } from '../../../../API/activeClinicAPI'


import './PolyClinicInfo.css';

const d3 = require("d3");

class PolyClinicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWhichComponent: "",
    }
  }

  onClick = (event) => {
    let user = this.props.user
    if(!user._id){
      this.props.triggerNotification();
      this.props.userNotification("Please Login to Subscribe");
    }

    if(!user.subscribe){
      this.setState({
        showWhichComponent: event.target.id
      })
    }else{
      if(user.subscribe.indexOf(this.props.activeClinic._id) > -1){
        console.log("You have already subscribed to this clinic");
        this.props.triggerNotification();
        this.props.userNotification("You have already subscribed to this clinic");
        return;
      }else{
        this.setState({
          showWhichComponent: event.target.id
        })
      }
    }
  }

  backToClinicInfo = () => {
    this.setState({
      showWhichComponent: ""
    })
  }

  showNearbyClinics = () => {
    this.props.nearestClinicToClinic();
  }

  // return formatted time data
  dateArrayParser = (queueArray, strip) => {
    const stripMilliSec = (s) => {
     return s.slice(0, -7);
    }
    const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
    return queueArray.map( (d) => {
      let newDate;
      strip ? newDate = parseTime(stripMilliSec(d.date)) : newDate = parseTime(d.date);
      return {
        date: newDate,
        queueQty: d.queueQty
      }});
    }

  // updateMousePos = () => {
  //       let [x, y] = d3.mouse(this.refs.svg);
  //       console.log(x,y);
  //       this.props.updateMousePos(x, y);
  //   }

  // CREATE chart
  doTimeSeries = (historicalQueue, currentQueue, nodeStage) => {
    const node = this.node;

    const data = [{
      id: 'historicalQueue',
      values: historicalQueue
    },
    {
      id: 'currentQueue',
      values: currentQueue
    }];

    const hQ = this.dateArrayParser(historicalQueue, false)
    const cQ = this.dateArrayParser(currentQueue, true);
    console.log(hQ)
    console.log(cQ)
    const margin = {top: 10, right: 10, bottom: 20, left: 10},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom -100;

    // Scales and axes. Note the inverted domain for the y-scale: bigger is up!
    const x = scaleTime().range([0, width]),
          y = scaleLinear().range([height, 0]),
          xAxis = axisBottom(x).tickFormat(timeFormat('%H')),
          yAxis = axisLeft(y);//.ticks(4).orient("left");

    // A line generator for historical and currentQueue
    const line = d3.line()
                  .x(function(d) { return x(d.date); })
                  .y(function(d) { return y(d.queueQty); })
                  .curve(d3.curveStepAfter)

    const valueline = d3.line()
                        .x(function(d) { return x(d.date); })
                        .y(function(d) { return y(d.queueQty); });

    // Compute the minimum and maximum date, and the maximum queue.
    x.domain([hQ[0].date, hQ[hQ.length - 1].date]);
    y.domain([0,max(data, function(c) { return max(c.values, function(d) { return parseFloat(d.queueQty); }); })+10]);
    //y.domain([0,220]);

    const colors  = scaleOrdinal(schemeCategory10)

    switch(nodeStage) {
      case "CREATE": // Bind data and draw line
        // Add an SVG element with the desired dimensions and margin.
        const qLine = select(node)
                      .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        // Add the x-axis.
        qLine.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Text label for the x axis.
        qLine.append("text")
             .attr("class", "x-axis-label")
             .attr("transform",
                   "translate(" + (width/2 - 100) + " ," +
                                  (height + margin.top + 50) + ")")
             .text("Hour of day");

        // Add the y-axis.
        qLine.append("g")
              .attr("class", "y axis")
              .attr("transform", "translate(" + width + ",0)")
              .call(yAxis)
              .text("No. of people waiting");
        //Draw lines
        qLine.selectAll('.line')
             .data([hQ,cQ])
             .enter()
               .append('path')
                 .attr('class', 'line')
                 .style('stroke', function(d) {
                   return colors(Math.random() * 50);
                 })
                 //.attr('clip-path', 'url(#clip)')
                 .attr('d', function(d) {
                   return line(d);
                 });

        // // Vertical line on hover
        // let lineSvg = qLine.append("g");
        // // Circle on hover
        // let focus = qLine.append("g")
        //                 .style("display", "none");
        //                 // Add the valueline path.
        // // Draw the vertical line
        // lineSvg.append("path")
        //                 .attr("class", "line")
        //                 .attr("d", valueline(data));
        //
        // // append the circle at the intersection
        // focus.append("circle")
        //       .attr("class", "y")
        //       .style("fill", "none")
        //       .style("stroke", "blue")
        //       .attr("r", 4);
        //
        // let bisectDate = d3.bisector(function(d) { return d.date; }).left;

        // const mousemove = () => {
        //   //let [x,y] = d3.mouse(this.refs.qLine)
        //   let test = this.updateMousePos();
        //   console.log("in mouse move ",test);
        //   // let x0 = x.invert(d3.mouse(node)[0]),
        //   //   i = bisectDate(data, x0, 1),
        //   //   d0 = data[i - 1],
        //   //   d1 = data[i],
        //   //   d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        //   //
        //   // focus.select("circle.y")
        //   //       .attr("transform",
        //   //       "translate(" + x(d.date) + "," +
        //   //                        y(d.queueQty) + ")");
        // }

        // // append the rectangle to capture mouse
        // qLine.append("rect")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .style("fill", "none")
        //     .style("pointer-events", "all")
        //     .on("mouseover", function() { focus.style("display", null); })
        //     .on("mouseout", function() { focus.style("display", "none"); })
        //     .on("mousemove", mousemove);

      break;
      case "UPDATE": // Bind new data and transition
        console.log("went into UPDATE!");
        const qLineUpdate = select(node);
        qLineUpdate.selectAll('.line')
             .data([hQ,cQ])
             .transition()
             .delay(100)
             .duration(1500)
               .attr('class', 'line')
               .attr('d', function(d) {
                 return line(d);
               });
        break;
        default:
        break;
    }

}
    // DESTROY chart
    deleteTimeSeries = () => {
      const node = this.node;
      const qLine = select(node);
      qLine.selectAll('.line')
            .exit()
            .remove()
    }

  classParser = (differenceQueue) => {
    return differenceQueue > 0 ? "positiveDifference" : "negativeDifference"
  }

  render() {
    const differenceQueue = parseFloat(this.props.activeClinic.properties.differenceQueue);
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentDayNum = currentDate.getDay();
    const dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const currentDay = dayArray[currentDayNum];
    //console.log("currentHours " + currentHours);
    return (
      <div className="poly-clinic-info container">

        <h3>{this.props.activeClinic.properties.name_full}</h3>
        {currentHours < 16 && currentDayNum < 6 && currentDayNum != 0 || currentHours < 12 && currentDayNum == 6 ?
        (<h5>is now <span className={this.classParser(differenceQueue)}>
        {differenceQueue > 0 ? (differenceQueue.toFixed(0) + "%more") :
        (Math.abs(differenceQueue.toFixed(0)) + "%less" )}</span> crowded than its average queue at this hour on {currentDay}</h5>) :
        (<h5>has closed registrations for {currentDay}</h5>)}

        <svg ref={node => this.node = node}
              viewBox="0 0 960 500">
        </svg>

        {
          this.state.showWhichComponent==="subscribeClinicButton" ?  (
            <Subscribe clinic={this.props.activeClinic} backToClinicInfo={this.backToClinicInfo}/>
          ) : (
            <div className="poly-clinic-info container">
              <QueueList queue= {this.props.activeClinic.queue}/>
              <div className="row-fluid row-clinicinfo-btn">
                <Link to={"/seeQueue/"+this.props.activeClinic.properties.name_full.replace(/[^a-zA-Z0-9&@()]/g, '-')}><button type="button" className="btn clinicinfo-btn">See more queues...</button></Link>

              </div>
              {this.props.user._id ?
                this.props.user.role == "clinicAdmin" && this.props.user.myClinic == this.props.activeClinic._id ? (
                <div className="row-fluid row-clinicinfo-btn">
                  <Link to={"/seeQueue/"+this.props.activeClinic.properties.name_full.replace(/[^a-zA-Z0-9&@()]/g, '-')}><button type="submit" className="btn clinic-back-btn">Clinic admin: submit a report</button></Link>
                </div>
              ) : (
                <div className="row-fluid row-clinicinfo-btn">
                  <button id="subscribeClinicButton" type="submit" className="btn clinicinfo-btn" onClick={this.onClick}>Subscribe to this Clinic</button>
                </div>
              ) : (
                <div className="row-fluid row-clinicinfo-btn">
                  <button id="subscribeClinicButton" type="submit" className="btn clinicinfo-btn" onClick={this.onClick}>Subscribe to this Clinic</button>
                </div>
              )}
              <div className="row-fluid row-clinicinfo-btn">
                <button id="showNearbyClinicsButton" type="submit" className="btn clinicinfo-btn" onClick={this.showNearbyClinics}>Show nearby clinics</button>
              </div>
            </div>
          )
        }

      </div>
    );
  }

  // {
  //   this.state.showWhichComponent==="subscribeClinicButton" && this.props.user._id ?  (
  //     <Subscribe backToClinicInfo={this.backToClinicInfo} />
  //   ) : (
  //     <div>
  //       <QueueList queue= {this.props.activeClinic.queue}/>
  //       <div className="row-fluid row-clinicinfo-btn">
  //         <Link to={"/seeQueue/"+this.props.activeClinic.properties.name_full.replace(/[^a-zA-Z0-9&@()]/g, '-')}><button id="subscribeClinicButton" type="submit" className="btn clinicinfo-btn">See more queues...</button></Link>
  //       </div>
  //       <div className="row-fluid row-clinicinfo-btn">
  //       <button id="subscribeClinicButton" type="submit" className="btn btn-info" onClick={this.onClick}>Subscribe to this Clinic</button>
  //       </div>
  //     </div>
  //   )
  // }
  componentWillReceiveProps() {
    this.deleteTimeSeries();
  }

  componentDidMount() {
    // let svg = d3.select(this.refs.svg);
    //
    //   svg.on('mousemove', () => {
    //       this.updateMousePos();
    //       console.log(this.props.updateMousePos);
    //   });

      this.doTimeSeries(this.props.activeClinic.properties.historicalQueue, this.props.activeClinic.properties.currentQueue, 'CREATE');

   }

   componentDidUpdate() {
      this.doTimeSeries(this.props.activeClinic.properties.historicalQueue, this.props.activeClinic.properties.currentQueue, 'UPDATE');
   }

   componentWillUnMount() {
     this.deleteTimeSeries();
   }
}

// PolyClinicInfo.propTypes = {
//     updateMousePos: PropTypes.func.isRequired
// };



const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    triggerNotification: () => {dispatch(triggerNotification())},
    userNotification: (message) => {dispatch(userNotification(message));},
    nearestClinicToClinic: () => {dispatch(nearestClinicToClinic());},
    //clearNotif: () => {dispatch(clearNotif());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolyClinicInfo);
