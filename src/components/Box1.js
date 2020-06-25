import React,{Component} from 'react';
import './Box1.css';
import { FcHighPriority } from 'react-icons/fc';
import { FcOk } from 'react-icons/fc';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    UncontrolledTooltip,
  } from "reactstrap";
import Select from "react-select";

class Box1 extends  Component{
    constructor(){
        super()
        this.state={
            selected1 :"",
            selected2 :"",
            selected3 :"",
            selected4 :"",
            selected5 :"",
            selected6 :"",
            click1 :false,
            click2 :false,
            click3 :false,
            click4 :false,
            click5 :false,
            click6:false,
            click7:false,
            fiveclicked:false,
            confirmbutton : false,
            
            arr : [0,0,0,0,0,0,0,0,0,0,0,0],
            // 0-chlamydia 1- gonorrhea 2-syphilis 3-HPV 4-HIV 5-Candida 6-Trichomoniasis 7-GenitalHerpes 8-Hepatitis B 9-Hepatitis C 10-Scabies 11-Chancroid/soft core
        
        
            
            button: null,
            activeCauses: [],
            selectedOption: null,
            selectedOption2: null,
            selectedOption3: null,
            activeFilters: [],
            symptoms: 1,
            aBooked: false,
            selectedOption1: null,
        
            temp:"",
        
        };
            this.handleOptionChange1 = this.handleOptionChange1.bind(this)
            this.handleOptionChange2 = this.handleOptionChange2.bind(this)
            this.handleOptionChange3 = this.handleOptionChange3.bind(this)
            this.handleOptionChange4 = this.handleOptionChange4.bind(this)
            this.handleOptionChange5 = this.handleOptionChange5.bind(this)
            this.handleOptionChange6 = this.handleOptionChange6.bind(this)
            this.handlepart = this.handlepart.bind(this)
            this.handleImageSelect = this.handleImageSelect.bind(this)
            this.handleMultiSelect = this.handleMultiSelect.bind(this)
            this.handle1 = this.handle1.bind(this)
            this.handleCauses = this.handleCauses.bind(this)
            this.handleClick1 = this.handleClick1.bind(this)
            this.handleClick2 = this.handleClick2.bind(this)
            this.handleClick3 = this.handleClick3.bind(this)
            this.handleClick4 = this.handleClick4.bind(this)
            this.handleClick5 = this.handleClick5.bind(this)
            this.handleClick6 = this.handleClick6.bind(this)
            this.handleClick7 = this.handleClick7.bind(this)
    }

    handleOptionChange1(e) {
        this.setState({selected1:e.target.value})
    }
    handleOptionChange2(e) {
        this.setState({selected2:e.target.value})
    }
    handleOptionChange3(e) {
        this.setState({selected3:e.target.value})
    }
    handleOptionChange4(e) {
        this.setState({selected4:e.target.value})
    }
    handleOptionChange5(e) {
        this.setState({selected5:e.target.value})
    }
    handleOptionChange6(e) {
        this.setState({selected6:e.target.value})
    }
    handleClick1(e){
      if(this.state.click1===true){
        this.setState({click1:false})
      }else{
        this.setState({click1:true})
      }
      
    }
    handleClick2(e){
      if(this.state.click2===true){
        this.setState({click2:false})
      }else{
        this.setState({click2:true})
      }
    }
    handleClick3(e){
      if(this.state.click3===true){
        this.setState({click3:false})
      }else{
        this.setState({click3:true})
      }
    }
    handleClick4(e){
      if(this.state.click4===true){
        this.setState({click4:false})
      }else{
        this.setState({click4:true})
      }
    }
    handleClick5(e){
      this.setState({fiveclicked:true})
      if(this.state.click5===true){
        this.setState({click5:false})
      }else{
        this.setState({click5:true})
      }
    }
    handleClick6(e){
      this.setState({fiveclicked:true})
      if(this.state.click6===true){
        this.setState({click6:false})
      }else{
        this.setState({click6:true})
      }
    }
    handleClick7(e){
      this.setState({fiveclicked:true})
      if(this.state.click7===true){
        this.setState({click7:false})
      }else{
        this.setState({click7:true})
      }
    }
    handlepart(e) {
        this.setState({confirmbutton:true})
        let new_arr = this.state.arr.slice();

        if(this.state.selected1==="yes" || this.state.selected2==="yes" || this.state.click1===true || this.state.click2===true || this.state.click3===true || this.state.selected4==="yes" || ((this.state.click7===false) || (this.state.click5===true && this.state.click6===false) || (this.state.click6===true && this.state.click5===false))|| this.state.selected6==="no"){
            new_arr[0] = 1;
            new_arr[1] = 1;
            new_arr[3] = 1;
            new_arr[4] = 1;
            new_arr[8] = 1;

        }
        this.setState({arr:new_arr})
    }


