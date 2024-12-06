import React, { useState } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { theme } from '../constants/theme';

const Tabs = ({ renderScene, routes }) => {
    const [index, setIndex] = useState(0);

    const renderTabBar = (props) => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: theme.colors.secondary }}
                style={{ backgroundColor: theme.colors.primary, borderRadius: 6, marginTop: 10 }}
            />
        );
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            lazy
        />
    );
};

export default Tabs;
