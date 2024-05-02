import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { formatEpochTime } from "../shared/news-details-date";
import { Panel, PanelHeader, Header, Div, Link, Group, Button } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {CommentSection} from "../components/comment-section";

export function NewsDetails() {
    const { id } = useParams();
    const item = useSelector((state: RootState) => state.news.news.find(news => news.id === parseInt(id)));
    const routeNavigator = useRouteNavigator()

    if (!item) {
        return (
            <Panel>
                <PanelHeader>News Not Found</PanelHeader>
                <Group>
                    <Div>
                        <p>The requested news item could not be found.</p>
                    </Div>
                </Group>
            </Panel>
        );
    }

    const time = formatEpochTime(item.time);

    return (
        <Panel>
            <PanelHeader>{item.title}</PanelHeader>
            <Group>
                <Div>
                    <Header mode="secondary">Published: {time}</Header>
                    <Button onClick={() => routeNavigator.back()}>Back</Button>
                    <p>{item.text}</p>
                    <p>By: {item.by}</p>
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">Read more</Link>
                    <CommentSection id={id}></CommentSection>
                </Div>
            </Group>
        </Panel>
    );
}
