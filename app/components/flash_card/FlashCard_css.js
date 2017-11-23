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
        alignItems: 'center',
    },
    section_language: {
        flex: 2,
        backgroundColor: '#EEE',
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 6,
    },
    flag_image: {
        width: 90,
        height: 50,
    },
    section_language_text_view: {
        marginLeft: 10,
        paddingTop: 10,
    },
    section_language_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section_buttons: {
        flex: 12,
        alignSelf: 'stretch',
        marginTop: 10,
    },
    play_button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 16,
        margin: 4,
        marginTop: 0,
    },
    play_button_text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default styles;
