import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Card} from 'react-native-paper'

const TeacherCard = ({title}) => {
    return (
        <Card>
            <Card.Cover source={{uri:"https://source.unsplash.com/1024x768/?nature}}"}}/>
            <Card.Content>
                <Text>{title}</Text>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({

})

export default TeacherCard