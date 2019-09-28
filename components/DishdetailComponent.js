import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                {/* <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text> */}
                <Rating
                    imageSize={10}
                    readonly
                    startingValue={parseInt(item.rating)}
                    style={{ alignItems: 'flex-start' }}
                />
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Card title='Comments' >
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish(props) {

    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}>
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={styles.cardRow}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        style={styles.cardItem}
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.onShowModal()}
                    />
                </View>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            author: '',
            comment: '',
            rating: 5,
            showModal: false
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComment(dishId) {
        // console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 5,
            showModal: false,
        });
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId', '')

        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onShowModal={() => this.toggleModal()}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating showRating startingValue={parseInt(this.state.rating)}
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                        />

                        <View style={{ margin: 10 }}>
                            <Input
                                placeholder=' Author'
                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                onChangeText={(author) => this.setState({ author: author })}
                            />

                            <Input
                                placeholder=' Comment'
                                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                onChangeText={(comment) => this.setState({ comment: comment })}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => { this.handleComment(dishId); this.resetForm() }}
                                color="#512DA8"
                                title="Submit"
                                style={styles.button}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => { this.toggleModal() }}
                                color="gray"
                                title="Cancel"

                            />
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    button: {
        margin: 10
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);