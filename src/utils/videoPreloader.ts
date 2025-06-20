export interface VideoLoadStatus {
  womenVideo: boolean;
  logoVideo: boolean;
  allLoaded: boolean;
}

export const preloadVideos = (): Promise<VideoLoadStatus> => {
  return new Promise((resolve) => {
    const videoUrls = ['/women.mp4', '/logo.mp4'];
    const videoElements: HTMLVideoElement[] = [];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      if (loadedCount === videoUrls.length) {
        resolve({
          womenVideo: true,
          logoVideo: true,
          allLoaded: true
        });
      }
    };

    videoUrls.forEach((url) => {
      const video = document.createElement('video');
      video.src = url;
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      
      video.addEventListener('canplaythrough', () => {
        loadedCount++;
        checkAllLoaded();
      }, { once: true });

      video.addEventListener('error', () => {
        // If video fails to load, still count it as loaded to prevent infinite loading
        loadedCount++;
        checkAllLoaded();
      }, { once: true });

      videoElements.push(video);
    });

    // Start loading the videos
    videoElements.forEach(video => {
      video.load();
    });
  });
}; 