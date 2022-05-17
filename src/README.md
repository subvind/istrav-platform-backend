design (about 70 tables)
========

authentication:
- ok so "accounts" is where phone number and pin number / email and passwords exists.
- "members" is where "socialGroups" accounts exist
- "users" is where "websites" accounts exist
- "admins" is where ACP accounts exist
- "clients" is where CA accounts exist
- "masters" is where the webmaster accounts exist

primary support & help desk feature:
- tickets
- ticketReplies

root feature:
- platforms [dev, staging, production]
- applications
- themes
- communications [channels, conversations, discussions]
- analytics

main feature:
- channels (websocket) [chats, rooms]
- conversations (server-sent events) [statusUpdates, files, events, reviews]
- discussions (REST) [blogs, topics]

business feature:
- stripeCustomers // tenants
- stripeProducts // websites
- stripePrices // amounts
- stripeInvoices // bills
- stripeSubscriptions // licenseKeys
- stripePaymentIntents // charges
- stripePaymentMethods // moneyAddresses

interface user 2 user feature:
- chats (websocket) // channels
- directMessages

interface webmaster feature:
- platform
- tenants // stripeCustomers
- websites // stripeProducts
- amounts // stripePrices
- licenseKeys // stripeSubscriptions
- bills // stripeInvoices
- charges // stripePaymentIntents
- masters
- accounts
- applications
- themes

interface client area feature:
- tenant // stripeCustomer
- websites // stripeProducts
- licenseKeys // stripeSubscriptions
- bills // stripeInvoices
- charges // stripePaymentIntents
- clients

interface admin control panel feature:
- website // stripeProduct
- socialGroups
- admins
- users

interface social group feature:
- socialGroup
- members // profiles

social group comments feature:
- comments // conversations
- commentPoints
- commentResponses
- commentResponsePoints

social group writings feature:
- writings // discussions
- writingPoints
- writingViews
- writingPosts
- writingPostPoints
- writingPostViews

social group profile features:
- profileFriends
- profileStatusUpdates
- profileStatusUpdateComments // comments
- profileStatusUpdateViews // analytics
- profileStatusUpdatePoints // leaderboards
- profileAlerts
- profileNotifications

social group blogs application:
- blogs
- blogCategories
- blogPosts // writings

social group rules application:
- rules
- ruleNumbers

social group referrals application:
- referrals
- referralLinks

social group activity feeds application:
- activityFeeds
- activityFeedActions

social group leaderboards application:
- leaderboards
- leaderboardPlacements

social group forums application:
- forums
- forumMains
- forumCategories
- forumTopics // writings

social group shoutboxes application:
- rooms (websocket) // channels
- roomLogs
- roomMembers

social group downloads application:
- downloads
- downloadFiles
- downloadFileComments // conversations
- downloadFilePoints // leaderboards
- downloadFileViews // analytics

social group calendars application:
- calendars
- calendarEvents
- calendarEventComments // conversations
- calendarEventPoints // leaderboards
- calendarEventViews // analytics
- calendarEventRegisters

social group storefronts application:
- storefronts
- storefrontCatalogs
- storefrontProducts
- storefrontProductViews // analytics
- storefrontReviews
- storefrontReviewComments // conversations
- storefrontReviewPoints // leaderboards
- storefrontCarts

social group access restrictions feature:
- accessPermissions
- accessPermissionSets
- accessPermissionMasks
- accessRoles

social group subscriptions feature:
- subscribeToForumCategories
- subscribeToForumTopics
- subscribeToDownloads
- subscribeToStorefronts
- subscribeToStorefrontCatalogs
- subscribeToStorefrontProducts
- subscribeToStatusUpdates
- subscribeToCalendars
- subscribeToCalendarEvents