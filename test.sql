\c nc_news

SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count from articles
LEFT JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id
ORDER BY articles.created_at DESC;