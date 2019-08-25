import React from 'react'

class MemeGenerator extends React.Component {
    constructor(){
        super()

        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://imgflip.com/s/meme/Roll-Safe-Think-About-It.jpg",
            allMemeImages: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleNextMeme = this.handleNextMeme.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleNextMeme(event){
        event.preventDefault()

        const randNumber = Math.floor(Math.random() * this.state.allMemeImages.length)
        const randMemeImage = this.state.allMemeImages[randNumber].url
        this.setState({randomImg: randMemeImage})
    }

    componentDidMount(){
        fetch("https://api.imgFlip.com/get_memes")
            .then(response => response.json())
            .then(response =>  {
                const {memes} = response.data
                this.setState({allMemeImages: memes})
            })
    }

    render(){
        return(
            <div>
                <form className="meme-form">
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleNextMeme}>Meme</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator