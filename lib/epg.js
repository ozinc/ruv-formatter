'use strict';

function formatEvent($, event) {
  return $('title', event).text();
}

// Exports
module.exports.formatEvent = formatEvent;
