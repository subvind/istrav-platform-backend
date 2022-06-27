design (about 70 tables)
========

authentication:
- ok so "accounts" is where phone number and pin number / email and passwords exists.
- "members" is where "socialGroups" accounts exist
- "users" is where "websites" accounts exist
- "admins" is where ACP accounts exist
- "clients" is where CA accounts exist
- "masters" is where the webmaster accounts exist

istrav.com:
- partners
- partnerAccessKeys
- partnerPlatforms
- platformLicenseKeys
- stripeCustomers // tenants
- stripeProducts // websites
- stripePrices // amounts
- stripeInvoices // bills
- stripeSubscriptions // licenseKeys
- stripePaymentIntents // charges
- stripePaymentMethods // moneyAddresses

communityfolder.com:
- platforms: partnerPlatforms
- features [channels, conversations, discussions, assistants, components, themes]

features:
- channels (websocket) [chats, rooms]
- conversations (server-sent events) [statusUpdates, files, events, reviews]
- discussions (REST) [blogs, topics]
- assistants (node.js) [chains, bots, openai]
- components [activityFeed, blogs, calendars, downloads, forums, leaderboards, profiles, referrals, rules, shoutboxes, storefronts]
- themes [default, networks, companies, teams]
- feedbacks [security, reporting, support & helpdesk]

security feature:
- abilities
- abilityRoles
- abilityMasks
- abilityPermissions
- abilityPermissionSets

reporting feature:
- analytics
- analyticTimelines

support & help desk feature:
- tickets
- ticketReplies

cyphers and raft feature:
- scramblers
- scramblerConnections
- scramblerLogs
- consensusClusters
- consensusNodes
- consensusPackets

assistant feature:
- assistants
- assistantChains
- assistantChainStates
- assistantBots
- assistantBotDocuments
- assistantBotAnswers
- assistantRecordings

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
- components
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

social group activity feeds component:
- activityFeeds
- activityFeedActions

social group blogs component:
- blogs
- blogCategories
- blogPosts // writings

social group calendars component:
- calendars
- calendarEvents
- calendarEventComments // conversations
- calendarEventPoints // leaderboards
- calendarEventViews // analytics
- calendarEventRegisters

social group downloads component:
- downloads
- downloadFiles
- downloadFileComments // conversations
- downloadFilePoints // leaderboards
- downloadFileViews // analytics

social group leaderboards component:
- leaderboards
- leaderboardPlacements

social group profiles component:
- profiles
- profileFriends
- profileStatusUpdates
- profileStatusUpdateComments // comments
- profileStatusUpdateViews // analytics
- profileStatusUpdatePoints // leaderboards
- profileAlerts
- profileNotifications

social group referrals component:
- referrals
- referralLinks

social group rules component:
- rules
- ruleNumbers

social group forums component:
- forums
- forumMains
- forumCategories
- forumTopics // writings

social group storefronts component:
- storefronts
- storefrontCatalogs
- storefrontProducts
- storefrontProductViews // analytics
- storefrontReviews
- storefrontReviewComments // conversations
- storefrontReviewPoints // leaderboards
- storefrontCarts

social group shoutboxes component:
- rooms (websocket) // channels
- roomLogs
- roomMembers

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