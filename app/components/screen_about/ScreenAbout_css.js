import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#EEE',
        alignSelf: 'stretch',
    },
    about_container: {
        flex: 1,
        padding: 20,
        marginTop: 100,
        alignSelf: 'stretch',
    },
    remaining_space: {
        flex: 4,
        alignSelf: 'stretch',
    },
    about_row_view: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    app_name_view: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    app_name_text: {
        fontSize: 36,
        color: '#000',
    },
    version_text: {
        fontSize: 22,
        color: '#000',
    },
});

export default styles;
