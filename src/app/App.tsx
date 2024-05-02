import React from 'react';
import { NewsList } from "../pages/news-list";
import { NewsDetails } from "../pages/news-details";
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { View, Panel, Root, Div } from '@vkontakte/vkui';

function App() {
    const location = useActiveVkuiLocation();

    const activeView = location.view || 'mainView';
    const activePanel = location.panel || 'home';

    return (
        <Div style={{ padding: 20 }}>
            <Root activeView={activeView}>
                <View id="mainView" activePanel={activePanel}>
                    <Panel id="home">
                        <NewsList />
                    </Panel>
                    <Panel id="details">
                        <NewsDetails />
                    </Panel>
                </View>
            </Root>
        </Div>
    );
}

export default App;
