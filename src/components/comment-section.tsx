import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { fetchCommentsDetails } from "../features/news-slice";
import { Panel, Group, Div, Header, Button } from '@vkontakte/vkui';

export function CommentSection({ id }) {
    const dispatch = useDispatch();
    const newsItem = useSelector((state: RootState) => state.news.news.find(item => item.id === parseInt(id)));
    const comments = useSelector((state: RootState) => state.news.comments);
    const [expandedComments, setExpandedComments] = useState({});
    const [commentsDescendants, setCommentsDescendants] = useState(0);

    useEffect(() => {
        // Initially fetch root comments only
        if (newsItem && newsItem.kids && newsItem.kids.length > 0) {
            dispatch(fetchCommentsDetails(newsItem.kids));
        }
    }, [dispatch, newsItem]);

    useEffect(() => {
        if (comments) {
            setCommentsDescendants(countAllComments(comments));
        }
    }, [comments]);

    const countAllComments = (comments) => {
        return comments.reduce((acc, comment) => {
            const childrenCount = comment.children ? countAllComments(comment.children) : 0;
            return acc + 1 + childrenCount;
        }, 0);
    };

    const toggleComment = useCallback((commentId) => {
        // Toggle the expanded state of the clicked comment only
        setExpandedComments(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));

        // Fetch nested comments if expanding for the first time
        const comment = comments.find(c => c.id === commentId);
        if (comment && !comment.children && expandedComments[commentId] !== true) {
            dispatch(fetchCommentsDetails(comment.kids));
        }
    }, [dispatch, comments, expandedComments]);

    const renderComments = (comments) => {
        if (!comments || comments.length === 0) return <Div>No comments available.</Div>;

        return comments.map((comment) => {
            const isExpanded = expandedComments[comment.id];
            return (
                <Div key={comment.id} onClick={() => toggleComment(comment.id)}>
                    <p>{comment.by}: {comment.text}</p>
                    {/* Conditionally render children if expanded */}
                    {isExpanded && comment.children && (
                        <div style={{ marginLeft: '20px' }}>
                            {renderComments(comment.children)}
                        </div>
                    )}
                </Div>
            );
        });
    };

    // Refresh all comments forcefully
    const refreshComments = () => {
        if (newsItem && newsItem.kids && newsItem.kids.length > 0) {
            dispatch(fetchCommentsDetails(newsItem.kids, true)); // Force re-fetch regardless of cache
        }
    };

    return (
        <Panel>
            {newsItem ? (
                <div>
                    <Group>
                        <Div>{newsItem.text}</Div>
                        <Button onClick={refreshComments} size="l" mode="secondary">Refresh Comments</Button>
                        <Header mode="secondary">Comments (Total: {commentsDescendants}):</Header>
                        {renderComments(comments)}
                    </Group>
                </div>
            ) : (
                <Div>News item not found.</Div>
            )}
        </Panel>
    );
}
