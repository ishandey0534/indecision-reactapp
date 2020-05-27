import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleDeleteSelectedOption = this.handleDeleteSelectedOption.bind(this);
        this.state = {
            options: [],
            selectedOption: undefined
        };
    }
    componentDidMount() {
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(() => ({ options }));
            }
        }catch(e){

        }
    }
    componentDidUpdate(prevProps,prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    handleDeleteOptions() {
        this.setState(() => ({ options: []}));
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove!==option;
            })
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);    
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
    }
    handleAddOption(option) {
        if(!option){
            return 'Please enter valid option...';
        }else if(this.state.options.indexOf(option)>-1){
            return 'This option already exists...';
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }
    handleDeleteSelectedOption() {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }
    render() {
        const subtitle = 'Put your life in my hands...';
    
        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action hasOptions={this.state.options.length>0} handlePick={this.handlePick} />
                    <div className="widget">
                        <Options 
                            options={this.state.options} 
                            handleDeleteOptions={this.handleDeleteOptions} 
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption} 
                    handleDeleteSelectedOption={this.handleDeleteSelectedOption}
                />
            </div>
        );
    }
}