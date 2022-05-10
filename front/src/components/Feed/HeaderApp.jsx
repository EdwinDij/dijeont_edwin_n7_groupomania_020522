import  React from 'react'
import logo from '../../assets/icon-bg-remove.png'
import '../styles/HeaderApp.scss'

export default class HeaderApp extends React.Component {

render() {
    return(
        
        <div className="header">
            <img className="logo" src={logo} alt="logo groupomania" />
            <div className="profil">
            <span className='firstname'>ed</span>
            <span className='lastname'>dijezaeazeae</span>
            <img className='img-progil' alt="img de profil" />  
            </div>
        </div>
        
)
}
}