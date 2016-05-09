export default function ({ dispatch }) {
  return next => action => {
    console.log(action);
    // checking for promises .then etc..
    if (!action.payload || !action.payload.then){
      return next(action);
    }
    // make sure actions promise resolves
    action.payload
      .then(function(response){
        // create a new action with the old type but
        // replace the promise with the response data
        const newAction = {...action, payload: response};
        dispatch(newAction);
      });
  }
}
