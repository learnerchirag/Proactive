import React,{Component} from 'react';

import './Header.css';




class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
          a : 2,
        };
       
    }

   
    render(){
        return (
            <div>
           
            <div className="header">
                <a href="http://www.proactiveforher.com/" className="logo" style={{textDecoration:"none",color: "white", fontFamily: "Abril Fatface"}}>Proactive</a>
                <div className="header-right">
                    <a href="http://www.proactiveforher.com/" style={{textDecoration:"none",color: "white"}}>Home</a>
                    <a href="http://www.proactiveforher.com/webinar/" style={{textDecoration:"none",color: "white"}}>Webinars</a>
                    <a href="http://www.proactiveforher.com/blog/" style={{textDecoration:"none",color: "white"}}>Blog</a>
                    <a href="http://www.proactiveforher.com/doctors/" style={{textDecoration:"none",color: "white"}}>Book</a>
                </div>
            </div>
            <br />
            <br />
                <div className="main-heading">
                    <h1 className="hh" style={{textAlign:"center",color:"#163948",paddingTop:"2%", paddingBottom:"1%"}}><strong>STI Risk Awareness Tool</strong></h1>
                    <p style={{paddingLeft:"5%",paddingRight:"5%",textAlign:"center",paddingBottom:"0%"}}>The usage of inside condoms, outside condoms and dental dams reduce the risk of contracting an STI but do not eliminate it.</p>
                    <p style={{paddingLeft:"24%",paddingRight:"24%",textAlign:"center",marginBottom:"-2%",paddingTop:"0%",paddingBottom:"5%"}}> This tool determines the risk of you contracting an STI based on your symptoms and lifestyle</p>
                </div>

            </div>
            

        )
    }


}



export default Header;