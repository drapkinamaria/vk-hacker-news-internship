import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsDetails, fetchNewsIds } from "../features/news-slice";
import { RootState } from "../app/store";
import { Button, Div, Panel, PanelHeader, Group, Cell } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { formatEpochTime } from "../shared/news-details-date";

export function NewsList() {
    const dispatch = useDispatch();
    const navigator = useRouteNavigator();
    const news = useSelector((state: RootState) => state.news.news);
    const status = useSelector((state: RootState) => state.news.status);
    const ids = useSelector((state: RootState) => state.news.ids);

    useEffect(() => {
        dispatch(fetchNewsIds());
        const interval = setInterval(() => {
            dispatch(fetchNewsIds());
        }, 60000);
        return () => clearInterval(interval);
    }, [dispatch]);

    useEffect(() => {
        if (ids.length > 0) {
            dispatch(fetchNewsDetails(ids));
        }
    }, [dispatch, ids]);

    function handleClickUpgradeNews() {
        dispatch(fetchNewsIds());
    }

    const sortedNews = [...news].sort((a, b) => b.time - a.time);

    return (
        <Panel>
            <PanelHeader>News</PanelHeader>
            <Group>
                <Button size="l" stretched style={{ marginBottom: 8 }} onClick={handleClickUpgradeNews}>
                    Update news list
                </Button>
                {status === 'loading' && <Div>Loading...</Div>}
                {sortedNews.map((newsItem) => (
                    <Cell key={newsItem.id}
                          expandable
                          onClick={() => navigator.push(`/details/${newsItem.id}`)}
                          before={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                              <strong style={{ fontSize: '16px' }}>{newsItem.title}</strong>
                              <span style={{ fontSize: '14px' }}>Score: {newsItem.score}</span>
                              <span style={{ fontSize: '14px' }}>By: {newsItem.by}</span>
                              <span style={{ fontSize: '14px' }}>Date: {formatEpochTime(newsItem.time)}</span>
                          </div>}
                    >
                    </Cell>
                ))}
            </Group>
        </Panel>
    );
}
