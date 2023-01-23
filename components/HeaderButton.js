import React from 'react';
import {Ionicons} from '@expo/vector-icons';


const HeaderButton = props => {
    const renderLeft = () => {
        return (
            <Ionicons name="md-menu" size={32} onPress={props.onPressLeft} style={{marginLeft: 10}}/>
        )
    }
    const renderRight = () => {
        return (
            <Ionicons name="md-settings" size={32} onPress={props.onPressRight} style={{marginRight: 10}}/>
        )
    }
    return props.left ? renderLeft() : renderRight();
    
    
}
export default HeaderButton;