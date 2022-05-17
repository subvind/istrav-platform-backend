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

root feature:
- platforms
- applications
- themes

stripe feature:
- customers // tenants
- products // websites
- prices // amounts
- invoices // bills
- subscriptions // licenseKeys
- paymentIntents // charges
- paymentMethods // moneyAddresses

primary webmaster feature:
- amounts // CRUD pricing table
- tenants // customers in the system
- masters // accounts allowed on root
- applications // features
- bills // for tenants that have been invoiced
- charges // for keeping track of receipts
- licenseKeys // for auth of source code usage

primary client area feature:
- tenant // access to just 1 tenant at a time
- websites // for software install location
- clients // accounts allowed on tenant

primary admin control panel feature:
- website // access to just 1 website at a time
- socialGroups // CRUD multi-tenant communities
- users // accounts allowed on website
- admins // accounts allowed on admin control panel

primary social group feature:
- socialGroup // access to just 1 social group at a time
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

social group affiliates application:
- affiliates
- affiliateLinks

social group activity feeds application:
- feeds
- feedActions

social group leaderboards application:
- rankings
- rankingPlacements

social group discussions application:
- forums
- forumMains
- mainCategories
- categoryTopics
- topicPosts
- topicViews
- postPoints
- postViews

social group shoutboxes application:
- rooms
- roomLogs

social group downloads application:
- downloads
- downloadFiles
- fileComments // user conversations
- fileViews
- filePoints

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