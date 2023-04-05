const saveSubscription = async subscription => {
  localStorage.setItem('subscription', JSON.stringify(subscription));
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
