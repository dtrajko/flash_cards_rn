import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
    },
    container_top: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#000',
        paddingBottom: 0,
        opacity: 0.5,
    },
    container_bottom: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
    },
    flash_cards_text: {
        color: '#FFF',
        fontSize: 60,
        fontWeight: 'bold',
        opacity: 2,
        padding: 0,
    },
    play_button: {
        width: 260,
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#888',
        paddingBottom: 15,
        opacity: 0.8
    },
    play_button_text: {
        padding: 10,
        color: '#333',
        fontSize: 32,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center',
    }
});

export default styles;
