import React, { Component } from "react";
import "../styles/Home.css"
import Logo from "../assets/heading_logo.png";
import {ReactComponent as LogoIcon} from "../assets/analytics.svg";
import bar from "../assets/bar-chart.svg";
import treeIcon from "../assets/tree.svg";
import backtrackingIcon from "../assets/backtracking.svg";
class Home extends Component{
    constructor(){
        super();
        this.state={
            problems:[
                {
                    name:"Sorting",
                    imgUrl:bar,
                    link:"/sorting"
                },
                {
                    name:"Tree Traversal",
                    imgUrl:treeIcon,
                    link:"/tree"
                },
                {
                    name:"Backtracking",
                    imgUrl:backtrackingIcon,
                    link:"/backtracking"
                }
            ]
        }
    }
    componentDidMount(){
      window.particlesJS("particles-js",require("../assets/particles.json"));
    }
    render(){
        return(
            <div className="back">
                <div id="particles-js"></div>
              <div class="box title">
                    <div className="container-fluid solid">
                        {/* Removed social links */}
                    </div>
                </div>
                <h1 className="main-title center">
                            <div className="logo">
                            <LogoIcon/>
                            </div>
                             ALGO <strong style={{color:"var(--home-color)"}}><br></br>CRAFT</strong>
                </h1>
                <div>
                    <p className="description-title center">
                     Algo Craft is an interactive online platform that visualizes algorithms from code.

                    </p>
                </div>
                <ul class="list-inline mt-5" style={{display:"block",position:"relative"}}>
                    {this.state.problems.map(element=>
                        <li className="list-inline-item ml-5 mr-5 mb-2" style={{cursor:"pointer"}} onClick={()=>window.location.href=element.link}>
                        <div className="card" style={{width: "14rem"}}>
                            <img className="card-img-top img algo-image" src={element.imgUrl} alt="Card image cap"/>
                            <div style ={{backgroundColor:"transparent"}} className="card-body">
                                <h3 className="card-text algo-name">{element.name}</h3>
                            </div>
                        </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Home;