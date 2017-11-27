import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#EEE',
        alignSelf: 'stretch',
    },
    languages_container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        alignSelf: 'stretch',
    },
    remaining_space: {
        flex: 4,
        alignSelf: 'stretch',
    },
    flag_image: {
        width: 60,
        height: 34,
    },
    language_row_view: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    section_language_image: {
        flex: 1,
    },
    section_language_text_view: {
        flex: 4,
        alignSelf: 'flex-start',
        marginLeft: 6,
        paddingTop: 3,
    },
    section_language_switch: {
        flex: 1,
    },
    section_language_text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default styles;
