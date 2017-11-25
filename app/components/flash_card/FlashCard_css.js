import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section_picture: {
        flex: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section_language: {
        flex: 2,
        backgroundColor: '#EEE',
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 6,
    },
    term_image: {
        width: '100%',
        height: 185,
    },
    flag_image: {
        width: 60,
        height: 34,
    },
    section_language_text_view: {
        marginLeft: 6,
        paddingTop: 3,
    },
    section_language_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section_buttons: {
        flex: 13,
        alignSelf: 'stretch',
        marginTop: 0,
    },
    play_button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 12,
        margin: 4,
        marginTop: 0,
    },
    play_button_text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;
