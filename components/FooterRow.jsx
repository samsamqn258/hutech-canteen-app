import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FooterRow = ({ children }) => {
    return <View style={styles.footer}>{children}</View>;
};

export default FooterRow;

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
});
