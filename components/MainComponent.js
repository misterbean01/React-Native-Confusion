import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import { View } from 'react-native'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishID) {
        this.setState({ selectedDish: dishID });
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Menu dishes={this.state.dishes}
                    onPress={(dishID) => this.onDishSelect(dishID)}
                />
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            </View>
        );
    }
}

export default Main;