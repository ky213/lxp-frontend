export function buildQuery(data) {
  // If the data is already a string, return it as-is
  if (typeof data === 'string') return data;

  // Create a query array to hold the key/value pairs
  var query = [];

  // Loop through the data object
  for (var key in data) {
    if (data.hasOwnProperty(key) && data[key] != null && data[key] != 'undefined' && data[key] != '') {
      // Encode each key and value, concatenate them into a string, and push them to the array
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
  }

  // Join each item in the array with a `&` and return the resulting string
  return query.join('&');
}
