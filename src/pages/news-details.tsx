import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {formatEpochTime} from "../utils/news-details-utils";
import { Panel, PanelHeader, Header, Div, Link, Group } from '@vkontakte/vkui';

export function NewsDetails({ id }: { id: number }) {
    const item = useSelector((state: RootState) => state.news.news.find(news => news.id === id));

    const time = formatEpochTime(item.time)

    return (
        <Panel>
            <PanelHeader>{item.title}</PanelHeader>
            <Group>
                <Div>
                    <Header mode="secondary">Опубликовано: {time}</Header>
                    <p>{item.text}</p>
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">Читать далее</Link>
                </Div>
            </Group>
        </Panel>
    );
}
