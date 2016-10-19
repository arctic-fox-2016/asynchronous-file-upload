# stackoverflow

## Your solution for your question
This is application for you asking anything you like


This project is contributed by :
1. ariadiprana :baby:




## Data
| Model | Description
|------|----
| contents | this is master data for contents
----------------------------------------------------


## Contents
Property :
- title : String
- content : String
- type : String
- upvote : Number
- downvote : Number
- parentId : String
- userId : String
|Endpoint|HTTP|Description
|--------|----|-----------
|/api/contents|GET|return all cards in JSON
|/api/contents/:id|GET|return card detail
|/api/contents|POST| add new master cards
|/api/contents/:id|PUT|update cards
|/api/contents/:id|DEL|delete existing cards
