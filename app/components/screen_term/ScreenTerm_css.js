import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#EEE',
        alignSelf: 'stretch',
    },
    section_term_picture: {
        flex: 5,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        backgroundColor: '#EEE',
    },
    section_term_name: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
        padding: 5,
        marginBottom: 20,
    },
    section_term_name_text: {
        color: '#2196F3',
        fontSize: 24,
        fontWeight: 'bold',
    },
    section_voc_items: {
        flex: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
    },
    term_image: {
        width: '100%',
        height: 185,
    },
    flat_list_view: {
        flex: 1,
        flexDirection: 'row',
    },
    flat_list_voc_items: {
    },
    flat_list_voc_item: {
        width: 400,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 14,
        paddingLeft: 16,
        margin: 0,
        marginBottom: 5,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    flat_list_voc_item_end: {
        width: 9,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 0,
        paddingRight: 0,
        margin: 0,
        marginBottom: 5,
    },
    flag_image: {
        marginLeft: -100,
        marginTop: 9,
        width: 60,
        height: 34,
    },
});

export default styles;
