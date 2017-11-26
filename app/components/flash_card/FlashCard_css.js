import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section_score: {
        flex: 2,
        backgroundColor: '#EEE',
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingTop: 10,
    },
    section_score_text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section_picture: {
        flex: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
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
    option_button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 12,
        margin: 4,
        marginTop: 0,
    },
    option_button_text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modal_popup: {
        flex: 1,
        padding: 10,
        paddingBottom: 90,
        backgroundColor: '#FFF',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        alignItems: 'center',
        opacity: 1,
    },
    modal_popup_correct: {
        // backgroundColor: '#e6ffe6',
    },
    modal_popup_incorrect: {
        // backgroundColor: '#ffe6e6',
    },
    modal_popup_text: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    modal_popup_text_correct: {
        color: '#339966',
    },
    modal_popup_text_incorrect: {
        color: '#cc0000',
    },
    modal_popup_button: {
        width: 280,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#007acc',
        marginTop: 50,
        paddingTop: 30,
        paddingBottom: 35,
        opacity: 1
    },
    modal_popup_button_text: {
        padding: 10,
        color: '#FFF',
        fontSize: 48,
        fontWeight: 'bold',
    },
});

export default styles;
