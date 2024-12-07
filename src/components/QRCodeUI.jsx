import { View, Text } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
const QRCodeUI = ({ value, size = 150 }) => {
    return <QRCode value={value} size={size} />;
};

export default QRCodeUI;
