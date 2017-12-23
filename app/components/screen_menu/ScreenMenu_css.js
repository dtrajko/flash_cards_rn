import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
        alignSelf: 'stretch',
    },
    container_top: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#000',
        paddingBottom: 10,
        opacity: 0.5,
    },
    container_bottom: {
        flex: 5,
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
        fontStyle: 'italic',
    },
    play_button: {
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#FFF',
        paddingBottom: 15,
        opacity: 1,
    },
    languages_button: {
        marginTop: 16,
    },
    search_button: {
        marginTop: 16,
    },
    about_button: {
        marginTop: 16,
    },
    play_button_text: {
        padding: 5,
        color: '#FFF',
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
