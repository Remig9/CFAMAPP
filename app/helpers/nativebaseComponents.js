import React from 'react'
import { Button, Text, Icon } from 'native-base'

export const CustomButton = (props) => {
    return (
       <Button style={[{borderRadius:5, fontWeight:"bold"}, props.style ]}  onPress={props.onPress}>
            {props.children}
       </Button>
    )
}



