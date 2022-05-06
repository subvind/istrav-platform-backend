design (about 70 tables)
========

authentication:
- ok so "accounts" is where username and passwords exists.
- "members" is where "socialGroups" accounts exist
- "users" is where "websites" accounts exist
- "admins" is where ACP accounts exist
- "clients" is where CA accounts exist
- "masters" is where the webmaster accounts exist

primary support & help desk feature:
- tickets
- ticketReplies

primary webmaster feature:
- services // CRUD pricing table
- tenants // CRUD (websites, clients, plans, licenseKeys)
- masters // accounts allowed on root

primary client area feature:
- services // for showing the pricing table
- plans // for tenants that have purchased a service
- licenseKeys // for auth of source code usage
- websites // for software install location
- clients // accounts allowed on tenant

primary admin control panel feature:
- website // access to just 1 website at a time
- socialGroups // CRUD multi-tenant communities
- users // accounts allowed on website
- admins // accounts allowed on admin control panel

primary social group feature:
- socialGroup // access to just 1 social group at a time
- applications // for each individual SG app
- members // accounts allowed on social group

user instant messaging feature:
- directMessages // website wide user to user instant messaging

user coversation feature:
- comments
- commentPoints
- commentResponses
- commentResponsePoints

user profile features:
- friends
- statusUpdates
- statusUpdateComments // user conversations
- statusUpdateViews
- statusUpdatePoints
- alerts
- notifications

social group homepage application:
- website

social group rules application:
- rules
- ruleNumbers

social group affiliate & referrals application:
- affiliates
- affiliateLinks

social group bulletin boards application:
- bulletinBoards
- bulletinBoardRefs

social group rankings application:
- rankings
- rankingPlacements

social group discussion application:
- forums
- forumMains
- mainCategories
- categoryTopics
- topicPosts
- topicViews
- postPoints
- postViews

social group shoutbox application:
- rooms
- roomLogs

social group showcases application:
- showcases
- showcaseDisplay
- displayComments // user conversations
- displayViews
- displayPoints

social group calendars application:
- calendars
- calendarEvents
- eventComments // user conversations
- eventPoints
- eventViews
- eventRegs

social group storefronts application:
- storefronts
- storefrontCatalogs
- catalogProducts
- productReviews
- productViews
- reviewComments // user conversations
- reviewPoints
- carts

user subscriptions feature:
- categorySubscriptions
- topicSubscriptions
- showcaseSubscriptions
- displaySubscriptions
- statusUpdateSubscriptions
- calendarSubscriptions
- eventSubscriptions
- catalogSubscriptions
- productSubscriptions

social group access restrictions feature:
- permissions
- permissionSets
- permissionMasks
- roles