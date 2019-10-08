import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer'; //import { MailComposer } from 'expo';


const textStyle = {
    margin: 10
};

class Contact extends Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                        featuredTitle="Contact"
                        title="Contact Info"
                        dividerStyle='1'
                    >
                        <Text style={textStyle}>Clear Water Bay, Kowloon</Text>
                        <Text style={textStyle}>121, Clear Water Bay Road </Text>
                        <Text style={textStyle}>HONG KONG</Text>
                        <Text style={textStyle}>Tel: +852 1234 5678</Text>
                        <Text style={textStyle}>Fax: +852 8765 4321</Text>
                        <Text style={textStyle}>Email:confusion@food.net</Text>

                        <Button
                            title="Send Email"
                            buttonStyle={{ backgroundColor: "#512DA8" }}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                            onPress={this.sendMail}
                        />
                    </Card >
                </ Animatable.View>
            </ScrollView >
        );
    }
};

Contact.navigationOptions = {
    title: 'Contact Us'
};

export default Contact;