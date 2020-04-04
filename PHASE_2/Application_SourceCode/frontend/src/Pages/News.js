import React, {useRef, useLayoutEffect, useState} from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import '../App.css';
import 'react-vertical-timeline-component/style.min.css';
import data from '../Data/disease_list';
import parseISO from 'date-fns/parseISO';

class News extends React.Component {

    state = {
        disease: '',
        data: []
    }

    setData = (e) => {
        this.setState({disease: e.target.value})
    }

    componentDidMount() {
        let newdata = [];
        let promise = fetch("https://newsapi.org/v2/top-headlines?language=en&category=health&q=coronavirus&apiKey=0e4bd5b156304119bd7aab6c7ba5ef8c")
        promise.then((resp) => resp.json())
            .then((json) => {
                newdata.push(json);
            })
            .then((a) => this.setState({data: newdata}));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.disease != this.state.disease) {
            let newdata = [];
            let promise = fetch("https://newsapi.org/v2/everything?sortBy=relevancy&language=en&qInTitle=ebola&apiKey=0e4bd5b156304119bd7aab6c7ba5ef8c")
            promise.then((resp) => resp.json())
                .then((json) => {
                    newdata.push(json);
                })
                .then((a) => this.setState({data: newdata}));
        }
    }

    goToURL = (url) => {
        window.location.replace(url);
    }

    render() {
        let item = data.map(disease =>
                <option className="newsdiseases" key={disease.name}>
                {disease.name}
                </option>
            );
        return (
            <div>
            <select className="browser-default" defaultValue={'DEFAULT'} onChange={this.setData.bind(this)}>
            <option value="DEFAULT" disabled>Select A Disease</option>
            {item}
            </select>
            <VerticalTimeline>
            {this.state.data.map(function(info, index) {
                return info.articles.map((article) => {
                    let result = parseISO(article.publishedAt);
                    let date = String(result).slice(0,15);
                    return (<VerticalTimelineElement
                      className="newsblock"
                      contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                      date={date}
                      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                      iconOnClick={() => {return(this.goToUrl(article.url))}}
                      icon={<img src="https://image.flaticon.com/icons/svg/624/624824.svg" />} //touchapp from materialize article.urlToImage
                    >
                    <h3 className="vertical-timeline-element-title">{article.title}</h3>
                    <p>{article.description}</p>
                    </VerticalTimelineElement>)
                })
            })}
            </VerticalTimeline>
            </div>
        );
    }
}
// {<VerticalTimelineElement
//   className="vertical-timeline-element--work"
//   contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
//   contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
//   date="2011 - present"
//   iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
// >
//   <h3 className="vertical-timeline-element-title">Creative Director</h3>
//   <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
//   <p>
//     {this.state.data[0]}
//   </p>
// </VerticalTimelineElement>
// <VerticalTimelineElement
//   className="vertical-timeline-element--work"
//   date="2010 - 2011"
//   contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
//   contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
//   iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
// >
//   <h3 className="vertical-timeline-element-title">Art Director</h3>
//   <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
//   <p>
//     Creative Direction, User Experience, Visual Design, SEO, Online Marketing
//   </p>
// </VerticalTimelineElement>
// <VerticalTimelineElement
//   className="vertical-timeline-element--work"
//   date="2008 - 2010"
//   iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
// >
//   <h3 className="vertical-timeline-element-title">Web Designer</h3>
//   <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
//   <p>
//     User Experience, Visual Design
//   </p>
// </VerticalTimelineElement>
// <VerticalTimelineElement
//   className="vertical-timeline-element--work"
//   date="2006 - 2008"
//   iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
// >
//   <h3 className="vertical-timeline-element-title">Web Designer</h3>
//   <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
//   <p>
//     User Experience, Visual Design
//   </p>
// </VerticalTimelineElement>
// <VerticalTimelineElement
//   className="vertical-timeline-element--education"
//   date="April 2013"
//   iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
// >
//   <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
//   <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
//   <p>
//     Strategy, Social Media
//   </p>
// </VerticalTimelineElement>
// <VerticalTimelineElement
//   className="vertical-timeline-element--education"
//   date="November 2012"
//   iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
// >
//   <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
//   <h4 className="vertical-timeline-element-subtitle">Certification</h4>
//   <p>
//     Creative Direction, User Experience, Visual Design
//   </p>
// </VerticalTimelineElement>
// <VerticalTimelineElement
//   className="vertical-timeline-element--education"
//   date="2002 - 2006"
//   iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
// >
//   <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
//   <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
//   <p>
//     Creative Direction, Visual Design
//   </p>
// </VerticalTimelineElement>
// <VerticalTimelineElement
//   iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
// />}

export default News;
