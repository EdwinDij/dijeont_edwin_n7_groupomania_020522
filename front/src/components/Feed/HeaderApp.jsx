import  React from 'react'
import logo from '../../assets/icon-bg-remove.png'
import '../styles/HeaderApp.scss'

export default class HeaderApp extends React.Component {

render() {
    return(
        
            <div className="header">
            <img className="logo" src={logo} alt="logo groupomania" />
                <input type="text" className="search" id="search-users" placeholder='Rechercher'/>
        </div>
        
)
}
}