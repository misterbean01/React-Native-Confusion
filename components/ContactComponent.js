import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

const textStyle = {
    margin: 10
};

const Contact = () => {
    return (
        <ScrollView>
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
            </Card >
        </ScrollView>
    );
};

Contact.navigationOptions = {
    title: 'Contact Us'
};

export default Contact;