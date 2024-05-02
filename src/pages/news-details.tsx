import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { formatEpochTime } from "../shared/news-details-date";
import { Panel, PanelHeader, Header, Div, Link, Group } from '@vkontakte/vkui';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export function NewsDetails() {
    const { id } = useParams();
    const item = useSelector((state: RootState) => state.news.news.find(news => news.id === parseInt(id)));

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
                    <p>{item.text}</p>
                    <p>{item.by}</p>
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">Read more</Link>
                </Div>
            </Group>
        </Panel>
    );
}
