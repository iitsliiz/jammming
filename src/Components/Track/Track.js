/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React from 'react';
import './Track.css';



class Track extends React.Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
        
    }
    addTrack(){
        this.props.onAdd(this.props.track) ;
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    
   
    renderAction(){
        return (
            <div>
                this.props.isRemoval ?
                  <button 
                    className="Track-Action" 
                    onClick={this.removeTrack} > - </button>
                : <button 
                    className="Track-Action" 
                    onClick={this.addTrack}> + </button>
            </div>
        );
    }
        
    render(){     
        return(
            <div>
                <div className="Track">
                <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                    {this.renderAction()}
                </div>
            </div>
        );
    }
}

export default Track;