import { View, Text } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
const QRCodeUI = ({ value }) => {
    return <QRCode value={value} size={150} />;
};

export default QRCodeUI;
