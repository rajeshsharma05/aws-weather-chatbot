
var weather = require('./lib/weather.js');

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled 
    function close(sessionAttributes, fulfillmentState, message) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'Close',
                fulfillmentState,
                message,
            },
        };
    }

// Entrypoint for AWS Lambda

 // --------------- Main handler -----------------------
     
    // Route the incoming request based on intent.
    // The JSON body of the request is provided in the event slot.
    exports.handler = (event, context, callback) => {
        try {
          console.log(event);
            dispatch(event,
                (response) => {
                    callback(null, response);
                });
        } catch (err) {
            callback(err);
        }
    };


function dispatch(event, callback) {

  console.log('request received for userId=' + event.userId + ' intentName=' + event.currentIntent.intentName);
  
  const sessionAttributes = event.sessionAttributes;
  var cityName = event.currentIntent.slots.city;
  console.log("Trying to get current weather for city: " + cityName);
  
  weather.byCity(cityName).then(function(response) {
    callback(close(sessionAttributes, 'Fulfilled',
        {'contentType': 'PlainText', 'content': response}));
  }).catch(function(reason) {
    console.log('[FAIL] Unable to get weather: ', reason);
    //context.fail('Unable to get weather. Try again later.');
  });
};
