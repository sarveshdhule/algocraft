import React, { Component } from "react";
import "../styles/Home.css"
import Logo from "../assets/heading_logo.png";
import {ReactComponent as LogoIcon} from "../assets/analytics.svg";
import bar from "../assets/bar-chart.svg";
import treeIcon from "../assets/tree.svg";
import backtrackingIcon from "../assets/backtracking.svg";
import convexIcon from "../assets/convex.svg";
import graphIcon from "../assets/graph.svg";
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
                },
                {
                    name:"Convex Hull",
                    imgUrl:convexIcon,
                    link:"/convexhull"
                },
                {
                    name:"Path Finding",
                    imgUrl:graphIcon,
                    link:"/pathfinding"
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
                
                {/* Top row - 3 features */}
                <ul class="list-inline mt-5" style={{display:"block",position:"relative", marginBottom: "2rem"}}>
                    {this.state.problems.slice(0, 3).map((element, index) =>
                        <li key={index} className="list-inline-item ml-5 mr-5 mb-2" style={{cursor:"pointer"}} onClick={()=>window.location.href=element.link}>
                        <div className="card" style={{width: "14rem"}}>
                            <img className="card-img-top img algo-image" src={element.imgUrl} alt="Card image cap"/>
                            <div style ={{backgroundColor:"transparent"}} className="card-body">
                                <h3 className="card-text algo-name">{element.name}</h3>
                            </div>
                        </div>
                        </li>
                    )}
                </ul>
                
                {/* Side features - positioned absolutely */}
                <div style={{position: "relative", height: "200px"}}>
                    {/* Left side - Convex Hull */}
                    <div style={{
                        position: "absolute",
                        left: "10%",
                        top: "-437.5px",
                        transform: "translateY(-50%)",
                        cursor: "pointer"
                    }} onClick={()=>window.location.href=this.state.problems[3].link}>
                        <div className="card" style={{width: "14rem"}}>
                            <img className="card-img-top img algo-image" src={this.state.problems[3].imgUrl} alt="Card image cap"/>
                            <div style ={{backgroundColor:"transparent"}} className="card-body">
                                <h3 className="card-text algo-name">{this.state.problems[3].name}</h3>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side - Path Finding */}
                    <div style={{
                        position: "absolute",
                        right: "10%",
                        top: "-437.5px",
                        transform: "translateY(-50%)",
                        cursor: "pointer"
                    }} onClick={()=>window.location.href=this.state.problems[4].link}>
                        <div className="card" style={{width: "14rem"}}>
                            <img className="card-img-top img algo-image" src={this.state.problems[4].imgUrl} alt="Card image cap"/>
                            <div style ={{backgroundColor:"transparent"}} className="card-body">
                                <h3 className="card-text algo-name">{this.state.problems[4].name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;