// install service worker
self.addEventListener('install',evt => {
    console.log('service worker has been installed');
    
});

//activate event
self.addEventListener('activate', avt => {
    console.log('Service has been activated');
    
})