const azure = require("azure-storage");
module.exports = async function (context, req) {
    // handle change notification registration
    if (req.query.validationToken) {
        context.res = {
            status: 200,
            body: req.query.validationToken,
            headers: {
                "Content-Type": "text/plain",
            },
        };
    // handle the change notification message
    } else {
        // insert AZURE_STORAGE_CONNECTION_STRING
        context.log(req.body);
        const tableSvc = azure.createTableService("AZURE_STORAGE_CONNECTION_STRING");
        const link = {
            PartitionKey: "User",
            RowKey: String(Date.now()),//req.body.value[0].id,
            changeType: req.body.value[0].changeType,
            resource: req.body.value[0].resource,
        };
        tableSvc.insertEntity(
            "UserChangeNotifications",
            link,
            function (error, result, response) {
                if (!error) {
                    context.res = {
                        status: 200,
                        body: result,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
                }
                    context.res = {
                        status: 500,
                        body: error,
                    };
                }
        )

    }
}