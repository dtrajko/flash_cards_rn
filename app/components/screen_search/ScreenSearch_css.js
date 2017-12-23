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
    search_field_container: {
        height: 80,
        alignSelf: 'stretch',
        padding: 20,
        marginTop: 0,
        backgroundColor: '#2196F3',
    },
    search_text_input: {
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#EEE',
        borderWidth: 1,
        color: '#2196F3',
        fontSize: 20,
        fontWeight: 'bold',
    },
    search_results_container: {
        flex: 1,
        alignItems: 'stretch',
        padding: 20,
        marginTop: 0,
        alignSelf: 'stretch',
        backgroundColor: '#EEE',
    },
    search_results_list: {
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    search_results_item: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 12,
        paddingLeft: 20,
        margin: 0,
        marginBottom: 4,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;
