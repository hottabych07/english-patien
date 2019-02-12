const DollarConfig = require('dollar-config');

let configurator = {
    "url": {
        "$switch": [
            "mode",
            [
                [ "development", "http://localhost:8000" ],
                [ "production", "https://sulyak.info" ],
            ]
        ]
    }
};

export const config = new DollarConfig(configurator);