    handleImageSelect = async (option) => {
        {console.log(option)}
        var selectedOption1 = [];
        if (this.state.selectedOption1 !== null) {
          var selectedOption1 = this.state.selectedOption1;
          if (
            selectedOption1.every((element) => {
              if (element.value !== option[0].value) {
                return true;
              } else return false;
            })
          ) {
            selectedOption1.push(option[0]);
          }
        } else selectedOption1.push(option[0]);
        await this.setState({
          selectedOption1,
        });
        var activeFilters = [];
        if (this.state.selectedOption1 !== null) {
          this.state.selectedOption1.forEach((element) => {
            activeFilters.push(element.value);
          });
        }
        this.setState({
          activeFilters,
          activeCauses: [],
        });
      };

      handleMultiSelect = async (selectedOption1) => {
        // var totalOptions = selectedOption1.concat(this.state.selectedOption1);
        await this.setState({
          selectedOption1,
        });
        var activeFilters = [];
        if (this.state.selectedOption1 !== null) {
          this.state.selectedOption1.forEach((element) => {
            activeFilters.push(element.value);
          

          });
        }
        
        this.setState({
          activeFilters,
          activeCauses: [],
        });
        
      };
      handle1(e){
            this.setState({temp:e.target.value})

      }
      handleCauses = (array, cause) => {
        // console.log(this.state.activeCauses);
        if (this.state.activeFilters.length !== 0) {
          let activeCauses = this.state.activeCauses;
    
          if (JSON.stringify(array) === JSON.stringify(["p"])) {
            if (this.state.activeFilters.includes("p")) {
              activeCauses.push(cause);
              return true;
            } else {
              return false;
            }
          } else {
            if (this.state.activeFilters.every((val) => array.includes(val))) {
              // var activeCauses = this.state.activeCauses;
              activeCauses.push(cause);
              return true;
            } else {
              return false;
            }
          }
        } else return false;
      };


