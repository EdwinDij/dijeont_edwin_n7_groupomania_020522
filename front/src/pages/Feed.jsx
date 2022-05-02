import React from "react"
import './Feed.scss'
import HeaderApp from "../components/Feed/HeaderApp"
import BodyApp from "../components/Feed/BodyApp"
import '../components/styles/HeaderApp.scss'

function Feed () {
    return (
        <div className="container-app">
            <HeaderApp />
            <BodyApp />
        </div>
    )

}

export default Feed
