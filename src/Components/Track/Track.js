/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React from 'react';
import './Track.css';



class Track extends React.Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        
    }
    addTrack(){
        this.props.onAdd(this.props.playlist) ;
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    
   
    renderAction(){
        if(isRemoval === true){
        <button 
            className="Track-Action" 
            onClick={this.removeTrack} > - </button>
        }else if(isRemoval === false) {
        <button 
            className="Track-Action" 
            onClick={this.addTrack}> + </button>
        }
        }
    render(){     
        return(
            <div>
                <div className="Track">
                <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action">{this.renderAction()}</button>
                </div>
            </div>
        );
    }
}

export default Track;