# Azure Function for handling Azure Change Notification
The Microsoft Graph API can be used to send resource change notifications to clients in the form of webhooks. The client, which may be an external application, must provide its own endpoint (URL) that can receive the messages. The Graph API implements the webhook mechanism through its own subscription endpoint, which accepts requests with the necessary information and, after acceptance, sends the notifications to the defined endpoint. For more information see [Webhooks](https://learn.microsoft.com/de-de/graph/webhooks).