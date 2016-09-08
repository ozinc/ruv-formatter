'use strict';

function formatEvent($, event) {
  // Collect and assemble the required properties
  let id = $(event).attr('event-id');
  let startTime = $(event).attr('start-time');
  let endTime = $(event).attr('end-time');
  let title = $('title', event).text();

  let video = {
    type: 'video',
    id,
    'start-time': startTime,
    'end-time': endTime,
    title
  };

  // Description
  let description = $('description', event);
  if (description.length > 0 && description.text().length > 0) {
    video.description = description.text();
  }

  // Category
  let category = $('category', event);
  if (category.length > 0) {
    video.category = category.text();
  }

  // Image
  let image = $('image', event);
  if (image.length > 0) {
    video.image = image.text();
  }

  // VOD rights
  let vod = false;
  let rights = $('rights[type="vod"]', event);
  if (rights.length > 0 && rights.attr('expiry') === 'allowed') {
    vod = rights.attr('expires');
  }
  video.vod = vod;

  console.log(video);

  return video;
}

// Exports
module.exports.formatEvent = formatEvent;
