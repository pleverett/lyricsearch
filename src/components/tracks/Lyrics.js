import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Spinner from '../layout/Spinner'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(result => {
        // console.log(result.data)
        this.setState({ lyrics: result.data.message.body.lyrics })

        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        )
      })
      .then(result => {
        this.setState({ track: result.data.message.body.track })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { track, lyrics } = this.state

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <div className="card-header">
              {track.track_name} by{' '}
              <span className="text-secondary">{track.artist_name}</span>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Lyrics
