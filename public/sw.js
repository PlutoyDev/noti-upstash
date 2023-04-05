const saveSubscription = async subscription => {
  console.log(subscription);
  localStorage.setItem('subscription', JSON.stringify(subscription));
  await fetch('https://webhook.site/6b4894a5-de25-4c70-9aa6-58fc9bb88c96', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    }
  })
};

self.addEventListener('install', async () => {
  // This will be called only once when the service worker is installed for first time.
  try {
    const options = { userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription);
    console.log(response);
  } catch (err) {
    console.log('Error', err);
  }
});

self.addEventListener('push', function (event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text());
    self.registration.showNotification('Test', {
      title: 'Test',
      body: event.data.text(),
    });
  } else {
    console.log('Push event but no data');
  }
});