    render(){

   
          const symptomsOptions = [
            { value: "a", label: "Fever" },
            { value: "b", label: "Fatigue" },
            { value: "c", label: "Nausea" },
            { value: "d", label: "Weightloss" },
            { value: "e", label: "Loss of apetite" },
            { value: "f", label: "Abdominal Pain" },
            { value: "g", label: "Unusual Vaginal Discharge" },
            { value: "h", label: "Vaginal Itching" },
            { value: "i", label: "Pain/Burning while urination" },
            { value: "j", label: "Colored Urine" },
            { value: "k", label: "Cloudy Urine" },
            { value: "l", label: "Heavy Bleeding during periods" },
            { value: "m", label: "Bleeding between periods" },
            { value: "n", label: "Pain during sexual intercourse" },
            { value: "o", label: "Bleeding after sexual intercourse" },
            { value: "p", label: "Sores in the genital area" },
            { value: "q", label: "Rashes in the genital area" },
            { value: "r", label: "Itching/Burning in the genital area" },
            { value: "s", label: "Lumps in the groin" },
            { value: "t", label: "Shooting pain in the legs" },
            { value: "u", label: "Joint Pain" },
          ];
        return(



            <div>

                <div className="container">

                    <div className="row">

                        <div className="col-md-6">
                            <div style={{ lineHeight: 0 }}>
                                <img id="B1" src = {require('./images/bodyModel/B1.png')} />
                                <UncontrolledTooltip placement="right" target="B1" autohide={false}>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "a" ,label: "Fever"}, ])} >Fever</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "b" ,label: "Fatigue"}, ])} >Fatigue</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "c" ,label: "Nausea"}, ])} >Nausea</Card>
                                </UncontrolledTooltip>
                            </div>
                            <div style={{ lineHeight: 0 }}>
                                <img src = {require('./images/bodyModel/B2.png')} />
                            </div>
                            <div style={{ lineHeight: 0, display: "flex" }}>
                                <img src = {require('./images/bodyModel/B3a.png')} />                           
                                <img src = {require('./images/bodyModel/B3b.png')} />
                                <img src = {require('./images/bodyModel/B3c.png')} />
                            </div>
                            <div style={{ lineHeight: 0, display: "flex" }}>
                                <img src = {require('./images/bodyModel/B4a.png')} />
                                <div style={{ display: "grid" }}>
                                    <img src = {require('./images/bodyModel/B4b1.png')} />
                                    <img style={{backgroundColor:"yellow"}} src = {require('./images/bodyModel/B4b2.png')} />
                                </div>                                     
                                <img src = {require('./images/bodyModel/B4c.png')} /> 
                            </div>
                            <div style={{ lineHeight: 0, display: "flex" }}>
                                <UncontrolledTooltip placement="right" target="B5" autohide={false}>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "d" ,label: "Weightloss"}, ])} value="weiht" onChange={this.handle1} >Weightloss</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "e" ,label: "Loss of Appetite"}, ])} >Loss of Appetite</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "f" ,label: "Abdominal Pain"}, ])} >Abdominal Pain</Card>
                                </UncontrolledTooltip>
                                <img src = {require('./images/bodyModel/B5a.png')} />
                                <div style={{ display: "grid" }}>
                                    <img src = {require('./images/bodyModel/B5b1.png')} />
                                    <img id="B5" src = {require('./images/bodyModel/B5b2.png')} />
                                </div>
                                <img src = {require('./images/bodyModel/B5c.png')} /> 
                            </div>
                            <div style={{ lineHeight: 0, display: "flex" }}>
                                <UncontrolledTooltip placement="right" target="B6" autohide={false}>
                                    <Card style ={{color:"#163948"}} ><strong>Vaginal Symptoms</strong></Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "g" ,label: "Unusual Vaginal Discharge"}, ])} >Unusual Vaginal Discharge</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "h" ,label: "Vaginal Itching"}, ])} >Vaginal Itching</Card>
                                    <Card style ={{color:"#163948"}} ><strong>Urinary Symptoms</strong></Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "i" ,label: "Pain/Burning while urinating"}, ])} >Pain/Burning while urinating</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "j" ,label: "Colored Urine"}, ])} >Colored Urine</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "k" ,label: "Cloudy Urine"}, ])} >Cloudy Urine</Card>
                                    <Card style ={{color:"#163948"}} ><strong>Menstrual Symptoms</strong></Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "l" ,label: "Heavy Bleeding during periods"}, ])} >Heavy Bleeding during periods</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "m" ,label: "Bleeding between periods"}, ])} >Bleeding between periods</Card>
                                    <Card style ={{color:"#163948"}} ><strong>Sexual Symptoms</strong></Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "n" ,label: "Pain during sexual intercourse"}, ])} >Pain during sexual intercourse</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "o" ,label: "Bleeding after sexual intercourse"}, ])} >Bleeding after sexual intercourse</Card>
                                    <Card style ={{color:"#163948"}} ><strong>Skin Symptoms</strong></Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "p" ,label: "Sores in the genital area"}, ])} >Sores in the genital area</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "q" ,label: "Rashes in the genital area"}, ])} >Rashes in the genital area</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "r" ,label: "Itching/Burning in the genitals"}, ])} >Itching/Burning in the genitals</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "s" ,label: "Lumps in the groin"}, ])} >Lumps in the groin</Card>
                               
                                </UncontrolledTooltip>
                                <img src = {require('./images/bodyModel/B6a.png')} />
                                <img id="B6" src = {require('./images/bodyModel/B6b.png')} />
                                <img src = {require('./images/bodyModel/B6c.png')} />
                            </div>
                            <div style={{ lineHeight: 0 , display: "flex"}}>
                                <UncontrolledTooltip placement="right" target="B7" autohide={false}>
                                
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "t" ,label: "Shooting Pain in the legs"}, ])} >Shooting Pain in the legs</Card>
                                    <Card style ={{color:"#163948"}} onClick={ () => this.handleImageSelect([ { value : "u" ,label: "Joint Pain"}, ])} >Joint Pain</Card>
                                </UncontrolledTooltip>        
                                <img id="B7" src={require("./images/bodyModel/B7.png")}></img>
                            </div>

                        </div>
                        <div className="col-md-6" style={{marginLeft:"2%",width:"30%"}}>
                                    <Select
                                        options={symptomsOptions}
                                        isMulti
                                        value={this.state.selectedOption1}
                                        onChange={this.handleMultiSelect}
                                        
                                    ></Select>
                                    
                        </div>




                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["a", "b", "c", "d", "e", "f"],
                              1
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          PCOS
                          
                         
                        </Card>
                       
                    </div>

                </div>
                                                                

                












   <br />
   <br />
   <br />
   <br />



            



                <div>
                    
                          
                            <p>Do you have multiple sex partners?</p>
                       
                          
                          <p>
                              <form style={{textAlign:"center"}}>
                                  <div className="radio" style={{display:"inline"}}>
                                      <label>
                                          <input type="radio" value="yes" 
                                                      checked={this.state.selected1 === "yes"} 
                                                      onChange={this.handleOptionChange1} />
                                          Yes
                                      </label>
                                  </div>
                                  <div className="radio" style={{display:"inline"}}>
                                      <label>
                                          <input type="radio" value="no" 
                                          checked={this.state.selected1 === "no"} 
                                          onChange={this.handleOptionChange1} />
                                          No
                                      </label>
                                  </div>
                                      
                              </form>
                              </p>
                         
                      <p>{this.state.selected1==="yes"?<FcHighPriority />:null}</p>
                      
                      
                   
                    
                    <p>Does your partner have multiple sex partners?</p>
                    <form style={{textAlign:"center"}}>
                        <div className="radio" style={{display:"inline"}}>
                            <label>
                                <input type="radio" value="yes" 
                                            checked={this.state.selected2 === "yes"} 
                                            onChange={this.handleOptionChange2} />
                                Yes
                            </label>
                        </div>
                        <div className="radio" style={{display:"inline"}}>
                            <label>
                                <input type="radio" value="no" 
                                checked={this.state.selected2 === "no"} 
                                onChange={this.handleOptionChange2} />
                                No
                            </label>
                        </div>
                            
                    </form>
                    <p><p>{this.state.selected2==="yes"?<FcHighPriority />:null}</p></p>

                    <p>Were you involved in any of these unprotected sexual acts?</p>
 
                    
                    <input type="checkbox"  onClick={this.handleClick1}></input>
                    <label><p>Anal Sex</p></label><br />
                    <input type="checkbox"  onClick={this.handleClick2}></input>
                    <label><p>Vaginal Sex</p></label><br />
                    <input type="checkbox"  onClick={this.handleClick3}></input>
                    <label><p>Oral Sex</p></label><br />
                    <input type="checkbox"  onClick={this.handleClick4}></input>
                    <label><p>None</p></label><br />

                    <p>{this.state.click1 || this.state.click2 || this.state.click3?<FcHighPriority />:null} </p>

                    
                        



                    <p>Did you undergo blood transfusion?</p>
                    <form style={{textAlign:"center"}}>
                        <div className="radio" style={{display:"inline"}}>
                            <label>
                                <input type="radio" value="yes" 
                                            checked={this.state.selected4 === "yes"} 
                                            onChange={this.handleOptionChange4} />
                                Yes
                            </label>
                        </div>
                        <div className="radio" style={{display:"inline"}}>
                            <label>
                                <input type="radio" value="no" 
                                checked={this.state.selected4 === "no"} 
                                onChange={this.handleOptionChange4} />
                                No
                            </label>
                        </div>
                            
                    </form>
                    <p>{this.state.selected4==="yes"?<FcHighPriority />:null}</p>


                    <p>Which of the following vaccinations have you received ?</p>
                    <input type="checkbox"  onClick={this.handleClick5}></input>
                    <label><p>Hepatitis B</p></label><br />
                    <input type="checkbox"  onClick={this.handleClick6}></input>
                    <label><p>HPV</p></label><br />
                    <input type="checkbox"  onClick={this.handleClick7}></input>
                    <label><p>None</p></label><br />
                    <p>{(this.state.click5 === true && this.state.click6===true) ?<p></p>: this.state.fiveclicked? <FcHighPriority />:null} </p>
                    

                    <p>Did you ever get tested for HIV?</p>
                    <form style={{textAlign:"center"}}>
                        <div className="radio" style={{display:"inline"}}>
                            <label>
                                <input type="radio" value="yes" 
                                            checked={this.state.selected6 === "yes"} 
                                            onChange={this.handleOptionChange6} />
                                Yes
                            </label>
                        </div>
                        <div className="radio" style={{display:"inline"}}>
                            <label>
                                <input type="radio" value="no" 
                                checked={this.state.selected6 === "no"} 
                                onChange={this.handleOptionChange6} />
                                No
                            </label>
                        </div>
                            
                    </form>
                    <p>{this.state.selected6==="no"?<FcHighPriority />:null}</p>

                    <br />
                    <br />
                    <a className="myButton" onClick={this.handlepart}>Confirm</a>
                </div>
                <div>
                <h3>Result</h3>
                {this.state.arr[0] ===1 ?<div><a href="#" class="myButton2">Chlamydia</a></div> :null}
                {this.state.arr[1] ===1 ?<div><a href="#" class="myButton2">Gonorrhea</a></div> :null}
                {this.state.arr[2] ===1 ?<div><a href="#" class="myButton2">Syphilis</a></div> :null}
                {this.state.arr[3] ===1 ?<div><a href="#" class="myButton2">HPV</a></div> :null}
                {this.state.arr[4] ===1 ?<div><a href="#" class="myButton2">HIV</a></div> :null}
                {this.state.arr[5] ===1 ?<div><a href="#" class="myButton2">Candida</a></div> :null}
                {this.state.arr[6] ===1 ?<div><a href="#" class="myButton2">Trichomoniasis</a></div> :null}
                {this.state.arr[7] ===1 ?<div><a href="#" class="myButton2">Genital Herpes</a></div> :null}
                {this.state.arr[8] ===1 ?<div><a href="#" class="myButton2">Hepatitis B</a></div> :null}
                {this.state.arr[9] ===1 ?<div><a href="#" class="myButton2">Hepatitis C</a></div> :null}
                {this.state.arr[10] ===1 ?<div><a href="#" class="myButton2">Scabies</a></div> :null}
                {this.state.arr[11] ===1 ?<div><a href="#" class="myButton2">Chancroid/Soft core</a></div> :null}
                </div>


            </div>
        )
    }
}

export default Box1;


/*


 
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.k}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.l}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.m}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.n1}</small>
                            </div>
                          )}
                          
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.o}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.p}</small>
                            </div>
                          )}


                          */